import { Review } from "@prisma/client";

const calculateReviewRaingAverage = (reviews) => {
    if (!reviews?.length) return 0;
    return (reviews.reduce((sum, review) => {
        return sum + review.rating
    }, 0) / reviews.length)
}

export default calculateReviewRaingAverage;