import calculateReviewRatingAverage from "../../../../utils/calculateReviewRatingAverage";
import Stars from "./../../../components/Stars";

export default function Rating(props) {
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={props.reviews} />
                <p className="text-reg ml-3">
                    {calculateReviewRatingAverage(props.reviews).toFixed(1)}
                </p>
            </div>
            <div>
                <p className="text-reg ml-4">{props.reviews.length} Review{props.reviews.length === 1 ? "" : "s"}</p>
            </div>
        </div>
    )
};
