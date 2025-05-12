const n=`---
title: "Deciphering Facebook: Analyzing Messenger Chats"
slug: deciphering-facebook
subtitle: How do you find out if your friends like you?
thumbnail: /post-assets/deciphering-facebook/thumbnail.jpg
date: 2024-02-26 20:00:00.000Z
author: Michał Nieruchalski
meta:
  - name: description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:title
    content: "Deciphering Facebook: Analyzing Messenger Chats"
  - property: og:description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:image
    content: https://nieruchalski.dev/post-assets/deciphering-facebook/header.jpg
  - property: og:url
    content: https://nieruchalski.dev/blog/deciphering-facebook
---

<figure>
  <img
    src="/post-assets/deciphering-facebook/header.jpg"
    alt="Facebook Messenger Logo"
    title="Facebook Messenger Logo"
  />
  <figcaption>
    Photo by <a href="https://unsplash.com/photos/white-and-blue-apple-logo-xdBNTAdqU3A">Brett Jordan</a>
  </figcaption>
</figure>

<h2 id="background">Background</h2>
<p>During my time at the university, we had a group chat on Facebook Messenger with a couple of my closest friends. As some exams were coming up, we had been noticing that we were starting to text each other more and more, and during holidays, our group chat was almost dead. </p><p>We’ve started joking that we don’t really like each other, and the only reason that we’re still in touch is to survive the university and pass the exams. As I’ve just graduated (yaaay!&nbsp;🥳🎉), I’ve realized that now is a good time to analyze the group chat!</p><h2 id="getting-the-data">Getting the data</h2>
<p>First things first, I had to collect the data. Luckily, there’s a built-in Facebook mechanism for exporting all the chat messages. You simply go to <strong>Settings</strong> and use the search bar to search for <strong>“Download your information.”</strong>. If everything went well, you should see the dialog below:</p><figure>
  <img 
    src="/post-assets/deciphering-facebook/download-info-dialog.png" 
    alt="Download your information dialog"
    title="Download your information dialog"
    width="600px"
  />
  <figcaption>Download your information dialog</figcaption>
</figure>

<p>Then you can specify what kind of data you want to download (messages) and define the time range (3 years in my case). You can also choose your output format, I have chosen JSON, but there is also HTML available. And then… you wait! You’ll be notified by email when the data will be ready to download. Be patient, it took about 9 hours in my case.</p><!-- TODO: powinienem zdecydować czy piszę o tym jak to zrobić, czy jak ja to zrobiłem -->

<h2 id="the-output-format">The output format</h2>
<p>The data was broken down into multiple .zip archives and each archive was about ~6 GB. Each archive contained files that looked something like this:</p><pre><code class="language-html">- messages
  - inbox
    - [Group chat name]_[bunch of numbers (propably some kind of id)]
      - message_1.json
      - ...
      - message_8.json
      - photos
      - videos
      - ...
</code></pre><p>Our messages were located inside message.json files. Each of those files was about ~2.4 MB. Let’s take a look at that JSON:</p><pre><code class="language-json"><span class="token punctuation">{</span>
  <span class="token property">"participants"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Firstname Lastname"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"messages"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"sender_name"</span><span class="token operator">:</span> <span class="token string">"Firstname Lastname"</span><span class="token punctuation">,</span>
      <span class="token property">"timestamp_ms"</span><span class="token operator">:</span> <span class="token number">1708467078703</span><span class="token punctuation">,</span>
      <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Content of the message"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><h2 id="lets-code">Let’s code!</h2>
<p>Now to the fun part. At this point, I had everything I needed to successfully analyze the chat history. I’ve started by writing a simple node.js script. My goal was to transform multiple .JSON files into a single .sqlite file. That transformation enabled me to examine the chat history via SQL queries.</p><pre><code class="language-javascript"><span class="token keyword">import</span> fs <span class="token keyword">from</span> <span class="token string">'fs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> sqlite3 <span class="token keyword">from</span> <span class="token string">'sqlite3'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">NUMBER_OF_FILES</span> <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">FILE_PREFIX</span> <span class="token operator">=</span> <span class="token string">'message_'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">FILE_EXTENSION</span> <span class="token operator">=</span> <span class="token string">'.json'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">MESSAGE_DIR</span> <span class="token operator">=</span> <span class="token string">'messages'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">OUTPUT_FILE</span> <span class="token operator">=</span> <span class="token string">'db.sqlite'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">fixEncoding</span> <span class="token operator">=</span> <span class="token parameter">m</span> <span class="token operator">=></span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>m <span class="token operator">??</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token string">'latin1'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'utf8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">millisecondToSecond</span> <span class="token operator">=</span> <span class="token parameter">ms</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>ms <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> messages <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token constant">NUMBER_OF_FILES</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">MESSAGE_DIR</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">FILE_PREFIX</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token constant">FILE_EXTENSION</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">filepath</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filepath<span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">accumulator<span class="token punctuation">,</span> <span class="token punctuation">{</span> messages <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span>accumulator<span class="token punctuation">,</span> <span class="token operator">...</span>messages<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> db <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">sqlite3<span class="token punctuation">.</span>Database</span><span class="token punctuation">(</span><span class="token constant">OUTPUT_FILE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  db<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token string">"CREATE TABLE messages (author TEXT, message TEXT, date INTEGER)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> insertStatement <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token string">"INSERT INTO messages (author, message, date) VALUES (?, ?, ?)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  messages<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> sender_name<span class="token punctuation">,</span> content<span class="token punctuation">,</span> timestamp_ms <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> 
    insertStatement<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token function">fixEncoding</span><span class="token punctuation">(</span>sender_name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">fixEncoding</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">millisecondToSecond</span><span class="token punctuation">(</span>timestamp_ms<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  insertStatement<span class="token punctuation">.</span><span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><p>As I said, the script is not very complicated. First, I load all the messages into a single “messages” variable. Then I create a new .sqlite file and I name it “db.sqlite”. Next, I create a new “messages” table, and finally, I iterate over each message and insert it as a new row into our SQL table.</p><p>The mysterious “fixEncoding” method is a workaround. I’m Polish, and we use a couple of non-standard Latin signs (ąćęłńóśźż). For some reason, Facebook does not handle those properly in exported files. You can read more about that <a href="https://stackoverflow.com/questions/50008296/facebook-json-badly-encoded">here</a>.</p><h2 id="results">Results</h2>
<p>Then I’ve opened a <a href="https://dbeaver.io/">DBeaver</a> and created a connection to the “db.sqlite” file. </p><pre><code class="language-sql"><span class="token keyword">SELECT</span> 
	<span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token function">MIN</span><span class="token punctuation">(</span><span class="token keyword">date</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'unixepoch'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'First message'</span><span class="token punctuation">,</span>
	<span class="token keyword">datetime</span><span class="token punctuation">(</span><span class="token function">MAX</span><span class="token punctuation">(</span><span class="token keyword">date</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'unixepoch'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'Last message'</span>
<span class="token keyword">FROM</span> messages<span class="token punctuation">;</span>
</code></pre><p>The first message was sent at 2022-02-11 17:57:19, and the last at 2024-02-09 22:02:42.</p><pre><code class="language-sql"><span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> messages<span class="token punctuation">;</span>
</code></pre><p>In total, we have sent 76277 messages.</p><p>Now, which one of us was the most active? (I’ve removed the surnames :D)</p><pre><code class="language-sql"><span class="token keyword">WITH</span> totalcount <span class="token keyword">AS</span> <span class="token punctuation">(</span>
	<span class="token keyword">SELECT</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'total_count'</span> <span class="token keyword">FROM</span> messages
<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> 
	author<span class="token punctuation">,</span> 
	<span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'Message Count'</span><span class="token punctuation">,</span>
	printf<span class="token punctuation">(</span><span class="token string">"%.2f%%"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>CAST<span class="token punctuation">(</span><span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token keyword">FLOAT</span><span class="token punctuation">)</span> <span class="token operator">/</span> total_count<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'Percentage'</span>
<span class="token keyword">FROM</span> messages<span class="token punctuation">,</span> totalcount
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> author 
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre><pre><code class="language-html">author             |Message Count|Percentage|
-------------------+-------------+----------+
Krystian           |        17686|23.19%    |
Dawid K            |        17164|22.50%    |
Szymon P           |        10607|13.91%    |
Dawid G            |         8911|11.68%    |
Michał (me)        |         8122|10.65%    |
Kuba               |         7617|9.99%     |
Szymon K           |         6170|8.09%     |
</code></pre><p>Now to the final question: Were we really communicating more frequently during the exam period? Let’s check it out.</p><pre><code class="language-sql"><span class="token keyword">SELECT</span>
	STRFTIME<span class="token punctuation">(</span><span class="token string">'%m-%Y'</span><span class="token punctuation">,</span> <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token keyword">date</span><span class="token punctuation">,</span> <span class="token string">'unixepoch'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'Month'</span><span class="token punctuation">,</span>
	<span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token string">'Count'</span>
<span class="token keyword">FROM</span> messages
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> STRFTIME<span class="token punctuation">(</span><span class="token string">'%m-%Y'</span><span class="token punctuation">,</span> <span class="token keyword">DATETIME</span><span class="token punctuation">(</span><span class="token keyword">date</span><span class="token punctuation">,</span> <span class="token string">'unixepoch'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token keyword">date</span><span class="token punctuation">;</span>
</code></pre><pre><code class="language-html">Month  |Count|
-------+-----+
02-2022| 2599|
03-2022| 2705|
04-2022| 3651|
05-2022| 6403|
06-2022|10064|
07-2022| 2173|
08-2022| 1449|
09-2022| 1589|
10-2022| 2191|
11-2022| 1985|
12-2022| 2157|
01-2023| 5368|
02-2023| 9484|
03-2023| 3524|
04-2023| 1054|
05-2023| 1534|
06-2023| 3758|
07-2023| 1104|
08-2023|  310|
09-2023| 1455|
10-2023| 3055|
11-2023| 1061|
12-2023| 1537|
01-2024| 3325|
02-2024| 2742|
</code></pre><p>Since right now, it’s just a bunch of numbers, I’ll create a Barchart, to visualize it.</p><figure>
  <img
    src="/post-assets/deciphering-facebook/barchart.png"
    alt="Chart: Number of messages a Month"
    title="Chart: Number of messages a Month"
  />
  <figcaption>Chart: Number of messages a month</figcaption>
</figure>

<p>We had the majority of our exams in four months: January, February, June, and July. (I’ve highlighted the bars representing those values in red.) And as you can see from the bar chart, yes, we did indeed text more during this busy exam period.
Another noteworthy observation is that we were able to dispatch over 10 000 messages in June 2022, during the exam period, and as low as 310 in August 2023, during the holidays 😅</p><h2 id="further-ideas">Further ideas</h2>
<p>Here are a few ideas for analysis that one can perform on this kind of data:</p><ul>
<li>Average length of message</li>
<li>Average length of message per user</li>
<li>The most frequent word</li>
<li>The most frequent curse 😅</li>
<li>Who’s swearing the most?</li>
<li>Who sent the most photos/videos?</li>
<li>Who’s the funny one? Who received the most laughing reactions?</li>
</ul>
<h2 id="summary">Summary</h2>
<p>Once I received the data, I had plenty of fun analyzing the JSON, transforming it into .sqlite and then finally analyzing the data using SQL queries. My friends made fun of me by saying that this article shows what happens when you have too much time after graduating. (And I think they are right 😆) All the source code is available on my <a href="https://github.com/remes2000/koledzy_uam">GitHub</a>.</p>`;export{n as default};
