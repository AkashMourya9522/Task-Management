import User from "../models/user.model"


export const signup = (req,res)=>{
    const {username,email,password} = req.body
    const user = User.findOne({email})
    if(user){
        res.json({
            success:false,
            message:"Email Already Taken"
        })
    }
    
}