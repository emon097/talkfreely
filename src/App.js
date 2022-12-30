import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main/Main";
import Login from "./components/Authentatication/Login/Login";
import SignUp from "./components/Authentatication/SignUp/SignUp";
import Home from "./components/Home/Home";
import Media from "./components/Page/Media/Media";
import PostDetails from "./components/PostDetails/PostDetails";
import About from "./components/About/About";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: (
            <PrivetRoute>
              <Home></Home>
            </PrivetRoute>
          ),
        },
        {
          path: "/media",
          element: <Media></Media>,
        },

        {
          path: "/about",
          element: (
            <PrivetRoute>
              <About></About>
            </PrivetRoute>
          ),
        },
        {
          path: "/postDetails/:id",
          loader: ({ params }) =>
            fetch(
              `https://talkfreely-server.vercel.app/peoplePost/${params.id}`
            ),
          element: (
            <PrivetRoute>
              {" "}
              <PostDetails></PostDetails>{" "}
            </PrivetRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);
  return (
    <div className="max-w-screen-lg mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
