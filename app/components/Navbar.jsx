"use client"

import Link from "next/link";
import logo from "../../public/logo.png"
import Image from "next/image";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import ReservationListModal from "./ReservationListModal"
export default function Navbar() {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const { data, loading } = useContext(AuthenticationContext)
    const { signout } = useAuth()

    return (
        <nav className="bg-white p-2 flex justify-between align-middle">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                <Image alt="star" src={logo.src} width="130" height="50" className="p-1" />
            </Link>
            {loading ? <div className="flex align-middle justify-center items-center"><CircularProgress /></div> : <div className="flex align-middle justify-center items-center">
                {data ? `Welcome, ${data.firstName}` : null}
                {data ? <>
                    <ReservationListModal userEmail={data.email} username={data.firstName} />
                    <button className="border p-1 px-4 rounded mr-3 m-2 bg-red-400 hover:bg-red-600" onClick={signout}>Logout</button></>
                    :
                    <>
                        <AuthModal isSignIn={false} />
                        <AuthModal isSignIn={true} />
                    </>}
            </div>}

        </nav>
    )
};
