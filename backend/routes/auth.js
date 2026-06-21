import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import pool from "../config/bd.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

// Set cookie options
const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
};

// generate JWT token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: "30d"
    });
};

