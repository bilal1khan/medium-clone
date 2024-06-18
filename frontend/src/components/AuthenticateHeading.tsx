import { Link } from "react-router-dom"
export const AuthenticateHeading = ({type}: { type: "signup" | "signin"}) => {
    return <div className="">
        <div className="text-3xl font-extrabold">
            {type === "signup" ? <div>Create an Account</div> : <div >Login to Your Account</div>}
        </div>
        <div className="">
            {type=== "signup" ? <div>Already have an account? <Link className="underline mx-1" to={'/signin'}>Sign-in</Link></div> : <div>Don't have an account?<Link className="underline mx-1" to={'/signup'}>Sign-up</Link></div>}
        </div>
    </div>
}