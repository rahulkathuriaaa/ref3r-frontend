"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Partner {
  logoSrc: string;
  name: string;
}

export default function PartnershipCarousel({
  partners,
}: {
  partners?: Partner[];
}) {
  const partnersList = partners || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partnersList.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === partnersList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentPartner = partnersList[currentIndex];

  if (!partnersList.length) {
    return <div className="text-center py-2">No partnerships yet</div>;
  }

  return (
    <div className="relative w-full h-full flex items-center">
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
            <Image
              src={currentPartner.logoSrc}
              alt={currentPartner.name}
              className="rounded-full"
              width={64}
              height={64}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = "https://via.placeholder.com/64";
              }}
            />
          </div>
          <span className="text-xs sm:text-sm mt-1">{currentPartner.name}</span>
        </div>
      </div>

      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[#B9B9B9] hover:text-white w-6 h-6 flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
          />
        </svg>
      </button>

      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#B9B9B9] hover:text-white w-6 h-6 flex items-center justify-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-6 sm:h-6"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
          />
        </svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
        {partnersList.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-[#B9B9B9] bg-opacity-50"
            }`}
            aria-label={`Go to partner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}