import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { setCookie } from "cookies-next";


async function handler(req, res) {
    const prisma = new PrismaClient();
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors = [];
    const validationSchema = [
        {
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20,
            }),
            errorMessage: 'First name is invalid',
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20,
            }),
            errorMessage: 'Last name is invalid',
        },
        {
            valid: validator.isEmail(email),
            errorMessage: 'Email is invalid',
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: 'Phone number is invalid',
        },
        {
            valid: validator.isLength(city, { min: 1 }),
            errorMessage:
                'Phone number is invalid. Write only numbers without any special character',
        },
        {
            valid: validator.isLength(city, { min: 1 }),
            errorMessage: 'Password is invalid',
        },
    ];
    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });

    if (errors.length) {
        return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userWithEmail) {
        return res.status(400).json({ errorMessage: 'Email is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            city: city,
            phone: phone,
            email: email,
        },
    });
    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const token = await new jose.SignJWT({ email: user.email })
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

export default handler;
