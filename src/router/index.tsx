import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import AppointmentsPage from "../pages/appointments/AppointmentsPage.tsx";
import StaffAccountsPage from "../pages/staff_accounts/StaffAccountsPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import UserAccountsPage from "../pages/user_accounts/UserAccountsPage.tsx";
import UserDetailsPage from "../pages/user_accounts/UserDetailsPage.tsx";
import MembershipOrdersPage from "../pages/membership_orders/MembershipOrdersPage.tsx";


const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <SignInPage />,
      },
      // Auth Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: <ProtectedPage />,
          },
          {
            path: "/appointments",
            element: <AppointmentsPage />,
          },
          {
            path: "/staff",
            element: <StaffAccountsPage />,
          },
          {
            path: "/users",
            element: <UserAccountsPage />,
          },
          {
            path: "/userdetails",
            element: <UserDetailsPage/>,
          },
          {
            path: "/membershipOrders",
            element: <MembershipOrdersPage/>,
          },
            
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);


export default router;
