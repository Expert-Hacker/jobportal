let dotenv=require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("DB connection Success!")
})
.catch((err)=>{
    console.log("DB connection failed")
})