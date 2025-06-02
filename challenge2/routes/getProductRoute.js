import { Router } from "express";

const router = Router();

router.get('/hello', (req, res)=>{
    console.log("Hello");
    res.send("HelloWorld");
});