import { AuthenticateAbout } from "../components/AuthenticateAbout";
import { AuthenticateHeading } from "../components/AuthenticateHeading";
import { Button } from "../components/Button";
import { LabelledInput } from "../components/LabelledInput";
import { SignupType } from "@bilalkhan01/medium-common";
import { Tandc } from "../components/Tandc";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Signup = () => {

    const [signupInputs, setSignupInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, 
                signupInputs
            );
            const jwt = response.data;
    
            localStorage.setItem('token', jwt.jwtToken);
            navigate('/blogs');
            
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                switch (error.response?.status) {
                  case 400:
                    toast.error('Bad Request');
                    break;
                  case 401:
                    toast.error('Unauthorized');
                    break;
                  case 403:
                    toast.error('Invalid Inputs');
                    break;
                  case 404:
                    toast.error('Not Found');
                    break;
                case 411:
                    toast.error('Length Required');
                    break;
                  case 500:
                    toast.error('Internal Server Error');
                    break;
                  default:
                    toast.error('An unexpected error occurred');
                }
              } else {
                toast.error('An unexpected error occurred');
              }
        }
    }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <AuthenticateAbout />
        </div>
        <div className=" flex justify-center items-center flex-col px-10 h-screen">
          <AuthenticateHeading type="signup" />
          <div className=" bg-gray-100 border-gray-400 border-2 rounded-lg px-10  py-10 my-6 lg:w-9/12">
            <LabelledInput
              label="Name"
              placeholder="John"
              onChange={(e) => {
                setSignupInputs({...signupInputs, name: e.target.value})
              }}
            />

            <LabelledInput
              label="Email"
              placeholder="John@hotmail.com"
              onChange={(e) => {
                setSignupInputs({...signupInputs, email: e.target.value})
              }}
        
            />

            <LabelledInput
              label="Password"
              placeholder="******"
              onChange={(e) => {
                setSignupInputs({...signupInputs, password: e.target.value})
              }}
              type="password"
            />

            <Button onClick={sendRequest} buttonTextType="signup"/>
          </div>
          <Tandc type="signup"/>
        </div>
      </div>
    </div>
  );
};
