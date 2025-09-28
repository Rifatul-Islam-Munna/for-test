"use client";

import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const GetInTouch: React.FC = () => {
  const handleBookPlumber = () => {
    // Add your booking logic here
    console.log("Book a Professional Plumber clicked");
  };

  return (
    <section className="w-full bg-[#0058ff] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2rem] bg-[#0059ff] px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          {/* Content Container */}
          <div className="relative z-10 text-center">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
              Get In Touch
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-xl text-white/90 max-w-xs sm:max-w-md lg:max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 lg:mb-10 font-normal">
              Contact us now to enquire our plumbing services, whether you have
              a commercial project that requires support, or a domestic plumbing
              task that needs the attention of a trusted professional.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleBookPlumber}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#0059ff] font-semibold px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-md transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              <span>Book a Professional Plumber</span>
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
