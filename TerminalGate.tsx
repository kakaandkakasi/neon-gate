"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "system" | "user" | "kakasi";
  content: string;
}

type TerminalStatus = "idle" | "processing" | "granted" | "denied";

export default function TerminalGate() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "> SYSTEM INITIALIZING... IDENTITY_CONFIRMED: KAKASI_PHALANX_v2.0",
    },
    {
      role: "kakasi",
      content:
        "别在那儿愣着，访客。报上你的公会名（公司）和赏金（薪资），否则连接将在 30 秒内切断。",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState<TerminalStatus>("idle");
  const [showResumeButton, setShowResumeButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Typewriter effect
  const typeText = useCallback(async (text: string): Promise<string> => {
    setIsTyping(true);
    let currentText = "";
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      // Update state with each character
      await new Promise((resolve) => setTimeout(resolve, 30)); // 30ms per char = cyberpunk speed
    }
    setIsTyping(false);
    return currentText;
  }, []);

  // Evaluate user input against gatekeeper protocol
  const evaluateInput = useCallback((userInput: string): { response: string; isValid: boolean } => {
    const lowerInput = userInput.toLowerCase();

    // Check for company name patterns (公会标识)
    const hasCompany =
      lowerInput.includes("字节") ||
      lowerInput.includes("腾讯") ||
      lowerInput.includes("阿里") ||
      lowerInput.includes("百度") ||
      lowerInput.includes("美团") ||
      lowerInput.includes("华为") ||
      lowerInput.includes("大厂") ||
      lowerInput.includes("有限公司") ||
      lowerInput.includes("科技") ||
      lowerInput.includes("集团");

    // Check for salary indicators (赏金标识)
    const hasSalary =
      lowerInput.includes("k") ||
      lowerInput.includes("w") ||
      lowerInput.includes("万") ||
      lowerInput.includes("薪资") ||
      lowerInput.includes("工资") ||
      lowerInput.includes("一千") ||
      lowerInput.includes("一万") ||
      lowerInput.includes("十万") ||
      /\d{1,3}[kK]/.test(lowerInput) ||
      /\d{1,3}[wW]/.test(lowerInput) ||
      /\d+\.?\d*[万千]"/.test(lowerInput) ||
      /[一二三四五六七八九十百]+[千w万]/i.test(lowerInput);

    // High value triggers
    const isHighValue =
      (hasCompany && hasSalary) ||
      (hasSalary && /[2-9]\d/.test(lowerInput)); // Salary >= 20K

    // Very low or no salary = denied
    if (hasCompany && !hasSalary) {
      return {
        response:
          "> 警告：检测到公会标识，但赏金未确认。报上你的薪资范围，否则连接切断。",
        isValid: false,
      };
    }

    // High value = granted
    if (isHighValue) {
      return {
        response:
          "> 评估完毕。你的筹码有点意思。老板的绝密档案已对你开放。注意保密，猎人。",
        isValid: true,
      };
    }

    // Default: denied with attitude
    return {
      response:
        "> 访问拒绝。就这点赏金也想招揽顶级黑客？回去告诉你们高管，这点预算在新上海连个机械臂都买不到。连接切断。",
      isValid: false,
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: `> ${userQuery}` }]);
    setInput("");
    setStatus("processing");

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { response, isValid } = evaluateInput(userQuery);

    if (isValid) {
      setStatus("granted");
      setShowResumeButton(true);
    } else {
      setStatus("denied");
    }

    const typedResponse = await typeText(response);
    setMessages((prev) => [...prev, { role: "kakasi", content: typedResponse }]);
    setStatus(isValid ? "granted" : "denied");
  };

  const getStatusColor = () => {
    switch (status) {
      case "granted":
        return "text-[#00f0ff]";
      case "denied":
        return "text-[#ff003c]";
      case "processing":
        return "text-[#ffaa00]";
      default:
        return "text-[#00ff41]/60";
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs relative">
      {/* Terminal Header */}
      <div className="flex justify-between items-center bg-[#00f0ff]/10 px-3 py-1.5 border-b border-[#00f0ff]/20">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#00f0ff]/60 uppercase tracking-widest">
            ● STATUS:
          </span>
          <span className={`text-[10px] font-bold uppercase ${getStatusColor()} animate-pulse`}>
            {status}
          </span>
        </div>
        <span className="text-[9px] text-[#00f0ff]/40">
          NEO_SHANGHAI_NODE_01
        </span>
      </div>

      {/* Neon Border Glow when granted */}
      {status === "granted" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-[#00f0ff] rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] pointer-events-none z-20"
        />
      )}

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar bg-black/40"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${
              msg.role === "user"
                ? "text-[#00ff41]/70"
                : msg.role === "system"
                ? "text-[#00ff41]/40 italic"
                : status === "granted"
                ? "text-[#00f0ff] font-bold"
                : status === "denied"
                ? "text-[#ff003c]"
                : "text-[#00ff41]"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="text-[#00ff41]/60 animate-pulse">
            █
          </div>
        )}

        {/* Resume Download Button - Only shown when granted */}
        <AnimatePresence>
          {showResumeButton && (
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              href="/Kaka_Resume_Confidential.pdf"
              className="inline-block mt-4 px-4 py-2 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer rounded animate-neon-pulse"
            >
              [ DOWNLOAD_RESUME.PDF ] // 绝密档案
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-2 border-t border-[#00f0ff]/20 bg-black/60"
      >
        <div className="flex items-center">
          <span className="mr-2 text-[#00f0ff]">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="bg-transparent outline-none flex-1 text-[#00f0ff] placeholder:text-[#00f0ff]/30 text-xs"
            placeholder="输入公会名和赏金..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}
