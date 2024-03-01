const e=`---
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
    content: https://nieruchalski.dev/deciphering-facebook
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

## Background

During my time at the university, we had a group chat on Facebook Messenger with a couple of my closest friends. As some exams were coming up, we had been noticing that we were starting to text each other more and more, and during holidays, our group chat was almost dead. 

We’ve started joking that we don’t really like each other, and the only reason that we’re still in touch is to survive the university and pass the exams. As I’ve just graduated (yaaay!&nbsp;🥳🎉), I’ve realized that now is a good time to analyze the group chat!

## Getting the data
First things first, I had to collect the data. Luckily, there’s a built-in Facebook mechanism for exporting all the chat messages. You simply go to **Settings** and use the search bar to search for **“Download your information.”**. If everything went well, you should see the dialog below:

<figure>
  <img 
    src="/post-assets/deciphering-facebook/download-info-dialog.png" 
    alt="Download your information dialog"
    title="Download your information dialog"
    width="600px"
  />
  <figcaption>Download your information dialog</figcaption>
</figure>

Then you can specify what kind of data you want to download (messages) and define the time range (3 years in my case). You can also choose your output format, I have chosen JSON, but there is also HTML available. And then… you wait! You’ll be notified by email when the data will be ready to download. Be patient, it took about 9 hours in my case.

<!-- TODO: powinienem zdecydować czy piszę o tym jak to zrobić, czy jak ja to zrobiłem -->

## The output format
The data was broken down into multiple .zip archives and each archive was about ~6 GB. Each archive contained files that looked something like this:

\`\`\`html
- messages
  - inbox
    - [Group chat name]_[bunch of numbers (propably some kind of id)]
      - message_1.json
      - ...
      - message_8.json
      - photos
      - videos
      - ...
\`\`\`

Our messages were located inside message.json files. Each of those files was about ~2.4 MB. Let’s take a look at that JSON:

\`\`\`json
{
  "participants": [
    { "name": "Firstname Lastname" },
    ...
  ],
  "messages": [
    {
      "sender_name": "Firstname Lastname",
      "timestamp_ms": 1708467078703,
      "content": "Content of the message"
    },
    ...
  ]
}
\`\`\`

## Let’s code!
Now to the fun part. At this point, I had everything I needed to successfully analyze the chat history. I’ve started by writing a simple node.js script. My goal was to transform multiple .JSON files into a single .sqlite file. That transformation enabled me to examine the chat history via SQL queries.

\`\`\`javascript
import fs from 'fs';
import sqlite3 from 'sqlite3';

const NUMBER_OF_FILES = 8;
const FILE_PREFIX = 'message_';
const FILE_EXTENSION = '.json';
const MESSAGE_DIR = 'messages';
const OUTPUT_FILE = 'db.sqlite';
const fixEncoding = m => Buffer.from(m ?? '', 'latin1').toString('utf8');
const millisecondToSecond = ms => Math.floor(ms / 1000);

const messages = Array.from({ length: NUMBER_OF_FILES })
  .map((_, index) => \`\${MESSAGE_DIR}/\${FILE_PREFIX}\${index + 1}\${FILE_EXTENSION}\`)
  .map((filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8')))
  .reduce((accumulator, { messages }) => {
    return [...accumulator, ...messages];
  }, []);

const db = new sqlite3.Database(OUTPUT_FILE);
db.serialize(() => {
  db.run("CREATE TABLE messages (author TEXT, message TEXT, date INTEGER)");
  const insertStatement = db.prepare("INSERT INTO messages (author, message, date) VALUES (?, ?, ?)");
  messages.forEach(({ sender_name, content, timestamp_ms }) => 
    insertStatement.run(fixEncoding(sender_name), fixEncoding(content), millisecondToSecond(timestamp_ms))
  );
  insertStatement.finalize();
});
db.close();
\`\`\`
As I said, the script is not very complicated. First, I load all the messages into a single “messages” variable. Then I create a new .sqlite file and I name it “db.sqlite”. Next, I create a new “messages” table, and finally, I iterate over each message and insert it as a new row into our SQL table.

The mysterious “fixEncoding” method is a workaround. I’m Polish, and we use a couple of non-standard Latin signs (ąćęłńóśźż). For some reason, Facebook does not handle those properly in exported files. You can read more about that [here](https://stackoverflow.com/questions/50008296/facebook-json-badly-encoded).

## Results
Then I’ve opened a [DBeaver](https://dbeaver.io/) and created a connection to the “db.sqlite” file. 

\`\`\`sql
SELECT 
	datetime(MIN(date), 'unixepoch') as 'First message',
	datetime(MAX(date), 'unixepoch') as 'Last message'
FROM messages;
\`\`\`
The first message was sent at 2022-02-11 17:57:19, and the last at 2024-02-09 22:02:42.

\`\`\`sql
SELECT COUNT(*) FROM messages;
\`\`\`
In total, we have sent 76277 messages.

Now, which one of us was the most active? (I’ve removed the surnames :D)
\`\`\`sql
WITH totalcount AS (
	SELECT COUNT(*) as 'total_count' FROM messages
)
SELECT 
	author, 
	COUNT(*) as 'Message Count',
	printf("%.2f%%", (CAST(COUNT(*) as FLOAT) / total_count) * 100) as 'Percentage'
FROM messages, totalcount
GROUP BY author 
ORDER BY COUNT(*) DESC;
\`\`\`

\`\`\`html
author             |Message Count|Percentage|
-------------------+-------------+----------+
Krystian           |        17686|23.19%    |
Dawid K            |        17164|22.50%    |
Szymon P           |        10607|13.91%    |
Dawid G            |         8911|11.68%    |
Michał (me)        |         8122|10.65%    |
Kuba               |         7617|9.99%     |
Szymon K           |         6170|8.09%     |
\`\`\`

Now to the final question: Were we really communicating more frequently during the exam period? Let’s check it out.

\`\`\`sql
SELECT
	STRFTIME('%m-%Y', DATETIME(date, 'unixepoch')) as 'Month',
	COUNT(*) as 'Count'
FROM messages
GROUP BY STRFTIME('%m-%Y', DATETIME(date, 'unixepoch'))
ORDER BY date;
\`\`\`
\`\`\`html
Month  |Count|
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
\`\`\`
Since right now, it’s just a bunch of numbers, I’ll create a Barchart, to visualize it.

<figure>
  <img
    src="/post-assets/deciphering-facebook/barchart.png"
    alt="Chart: Number of messages a Month"
    title="Chart: Number of messages a Month"
  />
  <figcaption>Chart: Number of messages a month</figcaption>
</figure>

We had the majority of our exams in four months: January, February, June, and July. (I’ve highlighted the bars representing those values in red.) And as you can see from the bar chart, yes, we did indeed text more during this busy exam period.
Another noteworthy observation is that we were able to dispatch over 10 000 messages in June 2022, during the exam period, and as low as 310 in August 2023, during the holidays 😅

## Further ideas
Here are a few ideas for analysis that one can perform on this kind of data:

* Average length of message
* Average length of message per user
* The most frequent word
* The most frequent curse 😅
* Who’s swearing the most?
* Who sent the most photos/videos?
* Who’s the funny one? Who received the most laughing reactions?

## Summary
Once I received the data, I had plenty of fun analyzing the JSON, transforming it into .sqlite and then finally analyzing the data using SQL queries. My friends made fun of me by saying that this article shows what happens when you have too much time after graduating. (And I think they are right 😆) All the source code is available on my [GitHub](https://github.com/remes2000/koledzy_uam).
`;export{e as default};
