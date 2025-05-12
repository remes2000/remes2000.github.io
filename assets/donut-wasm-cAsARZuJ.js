const n=`---
title: "donut.wasm - running C code in your browser"
slug: donut-wasm
subtitle: Running C code in your browser
thumbnail: /post-assets/donut-wasm/thumbnail.jpg
date: 2024-04-16 22:45:00.000Z
author: Michał Nieruchalski
meta:
  - name: description
    content: "Interactive spinning ASCII donut"
  - property: og:title
    content: "donut.wasm - running C code in your browser"
  - property: og:description
    content: "Interactive spinning ASCII donut"
  - property: og:image
    content: https://nieruchalski.dev/post-assets/donut-wasm/header.jpg
  - property: og:url
    content: https://nieruchalski.dev/blog/donut-wasm
---

<figure>
  <iframe
    allow="clipboard-write"
    width="100%"
    height="500px"
    src="https://donut.nieruchalski.dev"></iframe>
    <figcaption>
      See full version 
      <a href="https://donut.nieruchalski.dev" target="_blank">here</a>
    </figcaption>
</figure>


<h1 id="background-1">Background</h1>
<p>I was super excited to give Webassembly a shot since it came out in 2017. After 7 years, I&#39;ve finally decided to try it out and start a cool project around it.</p><p><a href="https://www.a1k0n.net/2006/09/15/obfuscated-c-donut.html">Donut.c</a> is a fairly popular program written in C. It renders 3D donut shape using only ASCII characters. Each character corresponds with given illumination value, so <code>.</code> is the darkest and <code>@</code> is the brightest.</p><p>My objective was to create my own implementation of donut.c, parametrize it, run it inside the browser, and make it interactive. As illustrated by the live demo, you can manipulate donut properties using the toolbox, and  rotate it using mouse movements. There&#39;s also a feature to move the donut using 
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API">Pointer Lock API</a>, as well as the ability to copy the current shape to a clipboard :)</p><h1 id="scope">Scope</h1>
<p>I won&#39;t discuss the math behind this project in this article. If you&#39;re interested in it, 
<a href="https://www.a1k0n.net/2011/07/20/donut-math.html">read this article</a>.
Instead I&#39;ll be focusing on running C code in the browser with Webassembly.</p><h1 id="donutc">Donut.c</h1>
<p>A single donut.c file is the core of the whole project. Here, I&#39;ve defined a couple of methods that I later call from javascript.</p><pre><code class="language-c"><span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">render_frame</span><span class="token punctuation">(</span>
  <span class="token keyword">float</span><span class="token operator">*</span> rotation_accumulator<span class="token punctuation">,</span> 
  <span class="token keyword">float</span> screen_width<span class="token punctuation">,</span> 
  <span class="token keyword">float</span> screen_height<span class="token punctuation">,</span> 
  <span class="token keyword">float</span> r1<span class="token punctuation">,</span>
  <span class="token keyword">float</span> r2<span class="token punctuation">,</span>
  <span class="token keyword">float</span> distance
<span class="token punctuation">)</span>
</code></pre><p>To render the donut, I have to call <code>render_frame</code> method. It requires a couple of parameters and returns <del>a string</del> a pointer to the memory address where the rendered donut shape is being stored. The user can set the parameter values via the toolbox. </p><pre><code class="language-c"><span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">wasmallocate</span><span class="token punctuation">(</span><span class="token keyword">int</span> number_of_bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">malloc</span><span class="token punctuation">(</span>number_of_bytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><pre><code class="language-c"><span class="token keyword">void</span> <span class="token function">wasmfree</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>ptr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">free</span><span class="token punctuation">(</span>ptr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>I&#39;ve also exposed two additional methods. <code>wasmfree</code> and <code>wasmallocate</code>. Those two methods are simply <code>free</code> and <code>malloc</code> but accessible from the javascript.</p><p>In fact, I&#39;ve exposed one more method, called rotate. It&#39;s tightly connected to math, and I won&#39;t discuss it.</p><p>But, how can I &quot;expose&quot; the method? There are two things that you need to do to achieve it.
First: include emscripten library</p><pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;emscripten.h></span></span>
</code></pre><p>Second: annotate the method with <code>EMSCRIPTEN_KEEPALIVE</code></p><pre><code class="language-c">EMSCRIPTEN_KEEPALIVE
<span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">render_frame</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><h1 id="compilation">Compilation</h1>
<p>Now, we want to compile C code into WASM and to accomplish that, we need a proper compilator. I&#39;ve used 
<a href="https://emscripten.org/">Emscripten</a>.</p><pre><code class="language-bash">emcc donut.c <span class="token parameter variable">-o</span> donut.js
</code></pre><p>As a result of the above command, the donut.wasm file was created.</p><h1 id="calling-c-methods">Calling C methods</h1>
<p>I have my donut.wasm file, but how do I use it? Well, 
I&#39;ve created a single script.mjs file that&#39;s an entry point for my website&#39;s javascript :)
First, you need to define an object that will represent the memory.</p><pre><code class="language-javascript"><span class="token keyword">const</span> memory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebAssembly<span class="token punctuation">.</span>Memory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">initial</span><span class="token operator">:</span> <span class="token number">256</span><span class="token punctuation">,</span>
  <span class="token literal-property property">maximum</span><span class="token operator">:</span> <span class="token number">512</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>The created object is of type 
<a href="https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory">Webassembly.Memory</a>
that is, in fact, an 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">ArrayBuffer</a>
that holds the raw bytes of memory. The state of the buffer is shared between javascript and C code, and this is where the information exchange will take place. Both javascript and C code can read/write to/from memory.</p><p>Once we have memory object ready, we can actually run donut.wasm code. Here&#39;s how to do it.</p><pre><code class="language-javascript">WebAssembly<span class="token punctuation">.</span><span class="token function">instantiateStreaming</span><span class="token punctuation">(</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'src/wasm/donut.wasm'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">js</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">mem</span><span class="token operator">:</span> memory <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span> 
    <span class="token literal-property property">emscripten_resize_heap</span><span class="token operator">:</span> memory<span class="token punctuation">.</span>grow<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">results</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>results<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><ul>
<li>I&#39;ve used</li>
</ul>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>, to fetch the content of donut.wasm file</p><ul>
<li><code>'src/wasm/donut.wasm'</code> is a location of my .wasm file</li>
<li><code>js: { mem: memory },</code> is where I instruct the javascript to use my <code>memory</code> object</li>
<li><code>emscripten_resize_heap: memory.grow,</code> here I provide the method to grow the current memory size. I only have to do it because I&#39;ve used <code>malloc</code> in my code.</li>
<li>Finally, I log the result of the resolved promise</li>
</ul>
<figure>
  <img
    src="/post-assets/donut-wasm/consolelog.png"
    alt="Object logged on console"
    title="Object logged on console"
  />
  <figcaption>Object logged on console</figcaption>
</figure>

<p>As we can see our exposed methods are ready to be used under <code>results.instance.exports</code>. Nice!</p><p>I&#39;ve found it may be a good idea to create wrappers for C methods, as I wanted them to be easy to use from the javascript perspective. </p><p>Therefore, I&#39;ve introduced a <code>DonutAPI</code> class. Its constructor requires the returned value of the <code>instantiateStreaming</code> promise. Inside, I&#39;ve defined two getters, one for exposed methods and one for memory. I&#39;ve also defined the <code>getFrame</code> method, which is a wrapper for C <code>get_frame</code>. </p><pre><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DonutApi</span> <span class="token punctuation">{</span>
  wasmResult<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">wasmResult</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>wasmResult <span class="token operator">=</span> wasmResult<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token parameter">rows<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> rotationAccumulator<span class="token punctuation">,</span> distance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>  

  <span class="token operator">...</span>

  <span class="token keyword">get</span> <span class="token function">memory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>wasmResult<span class="token punctuation">.</span>instance<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>memory<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">exports</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>wasmResult<span class="token punctuation">.</span>instance<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><h1 id="getframe-method"><code>getFrame</code> method</h1>
<p>Let&#39;s break down the <code>getFrame</code> method.</p><pre><code class="language-javascript"><span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token parameter">rows<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> rotationAccumulator<span class="token punctuation">,</span> distance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// (1) Prepare the input</span>
  <span class="token keyword">const</span> rotationAccumulatorPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">arrayToFloatPointer</span><span class="token punctuation">(</span>rotationAccumulator<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// (2) Call C code aka render frame</span>
  <span class="token keyword">const</span> resultPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">render_frame</span><span class="token punctuation">(</span>rotationAccumulatorPointer<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> rows<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// (3) Cast returned pointer to string</span>
  <span class="token keyword">const</span> frame <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">charPointerToString</span><span class="token punctuation">(</span>resultPointer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// (4) Free the memory </span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">wasmfree</span><span class="token punctuation">(</span>rotationAccumulatorPointer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">wasmfree</span><span class="token punctuation">(</span>resultPointer<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// (5) Format the output, add '/n' at the end of each line</span>
  <span class="token keyword">return</span> frame<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">.{1,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>cols<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">}</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token string">'g'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'\\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>Step one is to prepare the input. Here <code>rotationAccumulator</code> is an array. I have to cast the javascript array of numbers to a pointer. I do that by using the <code>arrayToFloatPointer</code> util function (more details later).</p><p>Once the input arguments are prepared, we can proceed to step two. Step two is the most important one, I call the <code>render_frame</code> c method. The returned value is a pointer to the memory address where the rendered donut is being stored.</p><p>The returned value is a pointer. To use it I have to cast the pointer to javascript string. I do that by using the <code>charPointerToString</code> utils function (more details later).</p><p>Step four is a significant one! In step four, I free the memory, as I no longer need the pointers. I do it by using <code>wasmfree</code> method (the one that I previously defined in C).</p><p>Step five is a more cosmetic one. From a C perspective, I return the rendered donut as a one-dimensional array of characters; therefore, I have to manually add a newline character after each line.</p><h1 id="passing-a-number">Passing a number</h1>
<p>Passing a number from javascript to C is easy, as it works out of the box. </p><pre><code class="language-javascript"><span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token parameter">rows<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> rotationAccumulator<span class="token punctuation">,</span> distance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">const</span> resultPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">render_frame</span><span class="token punctuation">(</span>rotationAccumulatorPointer<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> rows<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><p>In the above example, the variables row, cols, r1, r2 and distance are numbers. I can pass them into the C render_frame method without any transformation.</p><h1 id="passing-an-array-of-numbers">Passing an array of numbers</h1>
<p>Passing an array of numbers from javascript to C is more difficult :)</p><pre><code class="language-javascript"><span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token parameter">rows<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> rotationAccumulator<span class="token punctuation">,</span> distance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> rotationAccumulatorPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">arrayToFloatPointer</span><span class="token punctuation">(</span>rotationAccumulator<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> resultPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">render_frame</span><span class="token punctuation">(</span>rotationAccumulatorPointer<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> rows<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><p>In javascript <code>getFrame</code> method <code>rotationAccumulator</code> is an array of numbers. But the C <code>get_frame</code> method expects a pointer to float. Therefore, we need to map an array of numbers to a float pointer.</p><pre><code class="language-javascript"><span class="token function">arrayToFloatPointer</span><span class="token punctuation">(</span><span class="token parameter">array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> pointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">wasmallocate</span><span class="token punctuation">(</span>array<span class="token punctuation">.</span>length <span class="token operator">*</span> <span class="token constant">FLOAT_SIZE_IN_BYTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> floatArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>memory<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> pointer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  array<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> floatArray<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> pointer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>I&#39;ve set up a simple helper function called <code>arrayToFloatPointer</code>. It works in the following way:</p><ol>
<li>Allocate array.length * SIZE_OF_FLOAT_IN_BYTES (4) bytes of memory using <code>wasmallocate</code> exposed method.</li>
<li>Define new <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array">Float32Array</a>, pass memory as buffer (first argument) and pointer as an offset (second argument).</li>
<li>Iterate over the array, put each item in the shared memory using Float32Array instance.</li>
<li>Return the pointer</li>
</ol>
<h1 id="reading-char">Reading char*</h1>
<pre><code class="language-javascript"><span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token parameter">rows<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> rotationAccumulator<span class="token punctuation">,</span> distance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">const</span> resultPointer <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function">render_frame</span><span class="token punctuation">(</span>rotationAccumulatorPointer<span class="token punctuation">,</span> cols<span class="token punctuation">,</span> rows<span class="token punctuation">,</span> r1<span class="token punctuation">,</span> r2<span class="token punctuation">,</span> distance<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> frame <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">charPointerToString</span><span class="token punctuation">(</span>resultPointer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><p><code>resultPointer</code> is a char* from C perspective. I&#39;ve set up another simple helper function called <code>charPointerToString</code>.</p><pre><code class="language-javascript"><span class="token function">charPointerToString</span><span class="token punctuation">(</span><span class="token parameter">pointer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>memory<span class="token punctuation">.</span>buffer<span class="token punctuation">,</span> pointer<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> stringLength <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>bytes<span class="token punctuation">[</span>stringLength<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> stringLength<span class="token operator">++</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TextDecoder</span><span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">decode</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> stringLength<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><p>It works in the following way:</p><ol>
<li>Create a new instance of <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array">Uint8Array</a>, pass memory as buffer (first argument) and pointer as an offset (second argument).</li>
<li>We need to figure out the length of the string. Create <code>stringLength</code> variable and set it&#39;s value to 0. Iterate over each byte while current byte is different than 0. Increment <code>stringLength</code> by one in each step. Strings must be null terminated in C.</li>
<li>Read <code>stringLength</code> bytes from Uint8Array instance, use <a href="https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder">TextDecoder</a> to map bunch of bytes into a string.</li>
<li>Return decoded value.</li>
</ol>
<h1 id="summary-1">Summary</h1>
<p>I had plenty of fun coding this side project. I&#39;ve learned a lot about various computer science topics (low-level programming, memory management, and 3D graphics). I&#39;ve also noticed that working on more visual projects keeps me more interested in it. It was a great pleasure to discover that we don&#39;t have to write everything in javascript anymore! We can use the language that is the best fit for a given project, we can run it in the browser via webassembly! All the source code is available on my <a href="https://github.com/remes2000/donut.wasm">GitHub</a>.</p>`;export{n as default};
