
import Link from "next/link";
import calculateReviewRaingAverage from "../../utils/calculateReviewRatingAverage";
import Stars from "./Stars";
export default function RestaurantCard(props) {

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
    const renderRatingText = () => {
        const rating = calculateReviewRaingAverage(restaurant.reviews)
        if (rating > 4) return "Awesome"
        else if (rating <= 4 && rating > 3) return "Good"
        else if (rating <= 3 && rating > 0) return "Average"
        else "";
    }
    return (
        <div
            className=" w-64 h-72 m-3 mt-10 rounded overflow-hidden border cursor-pointer text-black 
                        hover:scale-110 delay-50 transition-all hover:shadow-gray-400 shadow-lg"
        >
            <Link href={`/restaurant/${props.restaurant.slug}`} >
                <img
                    src={props.restaurant.main_image}
                    alt="Za"
                    className="w-full h-36 "
                />

                <div className="p-1">
                    <h3 className="font-bold text-1xl mb-2">{props.restaurant.name}</h3>
                    <div className="flex items-start">
                        <div className="flex mb-2"><Stars reviews={props.restaurant.reviews}></Stars></div>
                        <p className="ml-2">{props.restaurant.reviews.length} review{props.restaurant.reviews.length === 1 ? "" : "s"}</p>
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
                    <p className="text-sm mt-1 font-bold">Booked {props.restaurant.reviews.length} times today</p>
                </div>
            </Link>
        </div>
    )
};
