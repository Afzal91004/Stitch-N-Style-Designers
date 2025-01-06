import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const TrendingDesignCard = ({
  image,
  name,
  likes,
  price,
  rating,
  designerName,
}) => {
  return (
    <Link
      to={`/design/${name}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                strokeWidth={1}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{rating}</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
          {name}
        </h3>

        <p className="text-gray-500 text-sm mb-2">By: {designerName}</p>

        <p className="text-base font-bold text-black">{likes} likes</p>
        <p className="text-base font-bold text-black">
          ${price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default TrendingDesignCard;
