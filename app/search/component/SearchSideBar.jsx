import Link from "next/link";
import { Cuisine } from "@prisma/client";
export default function SearchSideBar(props) {
    const location = ["Toronto", "Ottawa", "Niagara"]
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
        </div >
    )
};
