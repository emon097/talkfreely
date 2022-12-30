import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const { createUsersEmail, googleRegister, updateUser } =
    useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleSignUpGoogle = () => {
    googleRegister(provider).then((res) => {
      const user = res.user;
      if (user.uid) {
        navigate("/");
        toast.success("You Have Successfully Sign Up");
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
        .then((data) => {});
    });
  };

  const onSubmit = (data, e) => {
    const profileImage = data.profileImage[0];
    const formData = new FormData();
    formData.append("image", profileImage);
    const url = `https://api.imgbb.com/1/upload?key=a9092fb79f783fc4527950882d60d253`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const image = imageData.data.display_url;
        const userInfo = {
          displayName: data.name,
          photoURL: image,
        };
        const userFullInfo = {
          displayName: data.name,
          photoURL: image,
          email: data.email,
        };

        fetch("https://talkfreely-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userFullInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              e.target.reset();
              toast.success("You Have Successfully Sign Up");
              navigate("/");
            }
          });
        createUsersEmail(data.email, data.password).then((res) => {
          const user = res.user;
          updateUser(userInfo).then((res) => {});
        });
      });
  };

  return (
    <section class="relative mt-20 py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div class="absolute inset-0">
        <img
          class="object-cover w-full h-full"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/2/woman-working-laptop.jpg"
          alt=""
        />
      </div>
      <div class="absolute inset-0 bg-gray-900/20"></div>

      <div class="relative max-w-lg px-4 mx-auto sm:px-0">
        <div class="overflow-hidden bg-white rounded-md shadow-md">
          <div class="px-4 py-6 sm:px-8 sm:py-7">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-gray-900">
                Create an account
              </h2>
              <p class="mt-2 text-base text-gray-600">
                Already joined?{" "}
                <Link
                  to="/Login"
                  title=""
                  class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Sign in now
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} class="mt-8">
              <div class="space-y-5">
                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    First & Last name
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Enter your full name"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Profile Image{" "}
                  </label>
                  <div class="mt-2.5">
                    <input
                      type="file"
                      {...register("profileImage")}
                      placeholder="Enter your full name"
                      class="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                    />
                  </div>
                </div>

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
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
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
                  <input
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-success border border-transparent rounded-md focus:outline-none  "
                    type="submit"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSignUpGoogle}
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
                    Sign up with Google
                  </button>
                </div>
              </div>
            </form>

            <p class="max-w-xs mx-auto mt-5 text-sm text-center text-gray-600">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="#"
                title=""
                class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Privacy Policy
              </a>{" "}
              &
              <a
                href="#"
                title=""
                class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
