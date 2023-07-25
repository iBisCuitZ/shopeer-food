"use client"

import Link from "next/link";
import logo from "../../public/logo.png"
import Image from "next/image";
import AuthModal from "./AuthModal";
import { AuthenticationContext } from "../context/AuthContext";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
export default function Navbar() {
    const { data, loading } = useContext(AuthenticationContext)
    const { signout } = useAuth()
    return (
        <nav className="bg-white p-2 flex justify-between align-middle">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                <Image alt="star" src={logo.src} width="130" height="50" className="p-1" />
            </Link>
            {loading ? null : <div className="flex align-middle justify-center items-center">
                {data ? `Welcome, ${data.firstName}` : null}
                {data ? <button className="border p-1 px-4 rounded mr-3 m-2 bg-red-400 hover:bg-red-600" onClick={signout}>Logout</button> : <> <AuthModal isSignIn={false} />
                    <AuthModal isSignIn={true} /></>}
            </div>}

        </nav>
    )
};
