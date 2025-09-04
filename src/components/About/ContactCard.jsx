"use client";

import { Crown, Mail, Phone } from "lucide-react";

const ContactCard = ({ type }) => {
  return (
    <div className="relative w-full h-full px-4 py-10 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col gap-6 justify-center items-center">
      <div className="absolute bottom-0 right-0 translate-y-1/2 w-96 h-96 rounded-full bg-blue-400 -z-10 blur-3xl opacity-10"></div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex gap-2 items-center justify-center bg-gray-900 p-4 rounded-full">
          <Crown size={36} color="oklch(70.7% 0.165 254.624)" />
        </div>
        <div className="flex flex-col gap-0 items-center justify-center">
          <p className="text-xl"> Ler's Work Together</p>{" "}
          <p className="text-[12px] capitalize text-gray-500">
            Let's make magic happen together!
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <a
          href="tel:+919813499778"
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <Phone size={20} />
          <p>+91 98134 99778</p>
        </a>
        <a
          href="mailto:omeshkumar9813499778@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <Mail size={20} />
          <p>rhaeshane@gmail.com</p>
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
