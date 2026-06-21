import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "..//config/bd.js";

dotenv.config();
const protect = async (req, res, next) => {
    try{

        // get token from cookies
        const token = req.cookies.token;

        // check if token exists 
        if(!token){
            return res.status(401).json({message: "Not authorized, no token"})
        }

        // verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // fetch user from database
        const user = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [decoded.id]);

        // check if user exists
        if(user.rows.length === 0){
            return res.status(401).json({message: "Not authorized, user not found"})
        }

        // attach user to request object
        req.user = user.rows[0];

        next();

    }catch(error){
        console.log("Error in auth middleware:", error);
        return res.status(401).json({message: "Not authorized, token failed"})
    }
};

export default protect;