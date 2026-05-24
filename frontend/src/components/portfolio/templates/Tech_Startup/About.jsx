/**
 * @file About.jsx
 * @description Premium About section component for the Tech Startup portfolio template.
 */

import React, { useState, useEffect } from "react";
import {
  Code2,
  Layers,
  Server,
  Globe,
  Database,
  Cpu,
  Terminal,
  GitBranch,
  Briefcase,
  Award,
  TrendingUp,
  Users,
  ArrowRight,
  Download,
} from "lucide-react";

const PROFILE_DATA = {
  firstName: "Alex",
  lastName: "Rivera",
  eyebrow: "// about me",
  tagline: "Full-Stack Engineer & Tech Founder",
  bio:
    "I craft robust web architectures and seamless digital experiences that scale. With over six years of experience leading engineering teams at early-stage startups, I bridge the gap between complex system design and pixel-perfect interface polish.",
  initials: "AR",
  availabilityText: "Available for opportunities",
};

const STATS_DATA = [
  {
    id: "stat-1",
    value: "6+",
    label: "Years Experience",
    icon: Briefcase,
  },
  {
    id: "stat-2",
    value: "40+",
    label: "Projects Shipped",
    icon: Award,
  },
  {
    id: "stat-3",
    value: "99.9%",
    label: "System Uptime",
    icon: TrendingUp,
  },
  {
    id: "stat-4",
    value: "10k+",
    label: "Open Source Stars",
    icon: Users,
  },
];

const SKILLS_DATA = [
  { name: "React / Next.js", icon: Code2 },
  { name: "TypeScript", icon: Layers },
  { name: "Node.js", icon: Server },
  { name: "GraphQL API", icon: Globe },
  { name: "PostgreSQL", icon: Database },
  { name: "Tailwind CSS", icon: Cpu },
  { name: "Docker", icon: Terminal },
  { name: "Git & CI/CD", icon: GitBranch },
];

const StatCard = ({ value, label, Icon }) => {
  return (
    <div className="group relative p-5 bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/30 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-blue-500/10 flex flex-col justify-between h-28 lg:h-32">
      {Icon && (
        <Icon
          className="absolute top-4 right-4 text-blue-400 transition-colors duration-300 group-hover:text-blue-300"
          size={18}
        />
      )}

      <div className="mt-auto">
        <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
          {value}
        </span>

        <p className="mt-1 text-xs lg:text-sm font-semibold text-slate-400 leading-snug">
          {label}
        </p>
      </div>
    </div>
  );
};

const TechPill = ({ label, Icon }) => {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-500/20">
      {Icon && <Icon className="w-4 h-4 text-blue-400" />}
      <span className="text-sm font-semibold text-slate-200">{label}</span>
    </div>
  );
};

const CTAButton = ({ label, variant = "primary", Icon, href }) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200";

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
      : "border border-white/20 text-slate-200 hover:bg-white/5 hover:border-white/30 hover:-translate-y-0.5 active:scale-95";

  return (
    <a href={href} className={`${baseClasses} ${variantClasses}`}>
      <span>{label}</span>
      {Icon && <Icon className="w-4 h-4" />}
    </a>
  );
};

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-slate-950 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5)_0%,rgba(139,92,246,0.3)_50%,transparent_70%)]" />

      <style>{`
        @keyframes drawUnderline {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes ringPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .animate-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 4px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 9999px;
          animation: drawUnderline 0.8s ease-out forwards;
        }

        .animate-ring-pulse {
          animation: ringPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col items-start gap-8">
            <span className="text-xs tracking-widest uppercase font-semibold text-blue-400">
              {PROFILE_DATA.eyebrow}
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-100 tracking-tight leading-tight">
              {PROFILE_DATA.firstName}{" "}
              <span
                className={`relative inline-block pb-1 ${
                  isMounted ? "animate-underline" : ""
                }`}
              >
                {PROFILE_DATA.lastName}
              </span>
            </h1>

            <h2 className="text-xl lg:text-2xl font-medium text-violet-400">
              {PROFILE_DATA.tagline}
            </h2>

            <p className="text-base text-slate-400 leading-relaxed max-w-prose">
              {PROFILE_DATA.bio}
            </p>

            <div className="flex flex-wrap gap-3 w-full">
              {SKILLS_DATA.map((skill, index) => (
                <TechPill
                  key={index}
                  label={skill.name}
                  Icon={skill.icon}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <CTAButton
                label="View My Work"
                variant="primary"
                Icon={ArrowRight}
                href="#projects"
              />

              <CTAButton
                label="Download CV"
                variant="ghost"
                Icon={Download}
                href="/resume.pdf"
              />
            </div>
          </div>

          <div className="relative overflow-hidden p-8 lg:p-12 rounded-3xl border border-white/5 bg-slate-900/30 backdrop-blur-md flex flex-col items-center gap-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="absolute bottom-10 right-10 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/40 ring-offset-2 ring-offset-slate-950 animate-ring-pulse pointer-events-none" />

                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl">
                  {PROFILE_DATA.initials}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  {PROFILE_DATA.availabilityText}
                </span>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              {STATS_DATA.map((stat) => (
                <StatCard
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  Icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}