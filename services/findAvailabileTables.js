import { PrismaClient, Table } from '@prisma/client';
import { NextApiResponse } from 'next';
import { times } from '../data/time';

const prisma = new PrismaClient();

export const findAvailabileTables = async ({ time, day, res, restaurant }) => {
    const searchTimes = times.find((t) => {
        return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
        return res.status(400).json({
            errorMessage: 'Invalid data provided',
        });
    }
    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
            },
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true,
        },
    });

    const bookingTablesObj = {};

    bookings.forEach((booking) => {
        bookingTablesObj[booking.booking_time.toISOString()] =
            booking.tables.reduce((obj, table) => {
                return {
                    ...obj,
                    [table.table_id]: true,
                };
            }, {});
    });
    const tables = restaurant.tables;

    const searchTimesWithTables = searchTimes.map((searchTime) => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables,
        };
    });

    searchTimesWithTables.forEach((t) => {
        t.tables = t.tables.filter((table) => {
            if (bookingTablesObj[t.date.toISOString()]) {
                return false;
            }
            return true;
        });
    });

    return searchTimesWithTables;
};
