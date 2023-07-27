import { PrismaClient } from '@prisma/client';
import { findAvailabileTables } from '../../../../services/findAvailabileTables';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { slug, day, time, partySize } = req.query;
        if (!day || !time || !partySize) {
            return res.status(400).json({
                errorMessage: 'ava Invalid data provided',
            });
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug,
            },
            select: {
                tables: true,
            },
        });
        if (!restaurant) {
            return res.status(400).json({
                errorMessage: 'ava Invalid data provided',
            });
        }

        const searchTimesWithTables = await findAvailabileTables({
            day,
            time,
            res,
            restaurant,
        });

        if (!searchTimesWithTables) {
            return res.status(400).json({
                errorMessage: 'ava Invalid data provided',
            });
        }

        const availabilities = searchTimesWithTables.map((t) => {
            const sumSeats = t.tables.reduce((sum, table) => {
                return sum + table.seats;
            }, 0);

            return {
                time: t.time,
                available: sumSeats >= parseInt(partySize),
            };
        });

        return res.json(availabilities);
    }
}
