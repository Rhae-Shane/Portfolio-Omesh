"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image slideshow effect
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [project.images]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Production":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Confidential":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCurrentImage = () => {
    if (project.status === "Confidential") return null;
    if (!project.images || project.images.length === 0)
      return "/placeholder.svg";
    return project.images[currentImageIndex];
  };

  const currentImage = getCurrentImage();

  return (
    <motion.div
      className="w-full h-auto min-h-[60vh] py-6 md:py-8 lg:py-12 px-6 md:px-8 lg:px-12 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden hover:border-l-4 hover:border-l-blue-400 group transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Blurred Accent Div */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-1/2 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 ${project.accentColor} rounded-full blur-3xl opacity-60`}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 h-full flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-0">
        {/* Left Content */}
        <div className="flex-1 lg:pr-8 xl:pr-12 w-full">
          {/* Header with title and action buttons */}
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-white group-hover:text-blue-400 transition-all duration-300 leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            >
              {project.title}
            </motion.h3>

            {/* Action Icons */}
            <motion.div
              className="flex gap-2 md:gap-3 ml-2 md:ml-4 flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 md:p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} className="md:w-5 md:h-5" />
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 md:p-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} className="md:w-5 md:h-5" />
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Badges */}
          <motion.div
            className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          >
            <span className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 text-xs md:text-sm font-medium">
              <Calendar size={12} className="md:w-3.5 md:h-3.5" />
              {project.year}
            </span>

            <span className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 text-xs md:text-sm font-medium">
              <Users size={12} className="md:w-3.5 md:h-3.5" />
              {project.projectType}
            </span>

            <span
              className={`px-2 md:px-3 py-1 backdrop-blur-sm border rounded-full text-xs md:text-sm font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </motion.div>

          {/* Description - Hidden on mobile */}
          <motion.p
            className="hidden lg:block text-gray-500 text-sm mb-6 lg:mb-8 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Technology Tags */}
          <motion.div
            className="flex flex-wrap gap-2 md:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
          >
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-transparent border border-blue-500/50 rounded-full text-blue-400 text-xs md:text-sm font-medium hover:bg-blue-500/10 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.7 + tagIndex * 0.05,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Device Mockup with Slideshow */}
        <motion.div
          className="flex-shrink-0 flex justify-center lg:justify-end w-full lg:w-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        >
          <div className="relative">
            {/* Laptop Frame - Responsive sizing */}
            <motion.div
              className="relative bg-gray-800 rounded-t-xl p-1.5 md:p-2 shadow-2xl border border-gray-700/50"
              whileHover={{ rotateY: 5, rotateX: 5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Screen - Responsive dimensions */}
              <div
                className="bg-white rounded-lg overflow-hidden relative w-[280px] h-[175px] sm:w-[320px] sm:h-[200px] md:w-[360px] md:h-[225px] lg:w-[380px] lg:h-[238px] xl:w-[400px] xl:h-[250px]"
              >
                <div className="relative w-full h-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={currentImage || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover object-top"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Laptop Base - Responsive sizing */}
              <div className="absolute -bottom-1.5 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[400px] xl:w-[420px] h-3 md:h-4 bg-gray-700 rounded-b-xl" />
              <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-1.5 md:h-2 bg-gray-600 rounded-full" />
            </motion.div>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-xl blur-xl -z-10" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;