import {app} from './app';
import dotenv from 'dotenv';

dotenv.config();

const start = async () =>{

}
app.listen(process.env.PORT, ()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});
start();