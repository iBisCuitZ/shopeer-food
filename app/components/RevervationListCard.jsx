

const ReservationListCard = ({ booking }) => {
    const [day, t] = booking.booking_time.split("T")
    const time = t.split(".")[0]
    return (
        <div className="w-full h-20 bg-gray-300 mt-5 flex align-middle flex-col justify-center rounded-lg">
            <p className="text-start ml-5">Booking at {booking.restaurant.name} for {booking.number_of_people} people</p>
            <p className="text-start ml-5">on {day} at {time}</p>
        </div>
    );

}

export default ReservationListCard;