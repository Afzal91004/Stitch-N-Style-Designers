import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
    const fetchDesignerDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/designer/${designerId}`
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
        updatedDesigner
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

  const handleFollow = () => {
    setFollowing(!following);
    toast.success(
      following
        ? "Unfollowed the designer!"
        : "You are now following the designer!"
    );
  };

  if (!designerData) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
        <img
          className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"
          src={designerData.profileImage}
          alt={`${designerData.name}'s profile`}
        />
        <h2 className="mt-4 text-2xl font-bold">{designerData.name}</h2>
        <p className="text-gray-600 mt-2">
          {designerData.bio || "No bio available"}
        </p>
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
      </div>

      {/* About Section */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">About the Designer</h3>
        <p className="mb-2">
          <span className="font-semibold">Professional Background: </span>
          {designerData.professionalBackground || "No details provided"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Experience: </span>
          {designerData.experience || "No details provided"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Skills: </span>
          {designerData.skills.length
            ? designerData.skills.join(", ")
            : "No skills listed"}
        </p>
        <p>
          <span className="font-semibold">Awards: </span>
          {designerData.awards.length
            ? designerData.awards.join(", ")
            : "No awards listed"}
        </p>
      </div>

      {/* Services Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
        <ul className="list-disc list-inside">
          {designerData.services.length
            ? designerData.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))
            : "No services listed"}
        </ul>
      </div>

      {/* Portfolio Section */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* portfolio image - not done yet */}
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
