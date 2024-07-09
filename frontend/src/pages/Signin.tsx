import Quote from "../components/quotes"
import Signin from "../components/signin"

function SignIn(){
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1">
                <Quote/>
            </div>
            <div className="order-1 md:order-2">
                <Signin/>
        </div>
    </div>
}

export default SignIn