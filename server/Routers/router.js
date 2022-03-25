let express=require('express');
let mongoose=require('mongoose')
let Router=express.Router();
let multer=require('multer')
let Pariusers=require('../scheema/Userscheema.js')
let path=require('path');

require('../scheema/model')
let File=mongoose.model('file')

const storage = multer.diskStorage({
    
    destination:"../client/public/images",
    filename: function(req, file, cb){
       cb(null,"paris-" + Date.now() + path.extname(file.originalname));
    }
    
 });

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("profile");

 const obj=(req,res)=>{
    upload(req,res,()=>{
        //access regular data from client
        let{fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3,profile}=req.body;

        console.log("FULL", fullname)
        console.log("FULL", mobile)
            if(!fullname || fullname=="undefined")
            {
                return res.status(400).send("Name cannot be empty!")
            }
            if(!mobile || mobile=="undefined")
            {
                return res.status(400).send("Phone Number cannot be empty!")
            }
            if(!email)
            {
                return res.status(400).send("Email cannot be empty!")
            }
            if(!jobtype)
            {
                return res.status(400).send("Job-Type cannot be empty!")
            }
            if(!dob)
            {
                return res.status(400).send("DOB cannot be empty!")
            }
            if(!preflocation1 && !preflocation2 && !preflocation3)
            {
                return res.status(400).send("Pref. location cannot be empty!")
            }

        //access file related information from client
        let file = new File();
        file.meta_data=req.file;
        console.log("re.file", req.file)

            if(!req.file)
            {
                return res.status(400).send("Size is high. Please choose different image")
            }

        let filename=req.file.originalname;
        let path1=req.file.path.replace('..',"");
        path1=path1.replace(/\\/g,'/')
        

        file.save().then(()=>{
            if(req.file==undefined || req.file.originalname==undefined)
            {
                return res.status(400).send("This file is not supported")
            }
    
            if(req.file.mimetype=="image/png" || req.file.mimetype=="image/jpeg" || req.file.mimetype=="image/jpg")
            {
                createuser(fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3,path1,filename)
                res.status(201).send("created")
            }
            else
            {
                return res.status(400).send("This file is not supported")
            }
        })
    })
 }

Router.post("/upload",obj,(req,res)=>{
    
})


async function createuser(fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3,path1,filename)
{
    try {
          
            let resp=new Pariusers({
                fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3,path:path1,filename:fullname
            })
            resp.save();
            // res.status(201).send(users)
    } catch (error) {
        // res.status(400).send({msg:"Unable complete registration!"})
        console.log("Reg Error")
    }
}

Router.get("/fetchAllusers",async(req,res)=>{
    try {
        let resp=await Pariusers.find().sort({createdAt:-1});
        res.status(200).send(resp);
    } catch (error) {
        res.status(400).send({msg:"Unable to fetch users!"});
    }
})

Router.delete("/deteteuser/:id",async(req,res)=>{
    try {
        let user_id=req.params.id
        let resp=await Pariusers.deleteOne({_id:user_id});
        res.status(200).send("user deleted succesfully!")
    } catch (error) {
        res.status(400).send("unable to delete the user")
    }
    
})

Router.get("/getuserdetails/:id",async(req,res)=>{
    try {
        let u_id=req.params.id
        let resp=await Pariusers.findById({_id:u_id});
        res.status(200).send(resp)
    } catch (error) {
        res.status(400).send("Error")
    }
})

Router.put('/updateuser/:id',async(req,res)=>{
  
        let user_id=req.params.id
        let {fullname,email,phone,location1,location2,location3,dobval,jtype}=req.body;
        let resp=await Pariusers.findByIdAndUpdate({_id:user_id},{fullname,email,mobile:phone,preflocation1:location1,preflocation2:location2,preflocation3:location3,dob:dobval,jobtype:jtype},function(err,doc){
        if(err)
        {
         console.log(err)
        //  return res.status(400).send("error")
        }
        else
        {
           return res.status(200).send("updated")
        }
    });
})


module.exports=Router;

