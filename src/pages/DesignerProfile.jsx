import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DesignerTitle from "../components/DesignerTitle";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheck,
  FaSuitcase,
  FaRegClipboard,
  FaStar,
  FaUserGraduate,
  FaEdit,
} from "react-icons/fa";

const DesignerProfile = () => {
  const { designerId } = useParams();
  const [designerData, setDesignerData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [bio, setBio] = useState("");
  const [professionalBackground, setProfessionalBackground] = useState("");
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);
  const [experience, setExperience] = useState("");
  const [services, setServices] = useState([]);
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignerDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/designer/${designerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data && response.data.designer) {
          const designer = response.data.designer;
          setDesignerData(designer);
          setBio(designer.bio);
          setProfessionalBackground(designer.professionalBackground);
          setSkills(designer.skills);
          setAwards(designer.awards);
          setExperience(designer.experience);
          setServices(designer.services);
          setFollowersCount(designer.followersCount);

          const loggedInUserId = localStorage.getItem("userId");
          if (loggedInUserId === designerId) {
            setIsOwner(true);
          }

          const isFollowing =
            localStorage.getItem(`following_${designerId}`) === "true";
          setFollowing(isFollowing);
        } else {
          console.error("Designer data not found in the response");
        }
      } catch (error) {
        console.error("Error fetching designer details:", error);
      }
    };

    fetchDesignerDetails();
  }, [designerId]);

  const handleEditToggle = () => setEditable(!editable);

  const handleSave = async () => {
    try {
      const updatedDesigner = {
        bio,
        professionalBackground,
        skills,
        awards,
        experience,
        services,
      };

      const response = await axios.put(
        `/api/designer/${designerId}`,
        updatedDesigner,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setDesignerData(response.data.designer);
        setEditable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleFollow = async () => {
    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      toast.error("Please log in to follow the designer.");
      navigate("/login");
      return;
    }

    // Toggle the following state
    const newFollowingState = !following;
    localStorage.setItem(
      `following_${designerId}`,
      newFollowingState.toString()
    );

    // Update followers count accordingly
    const newFollowersCount = newFollowingState
      ? followersCount + 1
      : followersCount > 0
      ? followersCount - 1
      : 0;
    setFollowersCount(newFollowersCount);

    setFollowing(newFollowingState);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/designer/follow/${designerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          newFollowingState
            ? "You are now following the designer!"
            : "Unfollowed the designer!"
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update follow status.");
    }
  };

  if (!designerData) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <img
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-300"
          src={designerData.profileImage}
          alt={`${designerData.name}'s profile`}
        />
        <h2 className="mt-4 text-lg sm:text-2xl font-bold">
          {designerData.name}
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {bio || "No bio available"}
        </p>
        <div className="mt-2 text-gray-600 text-sm sm:text-base">
          <span className="font-semibold">Followers: </span>
          {followersCount}
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded-full text-white ${
            following
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>

        {/* Edit Profile button for profile owner */}
        {isOwner && (
          <button
            onClick={handleEditToggle}
            className="mt-4 ml-4 text-gray-500 hover:text-blue-600"
          >
            <FaEdit className="inline-block text-xl" />
          </button>
        )}
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md rounded-lg p-6">
        <DesignerTitle text1="About" text2=" the Designer" />
        <div className="mt-4 space-y-4">
          {/* Edit mode */}
          <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
            <FaSuitcase className="text-pink-600 text-2xl mr-3" />
            {editable ? (
              <input
                type="text"
                value={professionalBackground}
                onChange={(e) => setProfessionalBackground(e.target.value)}
                className="text-sm sm:text-base border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-sm sm:text-base">
                <span className="font-semibold text-gray-700">
                  Professional Background:{" "}
                </span>
                {professionalBackground || "No details provided"}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
            <FaRegClipboard className="text-pink-600 text-2xl mr-3" />
            {editable ? (
              <input
                type="text"
                value={designerData.experience}
                onChange={(e) => setProfessionalBackground(e.target.value)}
                className="text-sm sm:text-base border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-sm sm:text-base">
                <span className="font-semibold text-gray-700">
                  Experience:{" "}
                </span>
                {designerData.experience || "No details provided"}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
            <FaUserGraduate className="text-pink-600 text-2xl mr-3" />
            {editable ? (
              <input
                type="text"
                value={designerData.skills}
                onChange={(e) => setProfessionalBackground(e.target.value)}
                className="text-sm sm:text-base border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-sm sm:text-base">
                <span className="font-semibold text-gray-700">Skills: </span>
                {designerData.skills.length
                  ? designerData.skills.join(", ")
                  : "No skills listed"}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:space-x-4">
            <FaStar className="text-pink-600 text-2xl mr-3" />
            {editable ? (
              <input
                type="text"
                value={designerData.awards}
                onChange={(e) => setProfessionalBackground(e.target.value)}
                className="text-sm sm:text-base border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-sm sm:text-base">
                <span className="font-semibold text-gray-700">Awards: </span>
                {designerData.awards.length
                  ? designerData.awards.join(", ")
                  : "No awards listed"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Save changes button */}
      {editable && (
        <div className="text-center mt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Services Section */}
      <div className="bg-gradient-to-r from-white to-pink-50 shadow-lg rounded-lg p-8">
        <DesignerTitle text1="Services" text2=" Offered" />
        <div className="mt-6">
          {designerData.services?.length ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designerData.services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center bg-pink-50 rounded-md shadow-sm p-4 hover:bg-pink-100 transition duration-200"
                >
                  <FaCheck className="text-pink-600 text-xl mr-3" />
                  <span className="text-gray-800 font-medium">{service}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No services listed</p>
          )}
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <DesignerTitle text1="Designer" text2=" Portfolio" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center"
            >
              <span>Image {index + 1}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          View Full Portfolio
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DesignerProfile;
