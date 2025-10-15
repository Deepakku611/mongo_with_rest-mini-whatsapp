const express = require('express');
const app = express();
const mongoose = require('mongoose');//reuire mongoose
const Chat = require("./models/chats.js");
//establish connection
main()
.then(()=>
{
    console.log("connection successful");
})
.catch((err) => console.log(err));//to call asyn main function

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let port = 8080;
const methodOverride = require("method-override");//to acess other rquest like patch,put,delete
app.use(methodOverride("_method"));//to use method overrride

const path = require("path");//to use views and public folder
app.set("view engine","ejs"); 
app.set("views",path.join(__dirname,"views"));//set to access views folder to acces from any where
app.use(express.static(path.join(__dirname,"public")));//set to access public folder to acces from any where

app.use(express.urlencoded({extended:true }));//to parse every data when we use post request
app.use(express.json());

//index route
app.get("/chats", async (req,res)=>{

    let chats = await Chat.find();//hence it is asynchronous fn so we have await hence it is await we have create async fun
   // console.log(chats);
    res.render("index.ejs",{ chats });
});

//new form for add
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

// add in database
app.post("/chats",(req,res)=>{
  let {from , to, msg} = req.body;
  let data = new Chat(
    {
      from:from,
      to:to,
      msg:msg,
      created_at:new Date(),
    }
  )
  data.save().then((data)=>
  {
    res.send(`
            <script>
              alert("Data add successful!");
              window.location.href = "/chats";
            </script>
          `);
  })
  .catch((err)=>
  {
    console.log(err);
  })
  // res.send(`
  //           <script>
  //             alert("Data add successful!");
  //             window.location.href = "/chats";
  //           </script>
  //         `);
});

app.get("/chats/:id/edit",async(req,res)=>{
  let { id }  = req.params;
  let chat = await Chat.findById(id);
    res.render("edit.ejs",{ chat });
});

app.put("/chats/:id",async(req,res)=>{
  let { id }  = req.params;
  let {msg : message} = req.body;
  let newchat = await Chat.findByIdAndUpdate(id,{ msg : message },{runValidators:true,new : true});
  //console.log(newchat);
    res.send(`
            <script>
              alert("Data edited successful!");
              window.location.href = "/chats";
            </script>
          `);
});

//to delete
app.delete("/chats/:id",async(req,res)=>{
  let { id }  = req.params;
 
  let newchat = await Chat.findByIdAndDelete(id);
  //console.log(newchat);
    res.send(`
            <script>
              alert("Data deleted successful!");
              window.location.href = "/chats";
            </script>
          `);
});


app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.listen(port,()=>
{
  console.log(`listening on port : ${port}`);
});