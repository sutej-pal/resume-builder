import React from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute, UnAuthRoute } from "./route-auth-checker";
import Dashboard from "../pages/dashboard.page";

const guestRouteChildren = [
    {
        path: "/",
        element: <Navigate replace to="/dashboard" />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },

];

export { guestRouteChildren };