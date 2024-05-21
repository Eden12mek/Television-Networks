User=require("../data/User")
const bcrypt=require("bcrypt")

const handleProfileUpdate=async(req,res)=>{
    console.log("handle profile update")
    try{
        const user= await User.findOne({"username":req.params.id}).exec()
        const {firstname,lastname,phone,email,password}=req.body
        if(req.file) user.imgUrl=req.file.filename
        if(firstname) user.firstname=firstname
        if(lastname)user.lastname=lastname
        if(phone)user.phoneNum=phone
        if(email)user.email=email
        if(password) {
            const hashedPwd= await bcrypt.hash(password,10);
            user.password=hashedPwd
        }
        user.save()
        res.sendStatus(200)
        }catch(err){
            res.status(500).json({"message":"server problem"})
        }
}
module.exports={handleProfileUpdate}