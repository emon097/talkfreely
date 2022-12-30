import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AiOutlineComment } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader/Loader";

const PostDetails = () => {
  const postDetails = useLoaderData();
  const [loadComment, setloadComment] = useState(true);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const { dates, image, title, peoplePost, userName, _id, profilePhoto } =
    postDetails;
  const onSubmit = (data, e) => {
    const comment = data.comment;
    const posterPhoto = user?.photoURL;
    const posterName = user?.displayName;
    const dates = format(new Date(), "yyyy-MM-dd");
    const allComment = {
      singleComment: _id,
      comment,
      posterPhoto,
      posterName,
      dates,
    };

    fetch("https://talkfreely-server.vercel.app/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allComment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setloadComment(!loadComment);
          e.target.reset();
          toast.success("Your Comment Succesfully Added ");
        }
      });
  };
  const [comment, setComment] = useState([]);
  useEffect(() => {
    fetch(`https://talkfreely-server.vercel.app/comment?singleComment=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data);
      });
  }, [loadComment, _id]);
  return (
    <div>
      <div className="mt-10 md:px-32 mx-5">
        <address class="flex my-16 items-center mb-6 not-italic">
          <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              class="mr-4 w-11 h-11 rounded-full"
              src={profilePhoto}
              alt="Jese Leos"
            />
            <div>
              <p class="text-lg font-bold  dark:text-black">{userName}</p>
              <p class="text-base font-light text-gray-500 dark:text-gray-400">
                <p>
                  <span className="font-semibold">Posting Date:</span>
                  <span className="mx-2">{dates}</span>
                </p>
              </p>
            </div>
          </div>
        </address>
        <div>
          <header class=" lg:mb-6 not-format">
            <img className="w-full" src={image} alt="" />
            <h1 class="mt-4 text-xl font-bold leading-tight text-black lg:mb-6 md:text-2xl ">
              {title}
            </h1>
          </header>
          <p class="lead">{peoplePost}</p>
        </div>
        <div className=" border p-2 mb-5 bg-slate-300 rounded-lg mt-5">
          <label className="cursor-pointer">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  justify-center items-center"
            >
              <div className="rating gap-1 mx-3">
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-red-600"
                  checked
                />
                <p>1</p>
              </div>
              <input
                {...register("comment", { required: true })}
                type="text"
                required
                placeholder="Write Your Comment"
                className="p-2 rounded-l-2xl border-none inline-block relative  leading-normal bg-slate-500 text-white w-full md:w-9/12 xl:w-5/6"
              />
              <button
                type="submit"
                className="text-3xl rounded-r-2xl bg-slate-500 p-1  border text-white"
              >
                <TiLocationArrow></TiLocationArrow>
              </button>
            </form>
            <div className=" w-full h-full mt-5 ">
              {comment?.length === 0 ? (
                <div className="flex justify-center">
                  <Loader></Loader>
                </div>
              ) : (
                <div className="overflow-y-auto h-96">
                  {comment.map((comments) => (
                    <div>
                      <article class="p-6 mb-6 text-base  rounded-lg dark:bg-slate-200">
                        <footer class="flex justify-between items-center mb-2">
                          <div class="flex items-center">
                            <p class="inline-flex font-bold items-center mr-3 text-sm text-black ">
                              <img
                                class="mr-2 w-6 h-6 rounded-full"
                                src={comments.posterPhoto}
                                alt="Michael Gough"
                              />
                              {comments.posterName}
                            </p>
                            <p class=" text-gray-600 ">{comments.dates}</p>
                          </div>
                        </footer>
                        <p class="text-black font-medium">{comments.comment}</p>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
