import {
  FileText,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MessageCircleMore,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <section
      id="footer"
      className="w-full bg-black py-12 md:py-20 text-sm flex flex-col justify-center items-center px-4 mb-16"
    >
      <div className="w-full max-w-7xl flex flex-col justify-center items-center">
        <div className="flex flex-col gap-6 md:gap-8 my-12 md:my-24 justify-center items-center">
          {/* Large text that wraps properly */}
          <div className="text-6xl sm:text-8xl lg:text-8xl w-full max-w-6xl text-center relative px-4 leading-tight break-words">
            <span className="absolute -top-[20%] sm:-top-[30%] -left-2 sm:-left-8 md:-left-20 text-6xl">
              ✨
            </span>
            <p className="font-playball inline-block">
              Open to new ideas, good conversations, and even better tea.{" "}
              <span className="inline-block font-normal">☕</span>
            </p>
          </div>

          {/* Fixed buttons to stack on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 max-w-4xl px-2">
            <a
              href="mailto:omeshkumar9813499778@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-black/70 border-t-[0.5px] border-white shadow-[inset_0px_4px_8px_rgba(255,255,255,0.6)] hover:shadow-[inset_0px_2px_4px_rgba(255,255,255,0.6)] text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-medium cursor-pointer flex gap-2 items-center justify-center transition-all duration-300"
            >
              <Mail size={16} className="sm:w-5 sm:h-5" />
              <p className="text-sm sm:text-base truncate">
                rhaeshane@gmail.com
              </p>
            </a>
            <a
              href="https://drive.google.com/file/d/1mnzX8v5SFz7llZeNAA62iS9-MC5sgbcS/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-black px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full font-medium cursor-pointer flex items-center gap-2 justify-center hover:bg-gray-100 transition-all duration-300"
            >
              <FileText size={16} className="sm:w-5 sm:h-5" />
              <p className="text-sm sm:text-base">Resume</p>
            </a>
          </div>
        </div>

        {/* Fixed social links layout */}
        <div className="w-full flex flex-row justify-between mt-6 md:mt-8 items-start gap-6 lg:gap-4">
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <a
              href="https://x.com/Omesh_RaoSahab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center cursor-pointer"
            >
              <Twitter size={14} />
            </a>
            
            <a
              href="https://www.linkedin.com/in/omeshxkumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center cursor-pointer"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://github.com/Rhae-Shane"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center cursor-pointer"
            >
              <Github size={14} />
            </a>
          </div>
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <a
              href="https://t.me/Omeshkumar9813"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center cursor-pointer"
            >
              <Send size={14} />
            </a>
            <a
              href="https://wa.me/9813499778?text=Hi%20there!"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center cursor-pointer"
            >
              <MessageCircleMore size={14} />
            </a>
            <a href="tel:9813499778">
              <button className="p-2 md:p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer">
                <Phone size={14} />
                <p className="hidden sm:inline-block text-sm">98134 99778</p>
              </button>
            </a>

          </div>
        </div>
      </div>
      {/* hr line */}
      <div className="w-full mx-auto h-px bg-white my-6 opacity-50" />
      {/* bottom */}
      <div className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-center sm:text-left px-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          Made with{" "}
          <span className="text-red-500">
            <Heart size={16} />
          </span>{" "}
          by Omesh
        </div>
        <div className="text-sm">© 2025 Omesh. All rights reserved</div>
      </div>
    </section>
  );
};

export default Footer;
