const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/usermessage");
const app  = express();
const port = process.env.PORT || 3000;

// setting path 
const staticPath = path.join(__dirname , "../public")
const templatePath = path.join(__dirname , "../templates/views")
const partialsPath = path.join(__dirname , "../templates/partials")

app.use('/css',express.static(path.join(__dirname , "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname , "../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname , "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticPath));



app.set('view engine',"hbs");
app.set('views',templatePath);
hbs.registerPartials(partialsPath);
// routing 

app.get("/",(req,res)=>{
    res.render("index");
})


app.post("/contact",async (req,res)=>{
    try{
    //   res.send(req.body);
    const userData = new User(req.body);
   await userData.save();
   res.status(201).render("index");
    }
    catch(err){
        res.status(500).send(err);
    }
})


app.get("*",(req,res)=>{
    res.status(404);
    res.send("404 Page Not Found");
})

// server create

app.listen(port , ()=>{
    console.log(`Server Listening on ${port} `);
})