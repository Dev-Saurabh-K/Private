import { useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";

/* ─── GLOBAL STYLES injected once ─── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:      #0a0a0a;
  --ink2:     #1a1a2e;
  --paper:    #f5f0e8;
  --green:    #1a6b3a;
  --green-l:  #e8f5ed;
  --green-m:  #2d9c55;
  --purple:   #4a1d96;
  --purple-l: #ede9ff;
  --purple-m: #7c3aed;
  --white:    #fefefe;
  --border:   2.5px solid #0a0a0a;
  --mono:     'IBM Plex Mono', monospace;
  --display:  'Unbounded', sans-serif;
  --serif:    'DM Serif Display', serif;
}

body { background: var(--paper); }

/* scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: var(--purple-m); }

/* ticker animation */
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* pulse ring */
@keyframes pulse { 0%,100%{ r: 38; opacity: 0.3; } 50%{ r: 68; opacity: 0; } }

/* fade-up on load */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.35s; }
.delay-4 { animation-delay: 0.5s; }
`;

function injectGlobalStyles() {
  if (document.getElementById("synaptiq-styles")) return;
  const s = document.createElement("style");
  s.id = "synaptiq-styles";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ─────────── tiny helper ─────────── */
const px = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}:${v}`)
    .join(";");

/* ─────────── SUB-COMPONENTS ─────────── */

function Nav() {
  const s = {
    nav: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 40px", borderBottom: "var(--border)",
      background: "var(--white)", fontFamily: "var(--mono)", position: "sticky",
      top: 0, zIndex: 100,
    },
    logo: {
      fontFamily: "var(--display)", fontWeight: 900, fontSize: 22,
      letterSpacing: "-0.05em", color: "var(--ink)",
    },
    logoQ: { color: "var(--purple-m)" },
    links: { display: "flex", gap: 24, fontSize: 12, color: "#555", letterSpacing: "0.05em" },
    link: { cursor: "pointer", transition: "color .15s" },
    badge: {
      fontSize: 11, color: "var(--ink)", background: "var(--green-l)",
      border: "1.5px solid var(--green)", padding: "5px 12px",
      borderRadius: 999, fontWeight: 600, letterSpacing: "0.06em",
    },
  };
  const [hov, setHov] = useState(null);
  const links = ["Features", "How it works", "About"];
  return (
    <nav style={s.nav}>
      <div style={s.logo}>Synapti<span style={s.logoQ}>Q</span></div>
      <div style={s.links}>
        {links.map((l) => (
          <span
            key={l} style={{ ...s.link, color: hov === l ? "var(--purple-m)" : "#555" }}
            onMouseEnter={() => setHov(l)} onMouseLeave={() => setHov(null)}
          >{l}</span>
        ))}
      </div>
      <div style={s.badge}>◉ BETA — FREE TO USE</div>
    </nav>
  );
}

function KnowledgeGraphSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 680" xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", minHeight: 380 }}>
      <rect width="600" height="680" fill="#0d0d1a" />
      {/* grid */}
      <g stroke="#1a1a3a" strokeWidth="0.5">
        {[80,160,240,320,400,480,560].map(y=><line key={`h${y}`} x1="0" y1={y} x2="600" y2={y}/>)}
        {[80,160,240,320,400,480,560].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="680"/>)}
      </g>
      {/* connection lines */}
      <g stroke="#2d2d6a" strokeWidth="1" fill="none" strokeDasharray="4 3">
        <line x1="300" y1="180" x2="160" y2="300"/>
        <line x1="300" y1="180" x2="440" y2="290"/>
        <line x1="300" y1="180" x2="300" y2="340"/>
        <line x1="160" y1="300" x2="120" y2="430"/>
        <line x1="160" y1="300" x2="220" y2="440"/>
        <line x1="440" y1="290" x2="400" y2="430"/>
        <line x1="440" y1="290" x2="500" y2="420"/>
        <line x1="300" y1="340" x2="260" y2="450"/>
        <line x1="300" y1="340" x2="360" y2="460"/>
      </g>
      {/* center node */}
      <circle cx="300" cy="180" r="38" fill="#4a1d96" stroke="#7c3aed" strokeWidth="2"/>
      <text x="300" y="175" textAnchor="middle" fill="#e0d4ff" fontFamily="'IBM Plex Mono'" fontSize="10" fontWeight="600">YOUR</text>
      <text x="300" y="190" textAnchor="middle" fill="#fff" fontFamily="'Unbounded'" fontSize="11" fontWeight="900">TOPIC</text>
      <circle cx="300" cy="180" r="52" fill="none" stroke="#4a1d96" strokeWidth="1" strokeDasharray="3 4"/>
      {/* pulse */}
      <circle cx="300" cy="180" r="38" fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity="0.3">
        <animate attributeName="r" values="38;70;38" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
      {/* mid nodes */}
      <circle cx="160" cy="300" r="28" fill="#1a3a1a" stroke="#2d9c55" strokeWidth="2"/>
      <text x="160" y="296" textAnchor="middle" fill="#a3f0b5" fontFamily="'IBM Plex Mono'" fontSize="9">notes</text>
      <text x="160" y="308" textAnchor="middle" fill="#2d9c55" fontFamily="'IBM Plex Mono'" fontSize="9">✦ AI</text>
      <circle cx="440" cy="290" r="28" fill="#1a0d3a" stroke="#7c3aed" strokeWidth="2"/>
      <text x="440" y="286" textAnchor="middle" fill="#c4b5fd" fontFamily="'IBM Plex Mono'" fontSize="9">quiz</text>
      <text x="440" y="298" textAnchor="middle" fill="#7c3aed" fontFamily="'IBM Plex Mono'" fontSize="9">✦ AI</text>
      <circle cx="300" cy="340" r="26" fill="#1a1a0d" stroke="#c9a000" strokeWidth="2"/>
      <text x="300" y="344" textAnchor="middle" fill="#f0d060" fontFamily="'IBM Plex Mono'" fontSize="9">progress</text>
      {/* leaf nodes */}
      {[
        { x:94, y:410, label:"subtopics", stroke:"#2d9c55", fill:"#0d1a0d", textFill:"#7ddf8a" },
        { x:190, y:420, label:"wiki imgs", stroke:"#2d9c55", fill:"#0d1a0d", textFill:"#7ddf8a" },
        { x:370, y:410, label:"backlog",   stroke:"#7c3aed", fill:"#1a0d2e", textFill:"#c4b5fd" },
        { x:468, y:400, label:"graphs",    stroke:"#7c3aed", fill:"#1a0d2e", textFill:"#c4b5fd" },
        { x:234, y:430, label:"track",     stroke:"#c9a000", fill:"#1a1500", textFill:"#f0d060" },
        { x:332, y:438, label:"score",     stroke:"#c9a000", fill:"#1a1500", textFill:"#f0d060" },
      ].map(n=>(
        <g key={n.label}>
          <rect x={n.x} y={n.y} width={56} height={36} rx="6" fill={n.fill} stroke={n.stroke} strokeWidth="1.5"/>
          <text x={n.x+28} y={n.y+22} textAnchor="middle" fill={n.textFill} fontFamily="'IBM Plex Mono'" fontSize="9">{n.label}</text>
        </g>
      ))}
      {/* upload box */}
      <rect x="186" y="560" width="228" height="72" rx="10" fill="#1a1a2e" stroke="#3a3a6a" strokeWidth="1.5" strokeDasharray="5 4"/>
      <text x="300" y="588" textAnchor="middle" fill="#666" fontFamily="'IBM Plex Mono'" fontSize="10">drag &amp; drop your syllabus</text>
      <text x="300" y="608" textAnchor="middle" fill="#444" fontFamily="'IBM Plex Mono'" fontSize="10">or type any topic here</text>
      <rect x="240" y="618" width="120" height="0.5" fill="#2d9c55"/>
      {/* badge */}
      <rect x="16" y="20" width="148" height="28" rx="14" fill="#4a1d96"/>
      <text x="90" y="39" textAnchor="middle" fill="#fff" fontFamily="'IBM Plex Mono'" fontSize="10" fontWeight="600">knowledge graph</text>
    </svg>
  );
}

function Hero() {
  const [ctaHov, setCtaHov] = useState(false);
  
  return (
    <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"88vh", borderBottom:"var(--border)" }}>
      {/* left */}
      <div style={{ padding:"52px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between",
        borderRight:"var(--border)", position:"relative", overflow:"hidden", background:"var(--paper)" }}>
        {/* bg watermark */}
        <div style={{ position:"absolute", bottom:-20, left:-10, fontFamily:"var(--display)", fontSize:140,
          fontWeight:900, color:"rgba(74,29,150,0.05)", pointerEvents:"none", whiteSpace:"nowrap",
          zIndex:0, lineHeight:1 }}>LEARN</div>
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="fade-up" style={{ display:"inline-block", background:"var(--ink)", color:"var(--white)",
            fontSize:10, padding:"5px 14px", borderRadius:999, letterSpacing:"0.1em",
            marginBottom:20, fontFamily:"var(--mono)" }}>↯ AI-POWERED STUDY TOOL</div>
          <h1 className="fade-up delay-1" style={{ fontFamily:"var(--display)", fontSize:"clamp(36px,5.5vw,64px)",
            fontWeight:900, lineHeight:0.95, letterSpacing:"-0.04em", color:"var(--ink)", marginBottom:28 }}>
            Your brain,<br/>
            <span style={{ color:"var(--purple-m)" }}>but with</span><br/>
            <span style={{ WebkitTextStroke:"2px var(--ink)", color:"transparent",
              fontStyle:"italic", fontFamily:"var(--serif)" }}>cheat codes.</span>
          </h1>
          <p className="fade-up delay-2" style={{ fontSize:13, lineHeight:1.8, color:"#444",
            maxWidth:380, marginBottom:36, fontFamily:"var(--mono)" }}>
            Drop your syllabus. SynaptiQ reads it, builds your interactive notes, quizzes you like a professor
            who actually wants you to pass — and tracks every gap in your knowledge automatically.
          </p>
          <Link to="/login">
          <button
            className="fade-up delay-3"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{ display:"inline-flex", alignItems:"center", gap:10, background:"var(--ink)",
              color:"var(--white)", fontFamily:"var(--display)", fontSize:12, fontWeight:700,
              padding:"14px 28px", border:"none", cursor:"pointer", letterSpacing:"0.04em",
              transform: ctaHov ? "translate(-3px,-3px)" : "translate(0,0)",
              transition:"transform .15s", outline:"none" }}>
            Start learning free <span style={{ fontSize:18, lineHeight:1 }}>→</span>
          </button>
          </Link>
        </div>
        <div className="fade-up delay-4" style={{ fontSize:11, color:"#888", fontFamily:"var(--mono)", position:"relative", zIndex:1 }}>
          No account needed · Works with any subject · Built by students
        </div>
      </div>
      {/* right — dark graph */}
      <div style={{ background:"var(--ink2)", overflow:"hidden" }}>
        <KnowledgeGraphSVG />
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    "UPLOAD SYLLABUS","GET AI NOTES","WIKIPEDIA IMAGES","SUBTOPIC CARDS",
    "TRACK PROGRESS","AI-GENERATED QUIZ","PERFORMANCE GRAPHS","BACKLOG TRACKER",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:"var(--purple-m)", padding:"10px 0", borderBottom:"var(--border)", overflow:"hidden", whiteSpace:"nowrap" }}>
      <div style={{ display:"inline-flex", animation:"ticker 22s linear infinite" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontFamily:"var(--display)", fontSize:12, fontWeight:700,
            color:"#fff", letterSpacing:"0.08em", padding:"0 32px" }}>
            {t} <span style={{ color:"rgba(255,255,255,0.4)" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function WhatIsIt() {
  return (
    <section style={{ display:"grid", gridTemplateColumns:"280px 1fr", borderBottom:"var(--border)" }}>
      <div style={{ padding:"40px 36px", borderRight:"var(--border)", display:"flex", alignItems:"flex-start" }}>
        <div style={{ writingMode:"vertical-lr", transform:"rotate(180deg)", fontFamily:"var(--display)",
          fontSize:11, fontWeight:700, letterSpacing:"0.2em", color:"#888", textTransform:"uppercase" }}>
          what is synaptiq
        </div>
      </div>
      <div style={{ padding:"52px 56px" }}>
        <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,44px)", fontStyle:"italic",
          lineHeight:1.15, marginBottom:24, color:"var(--ink)" }}>
          It's like having a{" "}
          <strong style={{ fontStyle:"normal", fontFamily:"var(--display)", color:"var(--purple-m)" }}>study partner</strong>
          {" "}who read everything,<br/>remembered it perfectly,<br/>
          and has <em style={{ fontStyle:"italic" }}>infinite patience</em> for your questions.
        </h2>
        <p style={{ fontSize:13, lineHeight:1.9, color:"#3a3a3a", maxWidth:560, fontFamily:"var(--mono)" }}>
          SynaptiQ turns{" "}
          <span style={{ fontStyle:"normal", color:"var(--green)", fontWeight:600, borderBottom:"2px dashed var(--green)" }}>any syllabus or topic</span>
          {" "}into a full learning experience — not just a wall of text. You get structured notes
          with real images pulled from Wikipedia, keyword definitions that pop up on hover, interactive diagrams,
          and subtopic cards that track exactly how far you've come. Finished reading? The AI quizzes you on what
          matters. Missed something? It builds a{" "}
          <span style={{ fontStyle:"normal", color:"var(--green)", fontWeight:600, borderBottom:"2px dashed var(--green)" }}>backlog</span>
          {" "}automatically and reminds you to come back.
        </p>
      </div>
    </section>
  );
}

const BENTO_CELLS = [
  { num:"01", icon:"◈", title:"AI interactive notes",       featured:true,
    body:"Type a topic or upload a PDF/DOCX syllabus. SynaptiQ generates rich, structured notes — complete with diagrams, timelines, and visual elements — not just copied text.",
    tag:"CORE FEATURE" },
  { num:"02", icon:"⊟", title:"Subtopic cards + progress",  featured:false,
    body:"Every topic is broken into digestible subtopic cards. A live progress ring shows how much you've covered. Jump in anywhere, resume anytime." },
  { num:"03", icon:"◎", title:"Wiki image definitions",      featured:false,
    body:"Every keyword in your notes is linked. Hover any highlighted term and a real Wikipedia image + definition appears inline. No tab-switching needed." },
  { num:"04", icon:"◐", title:"AI-generated quizzes",        green:true,
    body:"After studying a subtopic, the AI generates a custom quiz — MCQs, fill-in-the-blanks, concept matching — uniquely built from the notes you just read.",
    tag:"ADAPTIVE" },
  { num:"05", icon:"◻", title:"Performance graphs",          featured:false,
    body:"Your quiz scores plotted over time per subtopic. Spot exactly where you're strong, where you're slipping, and which revision is overdue." },
  { num:"06", icon:"↺", title:"Backlog tracker",             featured:false,
    body:"Topics you scored low on or skipped get queued automatically. SynaptiQ resurfaces them so nothing falls through the cracks before your exam." },
];

function BentoCell({ cell, index }) {
  const [hov, setHov] = useState(false);
  const isRight = index % 3 === 2;
  const isBottomRow = index >= 3;
  const bg = cell.featured ? "var(--ink)" : cell.green ? "var(--green)" : hov ? "var(--purple-l)" : "var(--paper)";
  const titleColor = cell.featured || cell.green ? "#fff" : "var(--ink)";
  const bodyColor  = cell.featured ? "rgba(255,255,255,0.65)" : cell.green ? "rgba(255,255,255,0.7)" : "#555";
  const numColor   = cell.featured || cell.green ? "rgba(255,255,255,0.4)" : "#aaa";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"36px 32px", position:"relative", overflow:"hidden",
        transition:"background .2s",
        background: bg,
        borderRight: isRight ? "none" : "var(--border)",
        borderBottom: isBottomRow ? "none" : "var(--border)",
      }}>
      <div style={{ fontFamily:"var(--display)", fontSize:11, fontWeight:700, letterSpacing:"0.1em",
        color: numColor, marginBottom:16 }}>{cell.num}</div>
      <div style={{ fontSize:28, marginBottom:14, display:"block" }}>{cell.icon}</div>
      <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:700, letterSpacing:"-0.02em",
        color: titleColor, marginBottom:10, lineHeight:1.2 }}>{cell.title}</div>
      <p style={{ fontSize:12, lineHeight:1.75, color: bodyColor, fontFamily:"var(--mono)" }}>{cell.body}</p>
      {cell.tag && (
        <span style={{ display:"inline-block", marginTop:14, fontSize:10, fontWeight:700,
          letterSpacing:"0.08em", padding:"3px 10px", borderRadius:999,
          background: cell.green ? "rgba(255,255,255,0.2)" : "var(--purple-m)",
          color:"#fff" }}>{cell.tag}</span>
      )}
    </div>
  );
}

function BentoGrid() {
  return (
    <section style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"var(--border)" }}>
      {BENTO_CELLS.map((c, i) => <BentoCell key={c.num} cell={c} index={i} />)}
    </section>
  );
}

const STEPS = [
  { num:"01", label:"Upload or type",    desc:"Paste a topic, drag in a PDF, or type a chapter title" },
  { num:"02", label:"AI builds notes",   desc:"Structured notes + visuals + wiki images appear instantly", accent:"purple" },
  { num:"03", label:"Explore subtopics", desc:"Pick any subtopic card and go deep at your own pace" },
  { num:"04", label:"Take the quiz",     desc:"AI generates questions from exactly what you just studied", accent:"green" },
  { num:"05", label:"Review + repeat",   desc:"See your score graph, clear backlog, crush the exam" },
];

function HowItWorks() {
  const [hov, setHov] = useState(null);
  return (
    <section style={{ padding:"60px 48px", borderBottom:"var(--border)", background:"var(--white)" }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:20, marginBottom:48 }}>
        <h2 style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:900, letterSpacing:"-0.04em" }}>How it works</h2>
        <span style={{ fontSize:12, color:"#888", fontFamily:"var(--mono)" }}>// five steps, no friction</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:0, position:"relative" }}>
        {/* dashed connector line */}
        <div style={{ position:"absolute", top:28, left:"10%", right:"10%", height:2, zIndex:0,
          backgroundImage:"repeating-linear-gradient(90deg,var(--ink) 0,var(--ink) 8px,transparent 8px,transparent 16px)" }}/>
        {STEPS.map((step, i) => {
          const isHov = hov === i;
          const circBg =
            step.accent === "purple" ? "var(--purple-m)" :
            step.accent === "green"  ? "var(--green)"    :
            isHov                    ? "var(--ink)"       : "var(--paper)";
          const circCol = step.accent || isHov ? "#fff" : "var(--ink)";
          return (
            <div key={step.num}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center",
                padding:"0 8px", position:"relative", zIndex:1, cursor:"default" }}>
              <div style={{ width:56, height:56, borderRadius:"50%",
                border: `2.5px solid ${step.accent === "purple" ? "var(--purple-m)" : step.accent === "green" ? "var(--green)" : "var(--ink)"}`,
                background: circBg, display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--display)", fontSize:11, fontWeight:900, marginBottom:16, flexShrink:0,
                color: circCol, transition:"background .2s, color .2s" }}>
                {step.num}
              </div>
              <div style={{ fontFamily:"var(--display)", fontSize:11, fontWeight:700,
                letterSpacing:"-0.01em", color:"var(--ink)", marginBottom:6 }}>{step.label}</div>
              <div style={{ fontSize:11, color:"#777", lineHeight:1.55, fontFamily:"var(--mono)" }}>{step.desc}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WikiStrip() {
  return (
    <div style={{ background:"var(--green)", padding:"28px 48px", display:"flex",
      alignItems:"center", gap:32, borderBottom:"var(--border)" }}>
      <div style={{ background:"var(--white)", color:"var(--green)", fontFamily:"var(--display)",
        fontSize:10, fontWeight:900, padding:"6px 14px", borderRadius:999,
        letterSpacing:"0.08em", flexShrink:0 }}>✦ WIKI POWERED</div>
      <p style={{ fontSize:13, color:"var(--white)", lineHeight:1.7, maxWidth:480, fontFamily:"var(--mono)" }}>
        <strong style={{ fontFamily:"var(--display)", fontSize:14 }}>Every keyword has a face.</strong>
        {" "}SynaptiQ connects to Wikipedia so every technical term in your notes shows its real image and
        definition on hover — making abstract concepts immediately concrete.
      </p>
    </div>
  );
}

function ProofSection() {
  return (
    <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"var(--border)" }}>
      {/* left dark */}
      <div style={{ padding:"52px 48px", background:"var(--ink)", borderRight:"var(--border)" }}>
        <div style={{ fontFamily:"var(--display)", fontSize:"clamp(48px,7vw,88px)", fontWeight:900,
          letterSpacing:"-0.05em", color:"var(--white)", lineHeight:0.9, marginBottom:12 }}>
          100<span style={{ color:"var(--green-m)" }}>%</span><br/>free.
        </div>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginTop:16, fontFamily:"var(--mono)", lineHeight:1.7 }}>
          No subscription. No credit card. No per-quiz limit. SynaptiQ is a hackathon project built because
          we hated the way studying worked.
        </p>
        <div style={{ marginTop:36, display:"flex", gap:32 }}>
          {[
            { val:"Any",  col:"#fff",          sub:"subject or\nsyllabus" },
            { val:"∞",    col:"var(--green-m)", sub:"quizzes\ngenerated" },
            { val:"0s",   col:"#c4b5fd",        sub:"setup\ntime" },
          ].map(s=>(
            <div key={s.val}>
              <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:900, color:s.col }}>{s.val}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4, fontFamily:"var(--mono)", whiteSpace:"pre-line" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      {/* right */}
      <div style={{ padding:"52px 48px" }}>
        <h3 style={{ fontFamily:"var(--display)", fontSize:20, fontWeight:900,
          letterSpacing:"-0.03em", marginBottom:24 }}>Everything you get, laid out simply.</h3>
        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { dot:"p", text:"AI-generated notes from any topic or uploaded syllabus — structured, not a dump" },
            { dot:"g", text:"Subtopic card system with visual progress rings so you know exactly where you are" },
            { dot:"p", text:"Interactive visual elements — diagrams, timelines, concept maps — embedded in your notes" },
            { dot:"g", text:"Wikipedia image pop-ups on every keyword, no extra searching needed" },
            { dot:"p", text:"AI quiz after each subtopic — questions built from your actual notes, not generic banks" },
            { dot:"g", text:"Score graphs over time so you can see improvement (or where to panic)" },
            { dot:"p", text:"Automatic backlog queue — weak topics resurface before they become exam disasters" },
          ].map((li, i) => (
            <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, fontSize:12,
              lineHeight:1.6, color:"#333", fontFamily:"var(--mono)" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0, marginTop:4,
                background: li.dot === "p" ? "var(--purple-m)" : "var(--green)" }}/>
              <span>{li.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CtaSection() {
  const [btnHov, setBtnHov] = useState(false);
  return (
    <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"var(--border)" }}>
      {/* left purple */}
      <div style={{ padding:"72px 56px", background:"var(--purple-m)", borderRight:"var(--border)" }}>
        <h2 style={{ fontFamily:"var(--display)", fontSize:"clamp(28px,4vw,46px)", fontWeight:900,
          letterSpacing:"-0.04em", color:"#fff", lineHeight:1, marginBottom:20 }}>
          Stop<br/>
          <em style={{ fontStyle:"italic", fontFamily:"var(--serif)", fontWeight:400 }}>re-reading</em><br/>
          the same<br/>page.
        </h2>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.8, marginBottom:36, fontFamily:"var(--mono)" }}>
          SynaptiQ turns passive rereading into active learning. Give it your syllabus once.
          It does the rest — notes, quizzes, gaps, all of it.
        </p>
        <Link to="/login">
        <button
          onMouseEnter={() => setBtnHov(true)} onMouseLeave={() => setBtnHov(false)}
          style={{ background:"var(--white)", color:"var(--purple-m)", fontFamily:"var(--display)",
            fontSize:12, fontWeight:900, padding:"14px 30px", border:"none", cursor:"pointer",
            letterSpacing:"0.04em", transition:"transform .15s",
            transform: btnHov ? "translate(-3px,-3px)" : "translate(0,0)", outline:"none" }}>
          Try SynaptiQ now →
        </button>
        </Link>
      </div>
      {/* right info */}
      <div style={{ padding:"72px 56px", background:"var(--purple-l)", display:"flex",
        flexDirection:"column", justifyContent:"center", gap:0 }}>
        {[
          { icon:"◈", title:"Works with any format",
            body:"PDF, DOCX, plain text, or just typing. Your biology notes, your law readings, your engineering formulas — all fair game." },
          { icon:"◎", title:"Built for actual students",
            body:"Not a corporate EdTech product. Built at a hackathon to solve a real problem: studying is broken, and most tools just digitise the same bad habits." },
          { icon:"↺", title:"Keeps working after you close it",
            body:"Progress is saved. Your backlog waits. Your graphs stay. Come back a week later and SynaptiQ remembers exactly where things went wrong." },
        ].map((row, i, arr) => (
          <div key={row.title} style={{ display:"flex", alignItems:"flex-start", gap:16,
            padding:"20px 0", borderBottom: i < arr.length-1 ? "1.5px solid rgba(74,29,150,0.15)" : "none" }}>
            <div style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{row.icon}</div>
            <div>
              <div style={{ fontFamily:"var(--display)", fontSize:12, fontWeight:700,
                color:"var(--purple)", marginBottom:4, letterSpacing:"-0.01em" }}>{row.title}</div>
              <div style={{ fontSize:11, color:"#555", lineHeight:1.65, fontFamily:"var(--mono)" }}>{row.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:"var(--ink)", padding:"28px 48px", display:"flex",
      alignItems:"center", justifyContent:"space-between" }}>
      <div style={{ fontFamily:"var(--display)", fontWeight:900, fontSize:18,
        color:"var(--white)", letterSpacing:"-0.04em" }}>
        Synapti<span style={{ color:"var(--purple-m)" }}>Q</span>
      </div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"var(--mono)" }}>
        Built at hackathon 2025 · Powered by AI · Open source
      </div>
      <div style={{ display:"flex", gap:20 }}>
        {["GitHub","Docs","Contact"].map(l=>(
          <span key={l} style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontFamily:"var(--mono)", cursor:"pointer" }}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

/* ─────────── ROOT APP ─────────── */
export default function SynaptiQ() {
  useEffect(() => {
    // 1. Inject styles on mount
    if (!document.getElementById("synaptiq-styles")) {
      const s = document.createElement("style");
      s.id = "synaptiq-styles";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }

    // 2. Remove styles on unmount
    return () => {
      const styleTag = document.getElementById("synaptiq-styles");
      if (styleTag) {
        styleTag.remove();
      }
    };
  }, []);
  return (
    <div style={{ background:"var(--paper)", color:"var(--ink)", overflowX:"hidden", minHeight:"100vh" }}>
      <Nav />
      <Hero />
      <Ticker />
      <WhatIsIt />
      <BentoGrid />
      <HowItWorks />
      <WikiStrip />
      <ProofSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
