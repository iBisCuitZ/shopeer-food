import ReservationHeader from "./components/ReservationHeader";
import ReservationForm from "./components/ReservationForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        }
    })
    if (!restaurant) {
        notFound()
    }

    return restaurant
}

const fetchUserByName = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (!user) {
        notFound()
    }
    return user
}

export default async function Reserve({ params, searchParams }) {
    let user = {}
    const restaurant = await fetchRestaurantBySlug(params.slug)
    if (searchParams.user) {
        user = await fetchUserByName(searchParams.user)
    }
    return (
        <div className="border-t h-screen">
            <div className="py-9 w-3/5 m-auto">
                <ReservationHeader image={restaurant.main_image} name={restaurant.name} partySize={searchParams.partySize} date={searchParams.date} />
                <ReservationForm date={searchParams.date} partySize={searchParams.partySize} slug={params.slug} authUser={searchParams.user ? user : null} />
            </div>
        </div>
    )
};
