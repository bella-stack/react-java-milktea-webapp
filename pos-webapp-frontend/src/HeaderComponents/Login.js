import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button 
    className='bg-yellow-200 text-black font-semibold border-black border-2 hover:bg-yellow-400 round p-2 px-4 text-lg rounded-xl hover:shadow-lg '
    onClick={() => loginWithRedirect()}
    >Log In
  </button>;
};

export default LoginButton;