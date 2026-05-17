import { useEffect, useState } from "react";
import { ChevronRight, Clock3, Home, RotateCcw, Star } from "lucide-react";
import VisualModel from "./components/VisualModel.jsx";
import { lesson, UI, LANGS } from "./lesson/content.js";

const tx = (obj, lang) => obj?.[lang] || obj?.EN || "";
const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

export default function App() {
  const [lang, setLang] = useState("CN");
  const [screen, setScreen] = useState("intro");
  const [sessionLeft, setSessionLeft] = useState(lesson.durationSeconds);
  const [hookLeft, setHookLeft] = useState(lesson.hookSeconds);
  const [diagIndex, setDiagIndex] = useState(0);
  const [diagScore, setDiagScore] = useState(0);
  const [pathId, setPathId] = useState("core");
  const [problemIndex, setProblemIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [parentIndex, setParentIndex] = useState(0);
  const [parentStep, setParentStep] = useState(0);
  const [lastMainPath, setLastMainPath] = useState("core");

  const ui = UI[lang];
  const path = lesson.paths[pathId];
  const problem = path?.problems?.[problemIndex];

  useEffect(() => {
    const timer = setInterval(() => setSessionLeft(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (screen !== "hook") return;
    setHookLeft(lesson.hookSeconds);
    const timer = setInterval(() => setHookLeft(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(timer);
  }, [screen]);

  function resetAll() {
    setScreen("intro");
    setSessionLeft(lesson.durationSeconds);
    setHookLeft(lesson.hookSeconds);
    setDiagIndex(0);
    setDiagScore(0);
    setPathId("core");
    setProblemIndex(0);
    setStep(0);
    setParentIndex(0);
    setParentStep(0);
  }

  function pickDiagnostic(i) {
    const d = lesson.diagnostic[diagIndex];
    const score = diagScore + (i === d.correct ? 1 : 0);
    setDiagScore(score);
    if (diagIndex < lesson.diagnostic.length - 1) {
      setDiagIndex(diagIndex + 1);
    } else {
      if (score <= 2) setPathId("foundation");
      else if (score >= 4) setPathId("advanced");
      else setPathId("core");
      setScreen("route");
    }
  }

  function startPath(id) {
    setPathId(id);
    if (id !== "foundation") setLastMainPath(id);
    setProblemIndex(0);
    setStep(0);
    setScreen("lesson");
  }

  function nextProblem() {
    if (problemIndex < path.problems.length - 1) {
      setProblemIndex(problemIndex + 1);
      setStep(0);
    } else {
      if (path.postPath === "route") {
        setScreen("route");
        setPathId(lastMainPath);
      } else {
        setScreen("formula");
      }
    }
  }

  return (
    <div className="app-shell">
      <div className="stage" dir={lang === "AR" ? "rtl" : "ltr"}>
        <header className="topbar">
          <div className="brand">
            <div className="logo">M</div>
            <div><div className="brand-title">{ui.brand}</div><div className="brand-subtitle">{ui.system}</div></div>
          </div>
          <div className="lang-switch">{LANGS.map(l => <button key={l} className={lang===l ? "active" : ""} onClick={() => setLang(l)}>{l}</button>)}</div>
        </header>

        <main className="main-area">
          {screen === "intro" && <Intro lang={lang} ui={ui} onNext={() => setScreen("hook")} />}
          {screen === "hook" && <Hook lang={lang} ui={ui} hookLeft={hookLeft} onNext={() => setScreen("diagnostic")} />}
          {screen === "diagnostic" && <Diagnostic lang={lang} ui={ui} index={diagIndex} onPick={pickDiagnostic} />}
          {screen === "route" && <Route lang={lang} ui={ui} recommended={pathId} onChoose={startPath} />}
          {screen === "lesson" && <Lesson lang={lang} ui={ui} problem={problem} step={step} setStep={setStep} onNext={nextProblem} sessionLeft={sessionLeft} />}
          {screen === "formula" && <Formula lang={lang} ui={ui} path={path} onNext={() => setScreen("parent")} />}
          {screen === "parent" && <Parent lang={lang} ui={ui} index={parentIndex} setIndex={setParentIndex} step={parentStep} setStep={setParentStep} onNext={() => setScreen("summary")} />}
          {screen === "summary" && <Summary lang={lang} ui={ui} path={lesson.paths[lastMainPath]} onNext={() => setScreen("homework")} />}
          {screen === "homework" && <Homework lang={lang} ui={ui} onNext={() => setScreen("map")} />}
          {screen === "map" && <LearningMap lang={lang} ui={ui} onNext={resetAll} />}
        </main>

        <footer className="footerbar">
          <button className="secondary-btn" onClick={resetAll}><RotateCcw size={16} /> {ui.reset}</button>
          <div className="footer-time"><Clock3 size={16} /> {formatTime(sessionLeft)}</div>
        </footer>
      </div>
    </div>
  );
}

function Intro({ lang, ui, onNext }) {
  return <section className="center-page"><div className="eyebrow">{tx(lesson.title, lang)}</div><h1 className="hero-title">{ui.introTitle}</h1><p className="hero-subtitle">{ui.introSubtitle}</p><button className="primary-btn" onClick={onNext}>{ui.start} <ChevronRight /></button></section>;
}

function Hook({ lang, ui, hookLeft, onNext }) {
  return <section className="hook-page single-hook"><div className="hook-main"><div className="eyebrow">{ui.hook}</div><h2>{tx(lesson.hook.prompt, lang)}</h2><div className="hook-timer">{hookLeft}</div><button className="primary-btn" onClick={onNext}>{ui.diagnostic} <ChevronRight /></button></div></section>;
}

function Diagnostic({ lang, ui, index, onPick }) {
  const d = lesson.diagnostic[index];
  return <section className="diagnostic-page"><div className="diagnostic-card"><div className="blue-band"><span>{ui.diagnostic}</span><strong>{index+1} / {lesson.diagnostic.length}</strong></div><div className="diagnostic-question">{tx(d.prompt, lang)}</div><div className="option-grid">{d.options[lang].map((op,i)=><button key={op} onClick={() => onPick(i)}>{op}</button>)}</div></div></section>;
}

function Route({ lang, ui, recommended, onChoose }) {
  return <section className="route-page"><h2>{ui.route}</h2><div className="path-grid">{Object.entries(lesson.paths).map(([id,p])=><button key={id} className={`path-card ${id===recommended ? "recommended":""}`} onClick={() => onChoose(id)}><div className="eyebrow">{id}</div><h3>{tx(p.label, lang)}</h3><p>{tx(p.description, lang)}</p></button>)}</div></section>;
}

function Lesson({ lang, ui, problem, step, setStep, onNext, sessionLeft }) {
  const maxStep = problem.reveal.length;
  const visible = problem.reveal.slice(0, step);
  return (
    <section className="lesson-page">
      <div className="lesson-head"><div><div className={`mode-pill mode-${problem.mode}`}>{ui[problem.mode] || problem.mode}</div><h2>{tx(problem.prompt, lang)}</h2></div><div className="timer-pill"><Clock3 size={16} /> {formatTime(sessionLeft)}</div></div>
      <div className="lesson-grid">
        <div className="model-panel"><VisualModel problem={problem} step={step} /></div>
        <div className="steps-panel"><div className="panel-title">{ui.steps}</div>{visible.length===0 && <div className="waiting-box">{ui.answerHidden}</div>}<div className="steps-list">{visible.map((s,i)=><div className="step-item" key={i}><span>{i+1}</span>{tx(s, lang)}</div>)}</div>{step>=maxStep && <div className="student-say"><strong>{ui.studentTask}</strong><p>{tx(problem.studentSay, lang)}</p></div>}</div>
      </div>
      <div className="action-row"><button className="secondary-btn" onClick={() => setStep(Math.max(0, step-1))}>{ui.back}</button>{step<maxStep ? <button className="primary-btn" onClick={() => setStep(step+1)}>{ui.reveal} <ChevronRight /></button> : <button className="primary-btn" onClick={onNext}>{ui.next} <ChevronRight /></button>}</div>
    </section>
  );
}

function Formula({ lang, ui, path, onNext }) {
  return <section className="center-page"><div className="eyebrow">{ui.formula}</div><h2 className="section-title">{tx(path.label, lang)}</h2><div className="formula-list">{path.formula.map(f=><div className="formula-card" key={tx(f,lang)}>{tx(f, lang)}</div>)}</div><button className="primary-btn" onClick={onNext}>{ui.parent} <ChevronRight /></button></section>;
}

function Parent({ lang, ui, index, setIndex, step, setStep, onNext }) {
  const item = lesson.parentShowcase[index];
  const maxStep = item.problem.reveal.length;
  const visible = item.problem.reveal.slice(0, step);
  function handleNext() {
    if (step < maxStep) {
      setStep(step + 1);
    } else if (index < lesson.parentShowcase.length - 1) {
      setIndex(index + 1);
      setStep(0);
    } else {
      setStep(0);
      onNext();
    }
  }
  return (
    <section className="parent-page">
      <div className="parent-card">
        <Star className="star" />
        <h2>{ui.parent}</h2>
        <div className="parent-layout">
          <div className="parent-left">
            <div className="parent-round">{tx(item.title, lang)}</div>
            <div className="parent-question">{tx(item.problem.prompt, lang)}</div>
            <div className="parent-mini-model"><VisualModel problem={item.problem} step={step} /></div>
          </div>
          <div className="parent-right">
            <div className="answer-hidden">{ui.explainToParent}</div>
            <div className="parent-step-list">
              {visible.length === 0 && <div className="waiting-box">{ui.answerHidden}</div>}
              {visible.map((s, i) => <div className="step-item" key={i}><span>{i+1}</span>{tx(s, lang)}</div>)}
            </div>
          </div>
        </div>
        <button className="primary-btn parent-next" onClick={handleNext}>{step < maxStep || index < lesson.parentShowcase.length-1 ? ui.next : ui.summary} <ChevronRight /></button>
      </div>
    </section>
  );
}

function Summary({ lang, ui, path, onNext }) {
  return <section className="summary-page"><div className="summary-card"><div className="eyebrow">{ui.summary}</div><h2>{tx(path.label, lang)}</h2><div className="summary-grid"><div><h3>Method</h3><p>{tx(path.summary.method, lang)}</p></div><div><h3>Curriculum</h3><p>{tx(path.summary.curriculum, lang)}</p></div><div><h3>Ability</h3><p>{tx(path.ability, lang)}</p></div></div><button className="primary-btn" onClick={onNext}>{ui.homework} <ChevronRight /></button></div></section>;
}

function Homework({ lang, ui, onNext }) {
  return <section className="center-page"><div className="eyebrow">{ui.homework}</div><h2 className="section-title">{tx(lesson.homework.title, lang)}</h2><p className="hero-subtitle homework-desc">{tx(lesson.homework.description, lang)}</p><button className="primary-btn" onClick={onNext}>{ui.map} <ChevronRight /></button></section>;
}

function LearningMap({ lang, ui, onNext }) {
  return <section className="map-page"><h2>{ui.map}</h2><div className="track-map">{lesson.learningMap.tracks.map((track,i)=><div className="map-track" key={i}><h3>{tx(track.name, lang)}</h3><div className="map-nodes">{track.nodes.map((node,j)=>{const active = tx(node,"EN")===lesson.learningMap.current; return <div className={`map-node ${active?"active":""}`} key={j}>{tx(node, lang)}{active && <small>{ui.youAreHere}</small>}</div>})}</div></div>)}</div><button className="primary-btn" onClick={onNext}><Home size={18} /> {ui.complete}</button></section>;
}
