import Navbar from './components/Navbar'
import './globals.css'
// import { Inter } from 'next/font/google'
import AuthContext from "./context/AuthContext";
import "react-datepicker/dist/react-datepicker.css"

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
	return (
		<html lang="en" >
			<body className=' m-0 p-0 overflow-x-hidden scrollbar bg-white !min-w-[1000px] relative' suppressHydrationWarning={true}>
				<main className="bg-gray-100 min-h-screen w-screen text-black scrollbar">
					<AuthContext>
						<main className="max-w-screen-2xl m-auto bg-white shadow-sm shadow-gray-400 ">
							<Navbar></Navbar>
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	)
}
