let express=require('express');
let app=express();
let Routers=require('./Routers/router.js')
require('./db/db.js')
let bodyParser= require('body-parser');
let port=process.env.PORT || 5000;

app.use(bodyParser.json())

app.use(Routers)

//testing route
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(port,()=>{
    console.log(`Express is running at port ${port}`)
})