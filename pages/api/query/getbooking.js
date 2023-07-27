import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { userEmail } = req.query;

    if (req.method === 'GET') {
        try {
            const userBooking = await prisma.booking.findMany({
                where: {
                    booker_email: userEmail,
                },
                select: {
                    booking_time: true,
                    number_of_people: true,
                    booker_phone: true,
                    booker_occasion: true,
                    booker_request: true,
                    restaurant: true,
                },
            });
            if (!userBooking) {
                res.status(400).json({
                    errorMessage: 'Not found',
                });
            }

            return res.json(userBooking);
        } catch (error) {
            return res.status(400).json({
                errorMessage: 'Invalid data provided',
            });
        }
    }
}
