import jwt from 'jsonwebtoken'

export default function verifyUser (req,res,next){
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({
            msg:"Unauthorized",
            success:false
        })
    }else{
        const decoded = jwt.decode(token,process.env.JWT_SECRET)
        req.userId = decoded.id;
        next()
    }
}