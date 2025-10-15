const mongoose = require('mongoose');//reuire mongoose
const Chat = require("./models/chats.js");


main()
.then(()=>
{
    console.log("connection successful");
})
.catch((err) => console.log(err));//to call asyn main function

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const messages = [
  { from: "rahul", to: "neha", msg: "Hey! What are you doing?", created_at: new Date() },
  { from: "neha", to: "rahul", msg: "Just watching a movie 😄", created_at: new Date() },
  { from: "arjun", to: "meera", msg: "Did you finish the project?", created_at: new Date() },
  { from: "meera", to: "arjun", msg: "Almost done, sending it tonight!", created_at: new Date() },
  { from: "priya", to: "amit", msg: "Let's meet for coffee ☕", created_at: new Date() },
  { from: "amit", to: "priya", msg: "Sure! Tomorrow evening?", created_at: new Date() },
  { from: "ravi", to: "suman", msg: "Call me when youre free.", created_at: new Date() },
  { from: "suman", to: "ravi", msg: "Okay, give me 10 mins.", created_at: new Date() },
  { from: "deepak", to: "pankaj", msg: "Hows your new job?", created_at: new Date() },
  { from: "pankaj", to: "deepak", msg: "Its great! Learning a lot.", created_at: new Date() },
  { from: "sneha", to: "rohit", msg: "Happy Birthday 🎉", created_at: new Date() },
  { from: "rohit", to: "sneha", msg: "Thanks a lot 😍", created_at: new Date() },
  { from: "nidhi", to: "karan", msg: "Are you coming to the party?", created_at: new Date() },
  { from: "karan", to: "nidhi", msg: "Yes! At 7 PM sharp.", created_at: new Date() },
  { from: "anil", to: "geeta", msg: "Check your email please.", created_at: new Date() },
  { from: "geeta", to: "anil", msg: "Got it, will reply soon.", created_at: new Date() },
  { from: "tina", to: "varun", msg: "Lunch together today?", created_at: new Date() },
  { from: "varun", to: "tina", msg: "Sure! 1 PM?", created_at: new Date() },
  { from: "arjun", to: "rahul", msg: "Game night tonight?", created_at: new Date() },
  { from: "rahul", to: "arjun", msg: "Im in! Lets do it 🎮", created_at: new Date() },
];

 Chat.insertMany(messages);

