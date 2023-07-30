import { useState } from 'react';
import axios from 'axios';

export default function useFetchBooking() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchBooking = async (userEmail) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/query/getbooking`, {
                params: {
                    userEmail: userEmail,
                },
            });
            if (!response) {
                throw new Error({ message: 'Could not find' });
            }
            setData(null);
            setLoading(false);
            setData(response.data);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.errorMessage);
        }
    };
    return { loading, data, error, fetchBooking };
}
