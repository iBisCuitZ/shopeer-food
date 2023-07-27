import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAvailabileTables } from '../../../../services/findAvailabileTables';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { slug, day, time, partySize } = req.query;
        const {
            bookerEmail,
            bookerPhone,
            bookerFirstName,
            bookerLastName,
            bookerOccasion,
            bookerRequest,
        } = req.body;
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug,
            },
            select: {
                tables: true,
                id: true,
            },
        });
        if (!restaurant) {
            return res.status(400).json({
                errorMessage: 'Restaurant not found',
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
                errorMessage: 'reserve" Invalid data provided',
            });
        }

        const searchTimeWithTables = searchTimesWithTables.find((t) => {
            return (
                t.date.toISOString() ===
                new Date(`${day}T${time}`).toISOString()
            );
        });

        if (!searchTimeWithTables) {
            return res.status(400).json({
                errorMessage: 'No availablity, cannot book',
            });
        }

        const tablesCount = {
            2: [],
            4: [],
        };

        searchTimeWithTables.tables.forEach((table) => {
            if (table.seats === 2) {
                tablesCount[2].push(table.id);
            } else {
                tablesCount[4].push(table.id);
            }
        });

        const tablesToBooks = [];

        let seatsRemaining = parseInt(partySize);

        while (seatsRemaining > 0) {
            if (seatsRemaining >= 3) {
                if (tablesCount[4].length) {
                    tablesToBooks.push(tablesCount[4][0]);
                    tablesCount[4].shift();
                    seatsRemaining = seatsRemaining - 4;
                } else {
                    tablesToBooks.push(tablesCount[2][0]);
                    tablesCount[2].shift();
                    seatsRemaining = seatsRemaining - 2;
                }
            } else {
                if (tablesCount[2].length) {
                    tablesToBooks.push(tablesCount[2][0]);
                    tablesCount[2].shift();
                    seatsRemaining = seatsRemaining - 2;
                } else {
                    tablesToBooks.push(tablesCount[4][0]);
                    tablesCount[4].shift();
                    seatsRemaining = seatsRemaining - 4;
                }
            }
        }

        const booking = await prisma.booking.create({
            data: {
                number_of_people: parseInt(partySize),
                booking_time: new Date(`${day}T${time}`),
                booker_email: bookerEmail,
                booker_phone: bookerPhone,
                booker_first_name: bookerFirstName,
                booker_last_name: bookerLastName,
                booker_occasion: bookerOccasion,
                booker_request: bookerRequest,
                restaurant_id: restaurant.id,
            },
        });
        console.log('ZA in reserve');
        const bookingsOnTablesData = tablesToBooks.map((table_id) => {
            return {
                table_id,
                booking_id: booking.id,
            };
        });

        await prisma.bookingsOnTables.createMany({
            data: bookingsOnTablesData,
        });

        return res.json(booking);
    }
}
