import { Outlet, createBrowserRouter, Navigate } from "react-router-dom";
import Footer from "../components/footer";
import { Header } from "../components/header";
import { User } from "../types/generic/user.type";
import Error404 from "../pages/error-404.pages";
import { AuthRoute } from "./route-auth-checker";
import { dashboardRoutes } from "./dashboard.routes";
import { guestRouteChildren } from "./guest.routes";
import Dashboard from "../pages/dashboard.page";


function generateRoutes(user: User | null) {

    const authRoutes = user ? [
        {
            path: "/", // dashboard
            element: (
                <AuthRoute>
                    <Header />
                    <Outlet />
                    <Footer />
                </AuthRoute>
            ),
            children: dashboardRoutes(user)
        }
    ] : [];

    return createBrowserRouter([
        {
            path: "/", // homepage
            element: (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            ),
            errorElement: <Error404 />,
            children: guestRouteChildren,
        },
        // ...authRoutes,
    ])
}

export default generateRoutes;