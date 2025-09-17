"use client";

import {
  MapPin,
  GraduationCap,
  School,
  Download,
  Frame,
  SquareChevronRight,
  MessageCircleMore,
  Send,
} from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="relative w-full h-full px-4 py-10 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col gap-6 justify-center">
      <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-blue-400 -z-10 opacity-10 rounded-full blur-3xl"></div>
      <div className="w-full flex justify-between items-start">
        <div className="h-full flex gap-4 items-end justify-center">
          <div className="h-full">
            <img
              src="/assets/dp.jpeg"
              alt="dp"
              className="h-32 aspect-square object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2 items-center justify-center px-2 py-1 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="text-[10px] md:text-[12px]">
                Available for work
              </div>
            </div>
            <div className="text-xl">Omesh Kumar</div>
            <div className="text-sm text-gray-500">
              {`>>`} I am a{" "}
              <span className="text-blue-400">Full Stack Developer!</span>
            </div>
          </div>
        </div>
        <a
          href="https://drive.google.com/file/d/1mnzX8v5SFz7llZeNAA62iS9-MC5sgbcS/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 justify-center items-center cursor-pointer rounded-md p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50  text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
        >
          <p className="text-[12px]">Resume</p>
          <Download size={20} />
        </a>
      </div>
      <div className="w-full p-4 flex flex-wrap gap-2 items-start bg-gray-900/50 rounded-xl">
        <div className="flex text-[12px] items-center justify-center gap-2 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 px-2 py-1">
          <MapPin size={16} />
          <p>Pune, Maharashtra</p>
        </div>
        <div className="flex text-[12px] items-center justify-center gap-2 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 px-2 py-1">
          <Frame size={16} />
          <p>Designer</p>
        </div>
        <div className="flex text-[12px] items-center justify-center gap-2 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 px-2 py-1">
          <SquareChevronRight size={16} />
          <p>Developer</p>
        </div>
        <div className="flex text-[12px] items-center justify-center gap-2 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 px-2 py-1">
          <GraduationCap size={16} />
          <p>Pre-Final Year</p>
        </div>
        <div className="flex text-[12px] items-center justify-center gap-2 rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 px-2 py-1">
          <School size={16} />
          <p>Army Institute of Technology</p>
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <a
          href="https://t.me/Omeshkumar9813"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <Send size={20} />
          <p>Telegram Me</p>
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=9813499778&text=Hi+there%21&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-start items-center gap-2 cursor-pointer text-sm"
        >
          <MessageCircleMore size={20} />
          <p> <span className="hidden md:inline-block">Say Hii on</span>{" "}WhatsApp!</p>
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
