import { ChangeEvent } from "react";

interface labelledInputType {
    label: string;
    placeholder: string;
    onChange: (e : ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const LabelledInput = ({label, placeholder, onChange , type}: labelledInputType) =>{
    return <div>
        <label className="block m-2 text-sm font-medium text-black">{label}</label>
        <input onChange={onChange} type={type || "text"} placeholder={placeholder} id="first_name" className="border bg-white  border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full m-2 p-2.5" required />
    </div>
}