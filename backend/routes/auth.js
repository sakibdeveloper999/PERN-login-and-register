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
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "30d"
    });
};

// Register user

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );
        // Generate token
        const token = generateToken(newUser.rows[0].id);
        // Set cookie
        res.cookie("token", token, cookiesOptions);
        return res.status(201).json({ message: "User registered successfully, User name: " + newUser.rows[0].name });
        
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Login user

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check fields
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, userExists.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = generateToken(userExists.rows[0].id);
        // Set cookie
        res.cookie("token", token, cookiesOptions);
        return res.status(200).json({ message: "User logged in successfully, User name: " + userExists.rows[0].name });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Server error" });
    }
});