'use client'

import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from "./AuthModalInput";
import useAuth from "./../../hooks/useAuth";
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
// props = isSingIn:boolean
export default function AuthModal({ isSignIn }) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { signin, signup } = useAuth()
    const { loading, data, error } = useContext(AuthenticationContext)
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        password: '',
    });


    const handleChangeInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })

    }

    const onClickHandler = () => {
        if (isSignIn) {
            signin({ email: inputs.email, password: inputs.password }, handleClose)
        } else {
            signup(inputs, handleClose)
        }

    }
    useEffect(() => {
        if (isSignIn) {
            if (inputs.password && inputs.email) {
                return setDisabled(false);
            }
        } else {
            if (inputs.firstName && inputs.lastName && inputs.phone && inputs.password && inputs.email && inputs.city) {
                return setDisabled(false);
            }
        }
        setDisabled(true)
    }, [inputs])

    return (
        <div>
            <button
                onClick={handleOpen}
                className={`${isSignIn ? "bg-blue-400 text-white" : ""} border p-1 px-4 rounded mr-3 m-2`}
            >
                {isSignIn ? "Sign in" : "Sign up"}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? <div className="flex items-center justify-center"><CircularProgress /></div> :
                        <form className="p-2">
                            {error ? <Alert severity="error" className="mb-4">{error}</Alert> : null}
                            <div className="uppercase font-bold text-center pb-2 border-b mb-2 text-black">
                                {isSignIn ? <p>Sign in</p> : <p>Create Account</p>}
                            </div>
                            <div className="w-5/6 m-auto text-black">
                                <h2 className="text-2xl font-light text-center">
                                    {isSignIn ? <p>Login to your Account</p> : <p>Create new Account</p>}
                                </h2>
                                <AuthModalInput isSignIn={isSignIn} inputs={inputs} handleChangeInput={handleChangeInput} />
                                <button className={`uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5  disabled:bg-gray-500`}
                                    disabled={disabled}
                                    onClick={onClickHandler}
                                >
                                    {isSignIn ? <p>Sign in</p> : <p>Create Account</p>}
                                </button>
                            </div>
                        </form>}
                </Box>
            </Modal>
        </div>
    );
}
