import {app} from './app';
import dotenv from 'dotenv';
import { initiateSwagger } from './swagger/swagger';

dotenv.config();


const start = async () =>{

    const requiredEnvVars = [
        'PORT',
        'PGHOST',
        'PGUSER',
        'PGPASSWORD',
        'PGDATABASE',
        'PGPORT',
        'JWT_SECRET',
        'JWT_EXPIRES_IN',
        'EMAIL_USER',
        'EMAIL_PASS'
    ];

    for (const varName of requiredEnvVars) {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is missing!`);
        }
    }
    initiateSwagger(app);

}

app.listen(process.env.PORT, ()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});
start();