"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  techStack: string[];
  githubLink: string;
  liveLink?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  techStack,
  githubLink,
  liveLink,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-36 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Front */}
        <div
          className="absolute inset-0 backface-hidden bg-[#0a0a0a] border border-[#00ff41]/20 p-4 rounded-lg flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <span className="text-[10px] text-[#00ff41]/40 uppercase tracking-widest">
              Project_Archive //
            </span>
            <h3 className="text-sm font-bold text-[#00ff41] mt-1 truncate">
              {title}
            </h3>
          </div>
          <p className="text-xs text-[#00ff41]/60 leading-tight line-clamp-2">
            {subtitle}
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Github className="w-3 h-3 text-[#00ff41]/40" />
            <span className="text-[9px] text-[#00ff41]/40">HOVER_TO_FLIP</span>
          </div>
        </div>

        {/* Card Back */}
        <div
          className="absolute inset-0 backface-hidden bg-[#0d1117] border border-[#00f0ff]/40 p-4 rounded-lg flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h4 className="text-xs font-bold text-[#00f0ff] mb-2 uppercase tracking-wider">
              TECH_STACK:
            </h4>
            <div className="flex flex-wrap gap-1">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] px-1.5 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-1.5 text-center text-[10px] bg-[#00f0ff]/10 border border-[#00f0ff]/50 hover:bg-[#00f0ff]/30 transition-all text-[#00f0ff] flex items-center justify-center gap-1 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3 h-3" />
              GITHUB
            </a>
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 text-center text-[10px] bg-[#00ff41]/10 border border-[#00ff41]/50 hover:bg-[#00ff41]/30 transition-all text-[#00ff41] flex items-center justify-center gap-1 rounded"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                LIVE
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
