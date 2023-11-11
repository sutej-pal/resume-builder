import React from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute, UnAuthRoute } from "./route-auth-checker";
import Dashboard from "../pages/dashboard.page";
import ResumeBuilder from "../pages/resume-builder.page";

const guestRouteChildren = [
    {
        path: "/",
        element: <Navigate replace to="/dashboard" />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "resume-builder",
        element: <ResumeBuilder />,
    },

];

export { guestRouteChildren };