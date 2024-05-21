const User=require("../data/User")
const Activity=require("../data/Activity")
const bcrypt=require("bcrypt");
const getCustomers=async(req,res)=>{
    const results=await User.find({},{password:false})
    return res.status(201).json(results)
}
const getUser=async(req,res)=>{
    console.log(req.params.username)
    const result=await User.findOne({"username":req.params.username}).exec()
    res.status(201).json(result)
}
const getActivity=async(req,res)=>{
    console.log(req.params.username)
    const result=await Activity.find({"username":req.params.username}).exec()
    res.status(201).json(result)
}
const addUser=async(req,res)=>{
    const {username,firstname,lastname,password,role,phoneNum,email,sellerCode,pdtToken}=req.body;
    if(!username || !password|| !role || !firstname || !lastname || !phoneNum ||!email) return res.status(400).json({"message":"bad request"})
    const duplicate= await User.findOne({username:username}).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        const hashedPwd= await bcrypt.hash(password,10);
        const result=await User.create({
            "username":username,
            "firstname":firstname,
            "lastname":lastname,
            "password":hashedPwd,
            "roles":parseInt(role),
            "email":email,
            "phoneNum":parseInt(phoneNum),
            "imgUrl":req.file.filename,
            
        })
        console.log(result);
        console.log("new user added")
       return  res.status(201).json({"success":"new username is created"})
    }catch(err){
       return res.status(500).json({"error":"server problem"})
    }    
}
const deleteUser=async(req,res)=>{
    const username=req.params.username;
    const role=req.params.role
    console.log(username,role)
    console.log("delete operation progressing")
    if(!username||!role)return res.sendStatus(404)
    try{
        const deleteUser3=await User.deleteOne({"username":username})
        return res.status(201).json({"message":username+" deleted succesfully"})
    }catch(err){
        return res.status(404).json({"message":"user can't be deleted problem"})
    }
}
const editMember=async(req,res)=>{
    const username=req.params.username;
    const {role,lat,lon,sellerCode,pdtToken}=req.body;
    const result=await User.findOne({"username":username})
    try{
        if(lat)result.lat=lat;
        if(lon)result.lon=lon;
    return res.status(201).json({"message":usersname+"edited member"})
    }catch(err){
        return res.status(500).json({"message":"server problem"})
    }
}
const toggleSuspend=async(req,res)=>{
    const username=req.params.id;
    console.log(username)
    try{
        const result=await User.findOne({"username":username}).exec()
        var status=result.suspended;
        result.suspended=!status;
        result.save()
        return res.status(201).json({"message":username+"status is updated member"})
    }catch(err){
        return res.status(500).json({"message":"server problem"})
    }
}
module.exports={getActivity,addUser,getCustomers,editMember,getUser,deleteUser,toggleSuspend}