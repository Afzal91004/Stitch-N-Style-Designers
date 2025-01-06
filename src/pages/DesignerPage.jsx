import React, { useEffect, useState } from "react";
import DesignerCard from "../components/DesignerCard.jsx";
import TrendingDesignCard from "../components/TrendingDesignCard.jsx";
import Hero from "../components/Hero";
import Title from "../../../Stitch-N-Style-Frontend/src/components/Title.jsx";
import axios from "axios";

const DesignerPage = () => {
  const [designers, setDesigners] = useState([]);
  const [trendingDesigns, setTrendingDesigns] = useState([]);

  const fetchTopDesigners = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/designer/top-designers`
      );
      setDesigners(res.data.data);
    } catch (error) {
      console.error("Error fetching top designers:", error);
    }
  };

  const fetchTrendingDesigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/design/trending-designs`
      );
      setTrendingDesigns(res.data.data);
    } catch (error) {
      console.error("Error fetching trending designs:", error);
    }
  };

  useEffect(() => {
    fetchTopDesigners();
    fetchTrendingDesigns();
  }, []);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <Hero />
      <section>
        <div className="pt-16 pb-1 px-4 mx-auto max-w-7xl">
          <div className="mb-12">
            <Title text1="TRENDING " text2="DESIGNS" />
            <h2 className="max-w-2xl text-sm text-gray-600">
              The most ordered designs
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {trendingDesigns.map((design) => (
              <TrendingDesignCard
                key={design._id}
                image={design.image[0]}
                name={design.name}
                designerName={design.designer.name}
                likes={design.likes || 0}
                price={design.price || 0}
                rating={4.5}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="py-16 px-4 mx-auto max-w-7xl">
          <div className="mb-12">
            <Title text1="DESIGNERS" text2="SHOWCASE" />
            <h2 className="max-w-2xl text-sm text-gray-600">
              Meet our talented designers
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {designers.map((designer) => (
              <DesignerCard
                key={designer._id}
                profileImage={designer.profileImage}
                name={designer.name}
                // bio={designer.bio}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignerPage;
