import { PrismaClient } from '@prisma/client';

export default async function createTable(req, res) {
    const prisma = new PrismaClient();
    const restaurants = await prisma.restaurant.findMany();
    const addToRestaurant =
        restaurants.find((restaurant) => restaurant.name === 'El Catrin')?.id ||
        1;
    await prisma.table.createMany({
        data: [
            {
                restaurant_id: addToRestaurant,
                seats: 4,
            },
            {
                restaurant_id: addToRestaurant,
                seats: 4,
            },
            {
                restaurant_id: addToRestaurant,
                seats: 4,
            },
        ],
    });
    return res.json({ message: `Table Added` });
}
