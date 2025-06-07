import {app} from './app';
import dotenv from 'dotenv';
dotenv.config();


const start = async () =>{
    if(!process.env?.EMAIL_USER || !process.env?.EMAIL_PASS){
        throw new Error("EMAIL_USER or EMAIL_PASSWORD is missing!");
    }
}

app.listen(process.env.PORT, ()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});
start();