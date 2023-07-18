'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    return (
        <form className=" rounded-full text-left text-lg m-7 flex justify-center shadow-md focus-within:scale-105 focus-within:shadow-lg focus-within:rounded-md transition-all duration-300 "
            onSubmit={(event) => {
                event.preventDefault();
                router.push(`/search?city=${location}`)
            }}>
            <input
                className="rounded-3xl  mr-3 p-4 w-[450px] focus:scale-105 focus:rounded-md duration-300 transition-all"
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={(event) => { setLocation(event.target.value) }}
            />
            <button
                type="submit"
                className="rounded-xl bg-red-500 px-4 py-2 text-white m-2 hover:bg-red-600 hover:scale-105 transition-all duration-200">
                Let's go
            </button>
        </form>
    )
};
