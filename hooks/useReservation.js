import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

export default function useReservation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccasion,
        bookerRequest,
        setDidBook,
    }) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/restaurant/${slug}/reserve`,
                {
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest,
                },
                {
                    params: {
                        day,
                        time,
                        partySize,
                    },
                }
            );
            console.log(response);
            setLoading(false);
            setDidBook(true);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response.data.errorMessage);
        }
    };

    return { loading, error, createReservation };
}
