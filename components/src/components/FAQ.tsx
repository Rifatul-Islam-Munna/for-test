"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQ: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: "Do plumbers deal with heating?",
      answer:
        "Some of our local plumbers are also gas registered and experienced working on heating systems, bathrooms and kitchens.",
      isOpen: true,
    },
    {
      id: 2,
      question: "Do you charge a call out fee?",
      answer: "",
      isOpen: false,
    },
    {
      id: 3,
      question: "How quickly can your company send out an engineer?",
      answer: "",
      isOpen: false,
    },
    {
      id: 4,
      question: "What should I do if I get a water leak?",
      answer: "",
      isOpen: false,
    },
  ]);

  const toggleFAQ = (id: number) => {
    setFaqItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  return (
    <div className="w-full bg-white py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 lg:mb-16">
          Frequently asked questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-0  ">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`${item.id !== 4 ? "border-b" : ""} border-gray-200`}
            >
              <button
                className="w-full py-6 sm:py-8 lg:py-10 flex items-center justify-between text-left focus:outline-none   focus:ring-offset-2"
                onClick={() => toggleFAQ(item.id)}
              >
                <span className="text-base sm:text-lg lg:text-xl font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0">
                  {item.isOpen ? (
                    <ChevronUpIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                  )}
                </span>
              </button>

              {item.isOpen && item.answer && (
                <div className="pb-6 sm:pb-8 lg:pb-10 pr-8">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
