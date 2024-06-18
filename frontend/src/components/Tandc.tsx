export const Tandc = ({type}: {type: string}) =>{
    return <div className="m-2">
            By {type==="signup" ? "signing up" : "signing in"}, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
    </div>
}