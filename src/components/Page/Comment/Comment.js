import React from "react";

const Comment = ({ comments }) => {
  return (
    <div className="">
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
        <p class="text-black font-semibold">{comments.comment}</p>
        <div class="flex items-center mt-4 space-x-4"></div>
      </article>
    </div>
  );
};

export default Comment;
