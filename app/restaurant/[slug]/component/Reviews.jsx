import ReviewCard from "./ReviewCard";
export default function Reviews(props) {
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
                What {props.reviews.length} people are saying
            </h1>
            <div>
                {/* REVIEW CARD */}
                {props.reviews.map((review) => (<ReviewCard key={review.id} reviews={review}></ReviewCard>))}
                {/* REVIEW CARD */}
            </div>
        </div>
    )
};
