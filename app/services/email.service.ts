import nodemailer from 'nodemailer'
export class EmailService{
    static generateOTP = async () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); 
    };
    static sendOTPEmail = async (clientEmail: string, otp: string):Promise<boolean> =>{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
                from: process.env.EMAIL_USER,
                to: clientEmail,
                subject: 'Your OTP for Account Verification',
                text: `Your OTP is: ${otp}. It will expire in 15 minutes.`,
                html: `<p>Your OTP is: <b>${otp}</b>. It will expire in 15 minutes.</p>`
        };
        await transporter.sendMail(mailOptions);
        return true;

    }
}