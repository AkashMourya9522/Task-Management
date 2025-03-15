import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  const userId = req.userId;
  const paramsId = req.params.id;
  console.log(userId,paramsId);
  
  if (userId != paramsId) {
    return res.status(404).json({
      msg: "UnAuthorized!",
    });
  } else {
    try {
      const user = await User.findById(userId);
      return res.status(200).json(user)
    } catch (error) {}
  }
};

export const updateUser = async (req,res)=>{
    if(req.userId != req.params.id){
        return res.status(404).json({
            msg:"UnAuthorized!"
        })
    }
    const {username,email,password} = req.body
    const updatedData = {}
    if(username){
        updatedData.username = username
    }
    if(password){
        updatedData.password = bcrypt.hashSync(password,10)
    }
    if(email){
        updatedData.email = email
    }
    try {
        const dbRes = await User.findByIdAndUpdate(req.userId,{$set:updatedData},{new:true})
        return res.status(202).json(dbRes)
    } catch (error) {
        console.log(error.msg);
        
    }
}
