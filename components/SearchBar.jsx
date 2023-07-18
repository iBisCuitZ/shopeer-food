'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    return (
        <form className=" rounded-md text-left text-lg m-7 flex justify-center shadow-md "
            onSubmit={(event) => {
                event.preventDefault();
                router.push(`/search?city=${location}`)
            }}>
            <input
                className="rounded  mr-3 p-2 w-[450px] "
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={(event) => { setLocation(event.target.value) }}
            />
            <button
                type="submit"
                className="rounded-xl bg-red-600 px-9 py-2 text-white ">
                Let's go
            </button>
        </form>
    )
};
