import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);

  const [allUsers, setallUsers] = useState([]);
  useEffect(() => {
    const emais = `https://talkfreely-server.vercel.app/user?email=${user?.email}`;
    fetch(emais)
      .then((res) => res.json())
      .then((data) => {
        setallUsers(data);
      });
  }, [user?.email]);

  const onSubmit = (data, e) => {
    const postImage = data.postImage[0];
    const formData = new FormData();
    formData.append("image", postImage);
    const url = `https://api.imgbb.com/1/upload?key=a9092fb79f783fc4527950882d60d253`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((Data) => {
        const image = Data.data.display_url;
        const peoplePost = data.peoplePost;
        const title = data.title;
        const profilePhoto = user?.photoURL;
        const userName = user?.displayName;
        const dates = format(new Date(), "yyyy-MM-dd");
        const postDetails = {
          image,
          peoplePost,
          profilePhoto,
          userName,
          title,
          dates,
        };

        fetch("https://talkfreely-server.vercel.app/peoplePost", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(postDetails),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              e.target.reset();
              toast.success("Product Added Successfully");
            }
          });
      });
  };

  return (
    <div className="my-24 mx-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <address class="flex items-center mb-6 not-italic">
            <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img
                class="mr-4 w-16 h-16 rounded-full"
                src={user?.photoURL}
                alt=""
              />

              {allUsers.map((usered) => (
                <div>
                  <p class="text-xl font-semibold text-black ">
                    {usered?.displayName}
                  </p>
                </div>
              ))}
            </div>
          </address>
        </div>
        <p className="text-center font-semibold">Post Title</p>
        <div className="flex justify-center">
          <textarea
            {...register("title", { required: true })}
            className="bg-gray-400 p-2 text-white"
            cols="50"
            rows="1"
          ></textarea>
        </div>
        <p className="text-center font-semibold mt-5">Post Details</p>
        <div className="flex justify-center ">
          <textarea
            {...register("peoplePost", { required: true })}
            className="bg-gray-400 p-2 text-white "
            cols="50"
            rows="10"
          ></textarea>
        </div>
        <br />
        <div className="flex justify-center">
          <input
            type="file"
            {...register("postImage", { required: true })}
            className="file-input file-input-success w-full max-w-xs"
          />
        </div>
        <br />
        <div className="flex justify-center">
          <input type="submit" className="btn text-white btn-success" />
        </div>
      </form>
    </div>
  );
};

export default Home;
