import Signup from "../components/signup"

function SignUp(){
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-1 md:order-2">
            <Signup/>
        </div>
    </div>
}

export default SignUp