import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        await User.findByIdAndUpdate(
            userId, 
            {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000
            }
        )
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}