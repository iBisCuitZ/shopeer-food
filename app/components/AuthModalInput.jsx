const AuthModalInput = ({ inputs, handleChangeInput, isSignIn }) => {
    return (
        <div className="">
            {/* Check If Login or not */}
            {!isSignIn ? <><div className="my-3 flex justify-between text-sm">
                <input onChange={handleChangeInput} name="firstName" value={inputs.firstName} type="text" placeholder="First Name" className="border rounded p-2 py-3 w-[49%]" />
                <input onChange={handleChangeInput} name="lastName" value={inputs.lastName} type="text" placeholder="Last Name" className="border rounded p-2 py-3 w-[49%]" />
            </div>
                <div className="my-3 flex justify-between text-sm">
                    <input onChange={handleChangeInput} name="phone" value={inputs.phone} type="text" placeholder="Phone" className="border rounded p-2 py-3 w-[49%]" />
                    <input onChange={handleChangeInput} name="city" value={inputs.city} type="text" placeholder="City" className="border rounded p-2 py-3 w-[49%]" />
                </div></> : ""}
            <div className="my-3 flex justify-between text-sm">
                <input onChange={handleChangeInput} name="email" value={inputs.email} type="text" placeholder="Email" className="border rounded p-2 py-3 w-full" />
            </div>
            <div className="my-3 flex justify-between text-sm">
                <input onChange={handleChangeInput} name="password" value={inputs.password} type="password" placeholder="Password" className="border rounded p-2 py-3 w-full" />
            </div>
        </div>
    );
}

export default AuthModalInput;