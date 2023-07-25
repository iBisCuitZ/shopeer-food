import Link from "next/link";
import { Cuisine } from "@prisma/client";
export default function SearchSideBar(props) {
    const location = ["Toronto", "Ottawa", "Montreal", "Hamilton", "Kingston", "Niagara"]
    const cuisine = ['Thai', "Italian", "Mexican"]
    return (
        <div className="w-1/5">
            <div className="border-b pb-4">
                <h1 className="mb-2">Region</h1>
                {location.map((location) => {
                    const locate = location.toLowerCase()
                    return (
                        <Link href={{ pathname: "/search", query: { city: locate } }}>
                            <p className="font-light text-reg">
                                {location}
                            </p>
                        </Link>)
                })}
            </div>
            <div className="border-b pb-4 mt-3">
                <h1 className="mb-2">Cuisine</h1>
                {cuisine.map((cuisine) => {
                    return (
                        <Link href={{ pathname: "/search", query: { cuisine: cuisine } }}>
                            <p className="font-light text-reg">{cuisine}</p>
                        </Link>
                    )
                })}
            </div>
            <div className="mt-3 pb-4">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    <button className="border w-full text-reg font-light rounded-l p-2">
                        $
                    </button>
                    <button
                        className="border-r border-t border-b w-full text-reg font-light p-2"
                    >
                        $$
                    </button>
                    <button
                        className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
                    >
                        $$$
                    </button>
                </div>
            </div>
        </div >
    )
};
