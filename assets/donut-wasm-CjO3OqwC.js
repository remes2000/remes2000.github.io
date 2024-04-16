const e=`---
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


# Background
I was super excited to give Webassembly a shot since it came out in 2017. After 7 years, I've finally decided to try it out and start a cool project around it.

<a href="https://www.a1k0n.net/2006/09/15/obfuscated-c-donut.html">Donut.c</a> is a fairly popular program written in C. It renders 3D donut shape using only ASCII characters. Each character corresponds with given illumination value, so \`.\` is the darkest and \`@\` is the brightest.

My objective was to create my own implementation of donut.c, parametrize it, run it inside the browser, and make it interactive. As illustrated by the live demo, you can manipulate donut properties using the toolbox, and  rotate it using mouse movements. There's also a feature to move the donut using 
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API">Pointer Lock API</a>, as well as the ability to copy the current shape to a clipboard :)

# Scope
I won't discuss the math behind this project in this article. If you're interested in it, 
<a href="https://www.a1k0n.net/2011/07/20/donut-math.html">read this article</a>.
Instead I'll be focusing on running C code in the browser with Webassembly.

# Donut.c
A single donut.c file is the core of the whole project. Here, I've defined a couple of methods that I later call from javascript.
\`\`\`c
char* render_frame(
  float* rotation_accumulator, 
  float screen_width, 
  float screen_height, 
  float r1,
  float r2,
  float distance
)
\`\`\`

To render the donut, I have to call \`render_frame\` method. It requires a couple of parameters and returns ~~a string~~ a pointer to the memory address where the rendered donut shape is being stored. The user can set the parameter values via the toolbox. 

\`\`\`c
void* wasmallocate(int number_of_bytes) {
  return malloc(number_of_bytes);
}
\`\`\`

\`\`\`c
void wasmfree(void *ptr) {
  free(ptr);
}
\`\`\`

I've also exposed two additional methods. \`wasmfree\` and \`wasmallocate\`. Those two methods are simply \`free\` and \`malloc\` but accessible from the javascript.

In fact, I've exposed one more method, called rotate. It's tightly connected to math, and I won't discuss it.

But, how can I "expose" the method? There are two things that you need to do to achieve it.
First: include emscripten library
\`\`\`c
#include <emscripten.h>
\`\`\`
Second: annotate the method with \`EMSCRIPTEN_KEEPALIVE\`
\`\`\`c
EMSCRIPTEN_KEEPALIVE
char* render_frame(...) {
...
}
\`\`\`

# Compilation
Now, we want to compile C code into WASM and to accomplish that, we need a proper compilator. I've used 
<a href="https://emscripten.org/">Emscripten</a>.
\`\`\`bash
emcc donut.c -o donut.js
\`\`\`
As a result of the above command, the donut.wasm file was created.

# Calling C methods
I have my donut.wasm file, but how do I use it? Well, 
I've created a single script.mjs file that's an entry point for my website's javascript :)
First, you need to define an object that will represent the memory.

\`\`\`javascript
const memory = new WebAssembly.Memory({
  initial: 256,
  maximum: 512
});
\`\`\`
The created object is of type 
<a href="https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory">Webassembly.Memory</a>
that is, in fact, an 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">ArrayBuffer</a>
that holds the raw bytes of memory. The state of the buffer is shared between javascript and C code, and this is where the information exchange will take place. Both javascript and C code can read/write to/from memory.

Once we have memory object ready, we can actually run donut.wasm code. Here's how to do it.
\`\`\`javascript
WebAssembly.instantiateStreaming(fetch('src/wasm/donut.wasm'), {
  js: { mem: memory },
  env: { 
    emscripten_resize_heap: memory.grow,
  },
}).then((results) => {
  console.log(results);
});
\`\`\`
* I've used 
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>, to fetch the content of donut.wasm file
* \`'src/wasm/donut.wasm'\` is a location of my .wasm file
* \`js: { mem: memory },\` is where I instruct the javascript to use my \`memory\` object
* \`emscripten_resize_heap: memory.grow,\` here I provide the method to grow the current memory size. I only have to do it because I've used \`malloc\` in my code.
* Finally, I log the result of the resolved promise

<figure>
  <img
    src="/post-assets/donut-wasm/consolelog.png"
    alt="Object logged on console"
    title="Object logged on console"
  />
  <figcaption>Object logged on console</figcaption>
</figure>

As we can see our exposed methods are ready to be used under \`results.instance.exports\`. Nice!

I've found it may be a good idea to create wrappers for C methods, as I wanted them to be easy to use from the javascript perspective. 

Therefore, I've introduced a \`DonutAPI\` class. Its constructor requires the returned value of the \`instantiateStreaming\` promise. Inside, I've defined two getters, one for exposed methods and one for memory. I've also defined the \`getFrame\` method, which is a wrapper for C \`get_frame\`. 

\`\`\`javascript
export class DonutApi {
  wasmResult;

  constructor(wasmResult) {
    this.wasmResult = wasmResult;
  }

  getFrame(rows, cols, r1, r2, rotationAccumulator, distance) {
    ...
  }  

  ...

  get memory() {
    return this.wasmResult.instance.exports.memory;
  }

  get exports() {
    return this.wasmResult.instance.exports;
  }
}
\`\`\`

# \`getFrame\` method

Let's break down the \`getFrame\` method.
\`\`\`javascript
getFrame(rows, cols, r1, r2, rotationAccumulator, distance) {
  // (1) Prepare the input
  const rotationAccumulatorPointer = this.arrayToFloatPointer(rotationAccumulator);
  // (2) Call C code aka render frame
  const resultPointer = this.exports.render_frame(rotationAccumulatorPointer, cols, rows, r1, r2, distance);
  // (3) Cast returned pointer to string
  const frame = this.charPointerToString(resultPointer);

  // (4) Free the memory 
  this.exports.wasmfree(rotationAccumulatorPointer);
  this.exports.wasmfree(resultPointer);

  // (5) Format the output, add '/n' at the end of each line
  return frame.match(new RegExp(\`.{1,\${cols}}\`, 'g')).join('\\n');
}
\`\`\`
Step one is to prepare the input. Here \`rotationAccumulator\` is an array. I have to cast the javascript array of numbers to a pointer. I do that by using the \`arrayToFloatPointer\` util function (more details later).

Once the input arguments are prepared, we can proceed to step two. Step two is the most important one, I call the \`render_frame\` c method. The returned value is a pointer to the memory address where the rendered donut is being stored.

The returned value is a pointer. To use it I have to cast the pointer to javascript string. I do that by using the \`charPointerToString\` utils function (more details later).

Step four is a significant one! In step four, I free the memory, as I no longer need the pointers. I do it by using \`wasmfree\` method (the one that I previously defined in C).

Step five is a more cosmetic one. From a C perspective, I return the rendered donut as a one-dimensional array of characters; therefore, I have to manually add a newline character after each line.

# Passing a number
Passing a number from javascript to C is easy, as it works out of the box. 
\`\`\`javascript
getFrame(rows, cols, r1, r2, rotationAccumulator, distance) {
  ...
  const resultPointer = this.exports.render_frame(rotationAccumulatorPointer, cols, rows, r1, r2, distance);
  ...
}
\`\`\`
In the above example, the variables row, cols, r1, r2 and distance are numbers. I can pass them into the C render_frame method without any transformation.

# Passing an array of numbers
Passing an array of numbers from javascript to C is more difficult :)
\`\`\`javascript
getFrame(rows, cols, r1, r2, rotationAccumulator, distance) {
  const rotationAccumulatorPointer = this.arrayToFloatPointer(rotationAccumulator);
  const resultPointer = this.exports.render_frame(rotationAccumulatorPointer, cols, rows, r1, r2, distance);
  ...
}
\`\`\`
In javascript \`getFrame\` method \`rotationAccumulator\` is an array of numbers. But the C \`get_frame\` method expects a pointer to float. Therefore, we need to map an array of numbers to a float pointer.

\`\`\`javascript
arrayToFloatPointer(array) {
  const pointer = this.exports.wasmallocate(array.length * FLOAT_SIZE_IN_BYTES);
  const floatArray = new Float32Array(this.memory.buffer, pointer);
  array.forEach((item, index) => floatArray[index] = item);
  return pointer;
}
\`\`\`

I've set up a simple helper function called \`arrayToFloatPointer\`. It works in the following way:

1. Allocate array.length * SIZE_OF_FLOAT_IN_BYTES (4) bytes of memory using \`wasmallocate\` exposed method.
2. Define new <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array">Float32Array</a>, pass memory as buffer (first argument) and pointer as an offset (second argument).
3. Iterate over the array, put each item in the shared memory using Float32Array instance.
4. Return the pointer

# Reading char*
\`\`\`javascript
getFrame(rows, cols, r1, r2, rotationAccumulator, distance) {
  ...
  const resultPointer = this.exports.render_frame(rotationAccumulatorPointer, cols, rows, r1, r2, distance);
  const frame = this.charPointerToString(resultPointer);
  ...
}
\`\`\`
\`resultPointer\` is a char* from C perspective. I've set up another simple helper function called \`charPointerToString\`.

\`\`\`javascript
charPointerToString(pointer) {
  const bytes = new Uint8Array(this.memory.buffer, pointer);
  let stringLength = 0;
  while (bytes[stringLength] !== 0) stringLength++;
  return new TextDecoder("utf8").decode(bytes.slice(0, stringLength));
}
\`\`\`

It works in the following way:

1. Create a new instance of <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array">Uint8Array</a>, pass memory as buffer (first argument) and pointer as an offset (second argument).
2. We need to figure out the length of the string. Create \`stringLength\` variable and set it's value to 0. Iterate over each byte while current byte is different than 0. Increment \`stringLength\` by one in each step. Strings must be null terminated in C.
3. Read \`stringLength\` bytes from Uint8Array instance, use <a href="https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder">TextDecoder</a> to map bunch of bytes into a string.
4. Return decoded value.

# Summary
I had plenty of fun coding this side project. I've learned a lot about various computer science topics (low-level programming, memory management, and 3D graphics). I've also noticed that working on more visual projects keeps me more interested in it. It was a great pleasure to discover that we don't have to write everything in javascript anymore! We can use the language that is the best fit for a given project, we can run it in the browser via webassembly!`;export{e as default};
