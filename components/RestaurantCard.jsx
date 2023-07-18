
import Link from "next/link";
export default function RestaurantCard(props) {
    console.log(props.restaurant)
    const checkPrice = () => {
        if (props.restaurant.price === "REGULAR") {
            return (
                <>
                    {"$$"}<span className="text-gray-300">$$</span>
                </>)
        } else if (props.restaurant.price === "EXPENSIVE") {
            return (
                <>
                    {"$$$"}<span className="text-gray-300">$</span>
                </>
            )
        } else if (props.restaurant.price === "CHEAP") {
            return (
                <>
                    {"$"}<span className="text-gray-300">$$$</span>
                </>
            )
        }
        return (props.restaurant.price)
    }
    return (
        <div
            className=" w-64 h-72 m-3 mt-10 rounded overflow-hidden border cursor-pointer text-black 
                        hover:scale-110 delay-50 transition-all hover:shadow-gray-400 shadow-lg"
        >
            <Link href={`/restaurant/${props.restaurant.slug}`} >
                <img
                    src={props.restaurant.main_image}
                    alt=""
                    className="w-full h-36 "

                />
                <div className="p-1">
                    <h3 className="font-bold text-2xl mb-2">{props.restaurant.name}</h3>
                    <div className="flex items-start">
                        <div className="flex mb-2">*****</div>
                        <p className="ml-2">77 reviews</p>
                    </div>
                    <div className="flex text-reg font-light capitalize">
                        <p className=" mr-3">
                            {/* {props.restaurant.cuisine.name} */}
                        </p>
                        <p className="mr-3 font-bold">{checkPrice()}</p>
                        <p>
                            {/* {props.restaurant.location.name} */}
                        </p>
                    </div>
                    <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
                </div>
            </Link>
        </div>
    )
};
