import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loader from "../../Loader/Loader";

import MediaMap from "./MediaMap";

const Media = () => {
  const { data: showPost = [] } = useQuery({
    queryKey: ["peoplePost"],
    queryFn: async () => {
      const res = await fetch(
        `https://talkfreely-server.vercel.app/peoplePost`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="mx-3">
      {showPost?.length === 0 ? (
        <div className="flex justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          {showPost.map((showPosts) => (
            <MediaMap showPost={showPost} showPosts={showPosts}></MediaMap>
          ))}
        </article>
      )}
    </div>
  );
};

export default Media;
