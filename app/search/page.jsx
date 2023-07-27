import SearchHeader from "./component/SearchHeader";
import SearchSideBar from "./component/SearchSideBar";
import SearchRestaurantCard from "./component/SearchRestaurantCard";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const metadata = {
    title: "Search - Shopeer Food",
    icons: {
        icon: '/icon.ico'
    },
    description: "Generated by create next app",
};

export default async function Search(props) {
    let searchKey = ""
    let result = []
    if (props.searchParams.city) {
        searchKey = Object.values(props.searchParams)[0].toLowerCase();
        result = await fetchRestaurantByLocation(searchKey)
    }
    else if (props.searchParams.cuisine) {
        searchKey = Object.values(props.searchParams)[0].toLowerCase();
        result = await fetchRestaurantByCuisine(searchKey)
    }
    const location = await fetchLocation()
    const cuisine = await fetchCuisine()
    return (
        <>
            <SearchHeader></SearchHeader>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start ">
                <SearchSideBar location={location}
                    cuisine={cuisine}
                >
                </SearchSideBar>
                <div className="w-5/6">
                    {result.length > 0 ? result.map((data) => {
                        return <SearchRestaurantCard data={data}></SearchRestaurantCard>
                    }) : <div className="p-32">No Restaurant Found</div>}
                </div>
            </div>
        </>
    )
};

async function fetchRestaurantByLocation(searchParams) {
    const restaurant = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            images: true,
            main_image: true,
            price: true,
            cuisine: true,
            location: true,
            slug: true,
            reviews: true
        },
        where: {
            location: {
                name: searchParams
            }
        },
    })
    return restaurant
}
async function fetchRestaurantByCuisine(searchParams) {
    const restaurant = await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            images: true,
            main_image: true,
            price: true,
            cuisine: true,
            location: true,
            slug: true,
            reviews: true

        },
        where: {
            cuisine: {
                name: searchParams
            }
        },
    })
    return restaurant
}
async function fetchLocation(keyword) {
    return await prisma.location.findMany()
}
async function fetchCuisine(keyword) {
    return await prisma.cuisine.findMany()
}
