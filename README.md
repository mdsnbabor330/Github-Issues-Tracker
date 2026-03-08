1️⃣ What is the difference between var, let, and const?
Ans:
var:এটি পুরোনো পদ্ধতি। এটিকে পুনরায় declare এবং update করা যায়।
let:এটি নতুন পদ্ধতি। এটিকে update করা যায় কিন্তু আবার declare করা যায় না।
const:এটি এমন ভ্যারিয়েবল যার value পরিবর্তন করা যায় না।

2️⃣ What is the spread operator (...)?
Ans:
Spread operator (...) ব্যবহার করা হয় array বা object এর ভ্যালুগুলো আলাদা করতে।
এটি দিয়ে সহজে array copy করা বা নতুন value যোগ করা যায়।

3️⃣ What is the difference between map(), filter(), and forEach()?র্র্
Ans:
map(): প্রতিটি element পরিবর্তন করে নতুন array তৈরি করে।
filter(): condition অনুযায়ী element বেছে নতুন array তৈরি করে।
forEach(): শুধু array এর প্রতিটি element এর উপর loop চালায়, কিন্তু নতুন array return করে না।

4️⃣ What is an arrow function?
Ans:
Arrow function হলো JavaScript-এ ছোট এবং সহজভাবে function লেখার একটি পদ্ধতি
const add = (a, b) => {
  return a + b;
};

5️⃣ What are template literals?
Ans:
Template literals ব্যবহার করা হয় সহজভাবে string তৈরি করার জন্য এবং string এর মধ্যে variable ব্যবহার করার জন্য।
const name = "Babor";
const message = `Hello, my name is ${name}`;