
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(' ')[1];
    const payload = jose.decodeJwt(token);

    if (!payload.email) return

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    })

    if (!user) {
        return res.status(401).json({
            errorMessage: "User not found"
        })
    }

    return res.json({ id: user.id, firstName: user.first_name, lastName: user.last_name, city: user.city, phone: user.phone })
}