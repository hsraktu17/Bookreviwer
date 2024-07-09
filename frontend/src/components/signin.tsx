import { useState } from "react"
import { Link } from "react-router-dom"

function Signin () {

    const[email,setEmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")

    return <div className="bg-slate-50 flex justify-cnetern items-center h-screen">
        <div className="w-full md:w-[27rem] p-8 rounded-lg mx-auto">
            <div className="font-bold text-3xl mb-4 flex items-center justify-center">
                    Sign In
            </div>
            <div className="flex items-center justify-center mt-4">
                Don&apos;t have an account? &nbsp; <Link to={"/signup"} className="underline">SignUp</Link>
            </div>
            <div className="mt-4">
                <input 
                    className="w-full mb-4"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="w-full mb-4"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="w-full rounded-xl hover:bg-gray-800 py-1 bg-black text-white">
                Sign In
            </button>
        </div>
    </div>
}

export default Signin