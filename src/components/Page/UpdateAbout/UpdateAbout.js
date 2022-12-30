import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const UpdateAbout = ({ alluser }) => {
  const { _id } = alluser;
  const [reviews, setReviews] = useState(alluser);
  const { user } = useContext(AuthContext);

  const handleupdate = (event) => {
    event.preventDefault();
    fetch(`https://talkfreely-server.vercel.app/user/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          window.location.reload();

          toast.success("Review Updated");
        }
      });
  };

  const handleonChnage = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newReview = { ...reviews };
    newReview[field] = value;
    setReviews(newReview);
  };

  return (
    <div>
      <div className="avatar flex justify-center">
        <div className="w-24 rounded-full">
          <img alt="" src={alluser?.photoURL} />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <label htmlFor="my-modal-3">
          <p className="-mt-2 text-base font-semibold text-white bg-gray-700 rounded-full px-3  hover:bg-gray-800">
            Edit
          </p>
        </label>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <form onSubmit={handleupdate}>
              <div className="rounded  shadow p-6">
                <div className="pb-6">
                  <label
                    for="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Name
                  </label>
                  <div className="flex">
                    <input
                      id="name"
                      name="displayName"
                      className="border-1 rounded-r px-4 py-2 w-full"
                      type="text"
                      onChange={handleonChnage}
                      defaultValue={alluser?.displayName}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <label
                    for="about"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Email
                  </label>
                  <input
                    disabled
                    id="email"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="email"
                    value={user?.email}
                  />
                </div>
                <div className="pb-4">
                  <label
                    for="university"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    University
                  </label>
                  <input
                    name="university"
                    id="university"
                    onChange={handleonChnage}
                    className="border-1  rounded-r px-4 py-2 w-full"
                    defaultValue={alluser?.university}
                    type="text"
                    // value="example@example.com"
                  />
                </div>
                <div className="pb-4">
                  <label
                    for="address"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    onChange={handleonChnage}
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    // value="address"
                    defaultValue={alluser?.address}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="-mt-2 text-md font-bold text-white bg-success rounded-full px-5 py-2 "
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="rounded  shadow p-6">
        <div className="pb-6">
          <label for="name" className="font-semibold text-gray-700 block pb-1">
            Name
          </label>
          <div className="flex">
            <input
              id="name"
              name="displayName"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              disabled
              onChange={handleonChnage}
              defaultValue={alluser?.displayName}
            />
          </div>
        </div>
        <div className="pb-4">
          <label for="about" className="font-semibold text-gray-700 block pb-1">
            Email
          </label>
          <input
            disabled
            id="email"
            className="border-1  rounded-r px-4 py-2 w-full"
            type="email"
            value={user?.email}
          />
        </div>
        <div className="pb-4">
          <label
            for="university"
            className="font-semibold text-gray-700 block pb-1"
          >
            University
          </label>
          <input
            name="university"
            id="university"
            disabled
            onChange={handleonChnage}
            className="border-1  rounded-r px-4 py-2 w-full"
            defaultValue={alluser?.university}
            type="text"
            // value="example@example.com"
          />
        </div>
        <div className="pb-4">
          <label
            for="address"
            className="font-semibold text-gray-700 block pb-1"
          >
            Address
          </label>
          <input
            id="address"
            disabled
            name="address"
            onChange={handleonChnage}
            className="border-1  rounded-r px-4 py-2 w-full"
            type="text"
            // value="address"
            defaultValue={alluser?.address}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAbout;
