"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoSliceProps {
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnailColor?: string;
}

export default function VideoSlice({
  title,
  description,
  videoUrl,
  thumbnailColor = "#00ff41",
}: VideoSliceProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static Noise Background (Default State) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: `
            radial-gradient(ellipse at center, ${thumbnailColor}10 0%, transparent 70%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${thumbnailColor}05 2px,
              ${thumbnailColor}05 4px
            )
          `,
        }}
      >
        {/* Static noise overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* TV Scanlines */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0,0,0,0.3) 1px,
              rgba(0,0,0,0.3) 2px
            )`,
          }}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-5xl mb-3"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📼
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
            {title}
          </span>
          {description && (
            <span className="text-[9px] text-white/30 mt-1 max-w-[80%] text-center font-mono">
              {description}
            </span>
          )}
          <span className="text-[8px] text-white/20 mt-3 uppercase tracking-wider">
            [ HOVER_TO_DECRYPT ]
          </span>
        </div>
      </div>

      {/* Active Video State (On Hover) */}
      <motion.div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "#000" }}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          /* Placeholder video effect */
          <div className="w-full h-full flex items-center justify-center bg-black">
            <motion.div
              className="text-6xl"
              animate={{
                scale: [1, 1.02, 1],
                filter: [`brightness(1)`, `brightness(1.3)`, `brightness(1)`],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎬
            </motion.div>
            {/* Simulated scanlines */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-[2px] bg-[#00ff41]/10"
                  initial={{ top: `${i * 5}%`, opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Decryption label */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <span className="text-[8px] text-[#00ff41]/60 uppercase tracking-wider font-mono">
            █ {title} █
          </span>
          <span className="text-[8px] text-[#00f0ff]/60 uppercase tracking-wider">
            [ DECRYPTED ]
          </span>
        </div>
      </motion.div>

      {/* Glitch border on hover */}
      {isHovered && (
        <div className="absolute inset-0 border border-[#00ff41]/50 pointer-events-none" />
      )}
    </div>
  );
}
