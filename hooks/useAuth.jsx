import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { getCookie, deleteCookie } from "cookies-next";

const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(AuthenticationContext)


    const signin = async ({ email, password }, handleClose) => {
        setAuthState({
            data: null,
            email: null,
            loading: true,

        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin", {
                email, password
            })

            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (err) {
            setAuthState({
                data: null,
                error: err.response.data.errorMessage,
                loading: false
            })
        }
    }

    const signup = async ({ email, password, firstName, lastName, city, phone }, handleClose) => {
        setAuthState({
            data: null,
            email: null,
            loading: true,

        })
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                email, password, firstName, lastName, city, phone
            })
            setAuthState({
                data: response.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (err) {
            setAuthState({
                data: null,
                error: err.response.data.errorMessage,
                loading: false
            })
        }
    }

    const signout = () => {
        deleteCookie("jwt");
        setAuthState({
            data: null,
            error: null,
            loading: false
        })
    }
    return {
        signin, signup, signout
    };
}

export default useAuth;