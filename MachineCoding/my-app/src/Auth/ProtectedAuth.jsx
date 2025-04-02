import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

//custom hook

const useAuth = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  useEffect(() => {
    //call api or do stuff to update auth state
  });

  // could return otherstuff as well
  return isUserAuthenticated;
};

//Higher order component

const ProtectedAuth = () => {
  const isUserAuthenticated = useAuth();
  return isUserAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedAuth;
