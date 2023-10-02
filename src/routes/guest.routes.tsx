import React from "react";
import { Navigate } from "react-router-dom";
import { AuthRoute, UnAuthRoute } from "./route-auth-checker";
import { LoginPage } from "../pages/login.page";
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
    {
        path: "/login",
        element: (
            <UnAuthRoute>
                <React.Suspense fallback={<>...</>} >
                    <LoginPage />
                </React.Suspense>
            </UnAuthRoute>
        ),
    },
];

export { guestRouteChildren };