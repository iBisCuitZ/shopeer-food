'use client'

import Link from "next/link";
import { useState } from "react";

export default function RestaurantNavbar(props) {
    const [effectOverview, setEffect] = useState(true);
    const setHandleEffectOn = (event) => {
        setEffect(true)
    }
    const setHandleEffectOff = (event) => {
        setEffect(false)
    }
    return (
        <nav className="flex text-reg border-b pb-2 h-11">
            <Link href={`/restaurant/${props.params.slug}`} onClick={setHandleEffectOn} className={`${effectOverview ? "text-cyan-700 text-base font-bold bg-slate-200 rounded-lg p-1 transition-all " : ""} mr-7 flex items-center `}> Overview </Link>
            <Link href={`/restaurant/${props.params.slug}/menu`} onClick={setHandleEffectOff} className={`${!effectOverview ? "text-cyan-700 text-base font-bold bg-slate-200 rounded-lg p-1 transition-all" : ""} mr-7  flex items-center`}> Menu </Link>
        </nav >
    )
};