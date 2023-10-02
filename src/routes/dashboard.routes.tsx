import { User } from "../types/generic/user.type";
import { isAdmin } from "../helpers/role.helper";
import Dashboard from "../pages/dashboard.page";
import ResumeBuilder from "../pages/resume-builder.page";

const userDashboardRouteChildren = (user: User) => (
    [
        {
            path: "dashboard",
            element: <Dashboard />,
        },
        {
            path: "resume-builder",
            element: <ResumeBuilder />,
        },
    ]
);
const adminDashboardRouteChildren = (user?: User) => (
    []
);

const dashboardRoutes = (user: User) =>
    isAdmin(user)
        ? adminDashboardRouteChildren(user)
        : userDashboardRouteChildren(user);

export { dashboardRoutes };
