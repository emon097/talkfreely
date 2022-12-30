import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Login = () => {
  const { loginUser, googleRegister } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLoginGoogle = () => {
    googleRegister(provider).then((res) => {
      const user = res.user;
      if (user.uid) {
        navigate(from, { replace: true });
        toast.success("You Have Successfully Log In");
      }
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const googleRegisterinfo = {
        email,
        photoURL,
        displayName,
      };
      fetch("https://talkfreely-server.vercel.app/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(googleRegisterinfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("You Have Successfully Login");
          }
        });
    });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    loginUser(data.email, data.password).then((res) => {
      const user = res.user;
      if (user.uid) {
        navigate(from, { replace: true });
        toast.success("You Have Successfully Log In");
      }
    });
  };
  return (
    <div className="mt-20">
      <section class="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div class="absolute inset-0">
          <img
            class="object-cover w-full h-full"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/2/man-eating-noodles.jpg"
            alt=""
          />
        </div>
        <div class="absolute inset-0 bg-gray-900/20"></div>
        <div class="relative max-w-lg px-4 mx-auto sm:px-0">
          <div class="overflow-hidden bg-white rounded-md shadow-md">
            <div class="px-4 py-6 sm:px-8 sm:py-7">
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
                <p class="mt-2 text-base text-gray-600">
                  Don’t have one?{" "}
                  <Link
                    to="/signUp"
                    title=""
                    class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                  >
                    Create a free account
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} class="mt-8">
                <div class="space-y-5">
                  <div>
                    <label for="" class="text-base font-medium text-gray-900">
                      {" "}
                      Email address{" "}
                    </label>
                    <div class="mt-2.5">
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Enter email to get started"
                        class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div class="flex items-center justify-between">
                      <label for="" class="text-base font-medium text-gray-900">
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div class="mt-2.5">
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Enter your password"
                        class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-success border border-transparent rounded-md focus:outline-none "
                    >
                      Log in
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={handleLoginGoogle}
                      type="button"
                      class="
                                    relative
                                    inline-flex
                                    items-center
                                    justify-center
                                    w-full
                                    px-4
                                    py-4
                                    text-base
                                    font-semibold
                                    text-gray-700
                                    transition-all
                                    duration-200
                                    bg-white
                                    border-2 border-gray-200
                                    rounded-md
                                    hover:bg-gray-100
                                    focus:bg-gray-100
                                    hover:text-black
                                    focus:text-black focus:outline-none
                                "
                    >
                      <div class="absolute inset-y-0 left-0 p-4">
                        <svg
                          class="w-6 h-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                        </svg>
                      </div>
                      Sign in with Google
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
