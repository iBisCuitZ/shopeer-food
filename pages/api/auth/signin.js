import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from 'jose';
import { setCookie } from "cookies-next"

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    if (req.method === 'POST') {
        const { email, password } = req.body
        const errors = []
        const validateionSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: "Email is invalid",
            },
            {
                valid: validator.isLength(password, {
                    min: 1
                }),
                errorMessage: "Password is invalid",
            }
        ];
        // =================
        // Validate Input
        // =================
        validateionSchema.forEach(check => {
            if (!check.valid) {
                errors.push(check.errorMessage)
            }
        })

        if (errors.length) {
            return res.status(400).json({ errorMessage: errors[0] })
        }
        // =================
        // Query Email
        // =================
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        // =================
        // Check if founded or not
        // =================
        if (!user) {
            return res.status(401).json({ errorMessage: "Email or password is invalid" })
        }
        // =================
        // Check Password
        // =================
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ errorMessage: "Email or password is invalid" })
        }
        // =================
        // SetCookies
        // =================
        const alg = 'HS256';
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const token = await new jose.SignJWT({ email: email })
            .setProtectedHeader({ alg })
            .setExpirationTime('24h')
            .sign(secret)

        setCookie("jwt", token, { req, res, maxAge: 86400 })

        return res.json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city

        })


    }
    return res.status(404).json("Unknown endpoint")
}