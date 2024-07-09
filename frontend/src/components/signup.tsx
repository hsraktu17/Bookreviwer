import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup () {

    const[email,setEmail] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const[firstname,setFirstname] = useState<string>("")
    const[lastname,setLastname] = useState<string>("")
    const[validUser,setValidUser] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleSignup = async () =>{
        try{
            const response = await axios.post("http://localhost:5000/api/v1/user/signup",{
                email : email,
                password : password,
                firstname : firstname,
                lastname : lastname
            })
            const token = response.data.token
            if(token && password.length >= 6){
                localStorage.setItem("token", response.data.token)
                console.log(token)
                navigate('/dashboard')
                setValidUser(true)
            }else{
                setValidUser(false)
            }
        }catch(e){
            console.error("error:",e)
        }
        
    }


    return <div className="bg-slate-50 flex justify-cnetern items-center h-screen">
        <div className="w-full md:w-[27rem] p-8 rounded-lg mx-auto">
            <div className="font-bold text-3xl mb-4 flex items-center justify-center">
                    Sign Up
            </div>
            <div className="flex items-center justify-center mt-4">
                Already have an account? &nbsp; <Link to={"/signin"} className="underline">SignIn</Link>
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
                <input 
                    className="w-full mb-4 px-1 py-2"
                    type="text"
                    placeholder="firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input 
                    className="w-full mb-4 px-1 py-2"
                    type="text"
                    placeholder="lastname"
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <button className="w-full rounded-xl hover:bg-gray-800 py-1 bg-black text-white" onClick={handleSignup}>
                Sign up
            </button>
        </div>
    </div>
}

export default Signup