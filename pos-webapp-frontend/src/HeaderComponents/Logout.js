import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="bg-black text-white font-semibold border-black border-2 hover:bg-gray-700 round p-2 px-4 text-lg rounded-xl hover:shadow-lg" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;