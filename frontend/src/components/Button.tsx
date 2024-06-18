import { MouseEvent } from "react";

interface ButtonType {
    onClick: (e :MouseEvent<HTMLButtonElement>) => void;
    buttonTextType: string;
}


export const Button = ({onClick, buttonTextType}: ButtonType) => {
    return <button onClick={onClick} type="button" className="text-white w-full bg-black hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2">{buttonTextType==="signup"?"Sign Up": "Sign In"}</button>
}