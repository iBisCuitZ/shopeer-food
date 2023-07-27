import React from 'react'
import emptyStar from '../../public/icons/empty-star.png'
import halfStar from '../../public/icons/half-star.png'
import fullStar from '../../public/icons/full-star.png'
import Image from 'next/image'
import calculateReviewRaingAverage from '../../utils/calculateReviewRatingAverage'
import Rating from "./../restaurant/[slug]/component/Rating";

export default function Stars({ reviews, ratings }) {
    const checkValues = reviews ? true : false
    const r = checkValues ? calculateReviewRaingAverage(reviews) : ratings
    const renderStar = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((r - i).toFixed(1))
            if (difference >= 1) stars.push(fullStar)
            else if (difference < 1 && difference > 0) {
                if (difference < 0.2) stars.push(emptyStar)
                else if (difference > 0.2 && difference <= 0.7) stars.push(halfStar)
                else stars.push(fullStar)
            }
            else stars.push(emptyStar)
        }
        return stars.map((star, index) => (
            <Image alt="star" src={star} className="w-4 h-4 mr-1" key={index} />
        ))
    }

    return (
        <div className="flex items-center">{renderStar()}</div>
    )
}
