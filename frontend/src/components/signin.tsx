import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signin () {

    const[email,setEmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[validUser, setValidUser] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleSignIn = async () =>{
        try{
            const response = await axios.post('http://localhost:5000/api/v1/user/signin',{
                email : email,
                password : password
            })
            const token = response.data.token
            console.log(response.data.id)
            if(token && password.length >= 6){
                localStorage.setItem("token", response.data.token)
                // console.log(token)
                navigate('/dashboard')
                setValidUser(true)
            }else{
                setValidUser(false)
            }
        }
        catch(e){
            console.error("error:",e)
        }
    }

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
                    className="w-full mb-4 px-1 py-2"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="w-full mb-4 px-1 py-2"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="w-full rounded-xl hover:bg-gray-800 py-1 bg-black text-white" onClick={handleSignIn}>
                Sign In
            </button>
            {!validUser && (
                <div className="text-red-500 mt-4 items-center">
                    Invalid email or password
                </div>
            )}
        </div>
    </div>
}

export default Signin