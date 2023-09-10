import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Main from './mainLayout/Main';
import Home from './pages/home/Home';
import CollegeDetails from './pages/collegeDetails/CollegeDetails';
import AllColleges from './pages/all-college/AllColleges';
import Admission from './pages/admission/Admission';
import SignUp from './pages/signup/Signup';
import AuthProvider from './providers/AuthProvider';
import Login from './pages/login/Login';
import AdmissionForm from './pages/admission-form/AdmissionForm';
import PrivateRoute from './routes/PrivateRoute';
import MyCollege from './pages/myCollege/MyCollege';
import Profile from './pages/profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/details/:id",
        element: <CollegeDetails></CollegeDetails>,
      },
      {
        path: "/colleges",
        element: <AllColleges></AllColleges>,
      },
      {
        path: "/admission",
        element: <Admission></Admission>,
      },
      {
        path: "/admission-form/:id",
        element: <PrivateRoute><AdmissionForm></AdmissionForm></PrivateRoute>
      },
      {
        path: "/my-college-details/:id",
        element: <MyCollege></MyCollege>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
