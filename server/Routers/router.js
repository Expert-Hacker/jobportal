let express=require('express');
let Router=express.Router();

let Pariusers=require('../scheema/Userscheema.js')

Router.post('/register',(req,res)=>{
    try {
        let {fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3} =req.body;

        if(!fullname)
        {
            return res.status(400).send({msg:"Name cannot be empty!"})
        }
        if(!mobile)
        {
            return res.status(400).send({msg:"Phone Number cannot be empty!"})
        }
        if(!email)
        {
            return res.status(400).send({msg:"Email cannot be empty!"})
        }
        if(!jobtype)
        {
            return res.status(400).send({msg:"Job-Type cannot be empty!"})
        }
        if(!dob)
        {
            return res.status(400).send({msg:"DOB cannot be empty!"})
        }
        if(!preflocation1 && !preflocation2 && !preflocation3)
        {
            return res.status(400).send({msg:"Pref. location cannot be empty!"})
        }
        let users=new Pariusers({
            fullname,mobile,email,jobtype,dob,preflocation1,preflocation2,preflocation3
        })
        users.save();
        res.status(201).send(users)
    } catch (error) {
        res.status(400).send({msg:"Unable complete registration!"})
    }
})

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
    try {
        let user_id=req.params.id
        let {fullname,email,phone,location1,location2,location3,dobval,jtype}=req.body;
        let resp=await Pariusers.findByIdAndUpdate({_id:user_id},{fullname,email,mobile:phone,preflocation1:location1,preflocation2:location2,preflocation3:location3,dob:dobval,jobtype:jtype},function(err,doc){
        if(err)
        {
         console.log(err)
        //  res.status(400).send("error")
        }
        else
        {
            res.status(200).send("updated")
        }
    });
    } catch (error) {
        res.status(400).send("unable to update")
    }
    
})


module.exports=Router;

