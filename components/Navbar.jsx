import Link from "next/link";
import logo from "../public/logo.png"
import Image from "next/image";
export default function Navbar() {

    return (
        <nav className="bg-white p-2 flex justify-between align-middle">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                <Image src={logo.src} width="130" height="50" alt="logo" className="p-1" />
            </Link>
            <div className="flex align-middle justify-center">
                <button
                    className="bg-blue-400 text-white border p-1 px-4 rounded mr-3 m-2"
                >
                    Sign in
                </button>
                <button className="border p-1 px-4 rounded m-2">Sign up</button>
            </div>

        </nav>
    )
};
