import Link from "next/link";
import Navbar from "../../../components/Navbar";
import RestaurantHeader from "./../component/RestaurantHeader";
import RestaurantNavbar from "./../component/RestaurantNavbar";
import Menu from "./../component/Menu";
import { PrismaClient } from "@prisma/client";

export const metadata = {
    icons: {
        icon: '/icon.ico'
    },
    title: "Reserve at Milestones Grill (Toronto) - Shopeer Food",
    description: "Generated by create next app",
};
const prisma = new PrismaClient()
/////////////////////////////////////
const fetchMenu = async (slug) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            name: true,
            items: true
        }
    })
    return restaurant;
}
/////////////////////////////////////
export default async function RestaurantMenu(props) {
    const restaurant = await fetchMenu(props.params.slug);
    console.log(restaurant)
    return (
        <>
            <RestaurantHeader data={restaurant.name}></RestaurantHeader>
            <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
                <div className="bg-white w-[100%] rounded p-3 shadow">
                    <RestaurantNavbar params={props.params} menuActive={true}></RestaurantNavbar>
                    <Menu menu={restaurant.items}></Menu>
                </div>
            </div>
        </>
    )
};
