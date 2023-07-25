import Link from "next/link";
import calculateReviewRaingAverage from "../../../utils/calculateReviewRatingAverage";
import Stars from "./../../components/Stars";
export default function SearchRestaurantCard(props) {
    const checkPrice = () => {
        if (props.data.price === "REGULAR") {
            return (
                <>
                    {"$$"}<span className="text-gray-300">$$</span>
                </>)
        } else if (props.data.price === "EXPENSIVE") {
            return (
                <>
                    {"$$$"}<span className="text-gray-300">$</span>
                </>
            )
        } else if (props.data.price === "CHEAP") {
            return (
                <>
                    {"$"}<span className="text-gray-300">$$$</span>
                </>
            )
        }
        return (props.data.price)
    }
    const renderRatingText = () => {
        const rating = calculateReviewRaingAverage(props.data.reviews)
        if (rating > 4) return "Awesome"
        else if (rating <= 4 && rating > 3) return "Good"
        else if (rating <= 3 && rating > 0) return "Average"
        else "No Reviews";
    }
    return (
        <div className="border-b flex pb-2 pt-2">
            <Link href={`/restaurant/${props.data.slug}`}>
                <img
                    src={props.data.main_image}
                    alt="FF"
                    className="w-44 rounded h-full"
                />
            </Link>
            <div className="pl-5">
                <h2 className="text-3xl">{props.data.name}</h2>
                <div className="flex items-start">
                    <div className="flex mb-2"><Stars reviews={props.data.reviews}></Stars></div>
                    <p className="ml-2 text-sm">{renderRatingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <p className="mr-4">{checkPrice()}</p>
                        <p className="mr-4">{props.data.cuisine.name.charAt(0).toUpperCase() + props.data.cuisine.name.slice(1)}</p>
                        <p className="mr-4">{props.data.location.name.charAt(0).toUpperCase() + props.data.location.name.slice(1)}</p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href="">View more information</Link>
                </div>
            </div>

        </div>
    )

};

