import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import useFetchBooking from "../../hooks/useFetchBooking"
import { Box, CircularProgress } from '@mui/material';
import ReservationListCard from "./RevervationListCard";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    color: "black"

};

export default function BasicModal({ userEmail, username }) {
    const { loading, data, error, fetchBooking } = useFetchBooking()
    const [toggleFetch, setToggle] = useState(true)
    // const [bookingList, setBookingList] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setToggle(!toggleFetch)
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const waitHerAisus = async () => {
            await fetchBooking(userEmail)
        }
        waitHerAisus()
        return () => null
    }, [toggleFetch])

    return (
        <div>
            <button className="border p-1 px-4 rounded gap-3 m-2 bg-blue-400 hover:bg-blue-600 text-white" onClick={handleOpen}>Reservation List</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} className="w-[90%] h-[70%] md:w-[60%] lg:w-[30%] overflow-y-auto overflow-x-hidden">
                        {loading ? <div className='flex justify-center items-center h-full'><CircularProgress class></CircularProgress></div> :
                            <>
                                <h1 className='border-b-2 pb-4 text-4xl font-monserrat'>Reservation List of {username}</h1>
                                {data ? data.map(booking => (<ReservationListCard booking={booking} key={booking.time} />)) : null}
                            </>
                        }
                    </Box>
                </>
            </Modal>
        </div>


    );
}
