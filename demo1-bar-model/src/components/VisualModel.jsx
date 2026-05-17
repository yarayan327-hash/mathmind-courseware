function Track({ label, children }) {
  return <div className="track-row"><div className="track-label">{label}</div><div className="track">{children}</div></div>;
}

function Seg({ pct, className, children }) {
  return <div className={`seg ${className || ""}`} style={{ width: `${pct}%` }}>{children}</div>;
}

const pct = (v, max) => Math.max(8, (v / max) * 100);

export default function VisualModel({ problem, step }) {
  if (problem.type === "more") return <More problem={problem} step={step} />;
  if (problem.type === "fewer") return <Fewer problem={problem} step={step} />;
  if (problem.type === "totalDiff" || problem.type === "totalDiffFewer") return <TotalDiff problem={problem} step={step} />;
  if (problem.type === "multiPerson") return <MultiPerson problem={problem} step={step} />;
  if (problem.type === "transferTotal") return <TransferTotal problem={problem} step={step} />;
  return null;
}

function More({ problem, step }) {
  const max = problem.answer + 4;
  return (
    <div className="visual-stack">
      <Track label={problem.baseName}>
        {step >= 1 && <Seg pct={pct(problem.base, max)} className="blue">{problem.base}</Seg>}
      </Track>
      <Track label={problem.targetName}>
        {step >= 2 && <Seg pct={pct(problem.base, max)} className="blue square">{problem.base}</Seg>}
        {step >= 3 && <Seg pct={pct(problem.diff, max)} className="yellow">+{problem.diff}</Seg>}
      </Track>
      {step >= 4 && <div className="calc-chip">{problem.base} + {problem.diff} = {problem.answer}</div>}
    </div>
  );
}

function Fewer({ problem, step }) {
  const max = problem.base + 4;
  const shownValue = step >= 3 ? problem.answer : problem.base;
  return (
    <div className="visual-stack">
      <Track label={problem.baseName}>
        {step >= 1 && <Seg pct={pct(problem.base, max)} className="blue">{problem.base}</Seg>}
      </Track>
      <Track label={problem.targetName}>
        {step >= 2 && <Seg pct={pct(shownValue, max)} className="blue square">{shownValue}</Seg>}
        {step >= 3 && <Seg pct={pct(problem.diff, max)} className="missing">-{problem.diff}</Seg>}
      </Track>
      {step >= 4 && <div className="calc-chip">{problem.base} - {problem.diff} = {problem.answer}</div>}
    </div>
  );
}

function TotalDiff({ problem, step }) {
  const max = problem.bigger + 4;
  return (
    <div className="visual-stack">
      {step >= 1 && <div className="total-banner">TOTAL {problem.total}</div>}
      <Track label={problem.smallerName}>
        {step >= 2 && <Seg pct={pct(problem.smaller, max)} className={step >= 6 ? "blue" : "unknown"}>{step >= 6 ? problem.smaller : "same part"}</Seg>}
      </Track>
      <Track label={problem.biggerName}>
        {step >= 2 && <Seg pct={pct(problem.smaller, max)} className={`${step >= 6 ? "blue" : "unknown"} square`}>{step >= 6 ? problem.smaller : "same part"}</Seg>}
        {step >= 3 && <Seg pct={pct(problem.diff, max)} className="yellow">+{problem.diff}</Seg>}
      </Track>
      {step >= 4 && <div className="calc-chip">{problem.total} - {problem.diff} = {problem.total - problem.diff}</div>}
      {step >= 5 && <div className="calc-chip">{problem.total - problem.diff} ÷ 2 = {problem.smaller}</div>}
      {step >= 6 && <div className="answer-chip">{problem.smallerName} = {problem.smaller}</div>}
    </div>
  );
}

function MultiPerson({ problem, step }) {
  const max = Math.max(problem.plus, problem.base) + 7;
  const net = problem.plusDiff - problem.minusDiff;
  const afterRemove = problem.total - net;
  return (
    <div className="visual-stack compact">
      {step >= 1 && <div className="total-banner">TOTAL {problem.total}</div>}
      <Track label={problem.baseName}>
        {step >= 2 && <Seg pct={pct(problem.base, max)} className={step >= 6 ? "blue" : "unknown"}>{step >= 6 ? problem.base : "reference"}</Seg>}
      </Track>
      <Track label={problem.plusName}>
        {step >= 3 && <Seg pct={pct(problem.base, max)} className={`${step >= 6 ? "blue" : "unknown"} square`}>{step >= 6 ? problem.base : "reference"}</Seg>}
        {step >= 3 && <Seg pct={pct(problem.plusDiff, max)} className="yellow">+{problem.plusDiff}</Seg>}
      </Track>
      <Track label={problem.minusName}>
        {step >= 4 && <Seg pct={pct(problem.minus, max)} className={step >= 6 ? "blue square" : "unknown square"}>{step >= 6 ? problem.minus : `reference -${problem.minusDiff}`}</Seg>}
        {step >= 4 && <Seg pct={pct(problem.minusDiff, max)} className="missing">-{problem.minusDiff}</Seg>}
      </Track>
      {step >= 5 && <div className="calc-chip">+{problem.plusDiff} - {problem.minusDiff} = +{net} → {problem.total} - {net} = {afterRemove}</div>}
      {step >= 6 && Number.isInteger(afterRemove / 3) && <div className="answer-chip">{problem.baseName} = {problem.base}</div>}
      {step >= 6 && !Number.isInteger(afterRemove / 3) && <div className="answer-chip">Data check needed</div>}
    </div>
  );
}

function TransferTotal({ problem, step }) {
  const max = problem.aliBefore + 8;
  return (
    <div className="visual-stack">
      {step >= 1 && <div className="total-banner">TOTAL {problem.total}</div>}
      <Track label="Ali after">
        {step >= 2 && <Seg pct={pct(problem.afterEach, max)} className="blue">{problem.afterEach}</Seg>}
      </Track>
      <Track label="Omar after">
        {step >= 2 && <Seg pct={pct(problem.afterEach, max)} className="blue">{problem.afterEach}</Seg>}
      </Track>
      {step >= 3 && <div className="calc-chip">Reverse: Ali gets {problem.transfer} back</div>}
      <Track label="Ali before">
        {step >= 4 && <Seg pct={pct(problem.afterEach, max)} className="blue square">{problem.afterEach}</Seg>}
        {step >= 4 && <Seg pct={pct(problem.transfer, max)} className="yellow">+{problem.transfer}</Seg>}
      </Track>
      <Track label="Omar before">
        {step >= 4 && <Seg pct={pct(problem.omarBefore, max)} className="blue">{problem.omarBefore}</Seg>}
      </Track>
    </div>
  );
}
