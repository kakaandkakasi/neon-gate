"use client";

import { ProjectCard, TerminalGate, VideoSlice } from "@/components";

const PROJECTS = [
  {
    title: "赏金之路 //",
    subtitle: "AI驱动的全网求职情报雷达，实现岗位提纯与可视化。",
    techStack: ["Next.js", "Python", "LLM", "Obsidian API", "Serper"],
    githubLink: "https://github.com/kaka/BountyPath",
    liveLink: "https://kaka.bountypath.ai",
  },
  {
    title: "新上海 //",
    subtitle: "好莱坞级AI影视工业化工作流，统筹资产与动态生成。",
    techStack: ["Three.js", "Stable Diffusion", "ComfyUI", "LangChain"],
    githubLink: "https://github.com/kaka/NeoShanghai",
  },
];

const VIDEOS = [
  {
    title: "赏金之路 DEMO",
    description: "AI求职情报网实机演示",
  },
  {
    title: "新上海 PRELUDE",
    description: "影视工作流概念预览",
  },
];

export default function CyberBentoGrid() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#00ff41] font-mono p-4 md:p-8 scanline-bg flex items-center justify-center">
      {/* Bento Grid Container: 4x3 matrix, single column on mobile */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-[90vh]">

        {/* [Grid A] Phantom Sentinel - Kakasi Avatar (1x1) */}
        <div className="col-span-1 row-span-1 bg-black border border-[#00ff41]/30 rounded-xl relative overflow-hidden group glitch-hover">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl mb-2 opacity-60">🤖</div>
            <span className="text-xs text-[#00ff41]/50 uppercase tracking-widest">KAKASI_v2.0</span>
            <span className="text-[10px] text-[#00ff41]/30 mt-1">ONLINE</span>
          </div>
          {/* Glitch overlay on hover */}
          <div className="absolute inset-0 bg-[#00ff41]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* [Grid B] Digital Armory - Projects (2x1) */}
        <div className="col-span-1 md:col-span-2 row-span-1 bg-black border border-[#00ff41]/30 rounded-xl relative overflow-hidden">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] text-[#00ff41]/40 uppercase tracking-widest">SYSTEM_PROJECTS //</span>
              <div className="h-px flex-1 bg-[#00ff41]/20" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>

        {/* [Grid C] Memory Fragments - Video Archive (1x2) */}
        <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 bg-black border border-[#00ff41]/30 rounded-xl relative overflow-hidden">
          <VideoSlice
            title={VIDEOS[0].title}
            description={VIDEOS[0].description}
          />
        </div>

        {/* [Grid D] Ultimate Gateway - Terminal Gatekeeper (2x2) */}
        <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-[#050505] border border-[#00f0ff]/50 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] overflow-hidden">
          <TerminalGate />
        </div>

        {/* [Grid E] Quick Access - Links (1x1) */}
        <div className="col-span-1 row-span-1 bg-black border border-[#00ff41]/30 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-3">
              <a
                href="https://github.com/kaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl opacity-40 hover:opacity-100 transition-opacity"
                title="GitHub"
              >
                💻
              </a>
              <a
                href="https://linkedin.com/in/kaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl opacity-40 hover:opacity-100 transition-opacity"
                title="LinkedIn"
              >
                🔗
              </a>
            </div>
            <span className="text-[9px] text-[#00ff41]/30 uppercase tracking-widest">
              LINKS
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}