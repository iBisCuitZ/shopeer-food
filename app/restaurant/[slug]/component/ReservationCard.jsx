'use client'

import DatePicker from 'react-datepicker';
import { partySize as partySizes, times } from "./../../../../data";
import { useContext, useState } from 'react';
import useAvailable from '../../../../hooks/useAvailability';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthenticationContext } from "./../../../context/AuthContext";


export default function ReservationCard(slug) {
    const user = useContext(AuthenticationContext)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [time, setTime] = useState("12:00:00.000Z");
    const { data, loading, error, fetchAvailable } = useAvailable()
    const [partySize, setPartySize] = useState("2")
    const [day, setDay] = useState(new Date().toISOString().split("T")[0])
    const changeDateHandler = (date) => {
        if (date) {
            setDay(date.toISOString().split("T")[0])
            return setSelectedDate(date);
        }
        return setSelectedDate(null)
    }
    const handleClick = () => {
        fetchAvailable({
            slug,
            day,
            time,
            partySize,
        });

    };

    return (
        <div className="fixed w-[21%] bg-white rounded p-3 shadow hover:scale-110">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select name="" className="py-3 border-b font-light" id=""
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                >
                    {partySizes.map(partySize => (
                        <option value={partySize.value} >{partySize.label}</option>

                    ))}
                </select>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <div className="flex flex-col w-full">
                        <DatePicker selected={selectedDate} onChange={changeDateHandler} className=" py-3 border-b font-light text-reg w-full" dateFormat="MMMM d" wrapperClassName="w-[48%]"></DatePicker>
                    </div>
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select name="" id="" className="py-3 border-b font-light" value={time} onChange={(e) => setTime(e.target.value)}>
                        {times.map(time => (
                            <option value={time.time}>{time.displayTime}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    onClick={handleClick}
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> :
                        "Find a Time"}
                </button>
            </div>
            {data && data.length ? (
                <div className="mt-4">
                    <p className="text-reg">Select a Time</p>
                    <div className="flex flex-wrap mt-2 justify-between">
                        {data.map(time => {
                            return time.available ?
                                <Link className="flex justify-center bg-red-500 cursor-pointer p-2 w-24 text-white mb-3 rounded mr-3"
                                    href={`/reserve/${slug.slug}?date=${day}T${time.time}&partySize=${partySize}&${user.data ? `user=${user.data.email}` : null}`}
                                >
                                    <p className="text-sm font-bold">{time.time.split(":")[0] + ":" + time.time.split(":")[1]}</p>
                                </Link> :
                                <p className='flex justify-center bg-gray-500 p-2 w-24 text-white mb-3 rounded mr-3'> Full </p>
                        })}
                    </div>
                </div>
            ) : null}
        </div >
    )
};
