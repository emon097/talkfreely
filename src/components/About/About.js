import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader/Loader";
import UpdateAbout from "../Page/UpdateAbout/UpdateAbout";

const About = () => {
  const [allUsers, setallUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const emais = `https://talkfreely-server.vercel.app/user?email=${user?.email}`;
    fetch(emais)
      .then((res) => res.json())
      .then((data) => {
        setallUsers(data);
      });
  }, [user?.email]);

  return (
    <div>
      {allUsers?.length === 0 ? (
        <div className="flex justify-center">
          <Loader></Loader>
        </div>
      ) : (
        <div className="flex justify-center mt-12 md:mt-12">
          {allUsers.map((alluser) => (
            <UpdateAbout alluser={alluser}></UpdateAbout>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
