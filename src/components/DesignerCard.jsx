import React from "react";
import { Link } from "react-router-dom";

const DesignerCard = ({ profileImage, name, bio, designerId }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl max-w-sm w-full mx-auto">
      <div className="relative">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mx-auto mt-4">
          <img
            src={profileImage}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <div className="pt-4 pb-4 px-4 text-center">
        <h3 className="text-m font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {bio || "No bio available"}
        </p>

        <Link to={`/designer-profile/${designerId}`}>
          <button className="mt-4 px-6 py-2 text-white bg-pink-600 rounded-full hover:bg-pink-700 transition duration-300 transform hover:scale-105">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
export default DesignerCard;
