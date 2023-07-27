"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const AuthenticationContext = createContext({
    loading: true,
    error: null,
    data: null,
    setAuthState: () => { },
});

export default function AuthContext({
    children
}) {
    const [authState, setAuthState] = useState({
        loading: true,
        data: null,
        error: null,
    });

    const fetchUser = async () => {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            sleep(2000)
            const jwt = getCookie("jwt");

            if (!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false,
                });
            }

            const response = await axios.get("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
        } catch (error) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthenticationContext.Provider
            value={{
                ...authState,
                setAuthState,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}