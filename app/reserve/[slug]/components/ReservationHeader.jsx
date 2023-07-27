import { format } from 'date-fns'


export default function ReservationHeader({ image, name, date, partySize }) {
    const [day, t] = date.split("T")
    const time = t.split(".")[0]
    const showPartySize = partySize.split("null")[0]
    return (
        <div>
            <h3 className="font-bold">You're almost done!</h3>
            <div className="mt-5 flex">
                <img
                    src={image}
                    alt="AS"
                    className="w-32 h-18 rounded"
                />
                <div className="ml-4">
                    <h1 className="text-3xl font-bold">
                        {name}
                    </h1>
                    <div className="flex mt-3">
                        <p className="mr-6">{format(new Date(date), "ccc, LLL d")}</p>
                        <p className="mr-6">{time}</p>
                        <p className="mr-6">{showPartySize} people</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
