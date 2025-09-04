"use client";

import { Instagram, Linkedin, Phone, SunMedium, Twitter,X } from "lucide-react";

const OnlinePresence = () => {
  return (
    <div className="relative w-full h-full px-4 py-10 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col gap-6 justify-start items-center">
      <div className="flex flex-col gap-1 justify-center items-center">
        <div className="flex gap-2 items-center justify-center">
          <SunMedium size={16}/>
          <p className="text-sm"><span className="text-blue-400">Follow</span> Me!</p>
        </div>
        <div className="text-xl">Online Presence</div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <a
          href="https://x.com/Omesh_RaoSahab"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <Twitter size={20} />
          <p>@Omesh_RaoSahab</p>
        </a>
        
        <a
          href="https://www.linkedin.com/in/omeshxkumar/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <Linkedin size={20} />
          <p>@omeshxkumar</p>
        </a>
      </div>
    </div>
  );
};

export default OnlinePresence;
