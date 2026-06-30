"use client";

import { ArrowLeft, ArrowRight, Check, ClipboardList, Send } from "lucide-react";
import { useState } from "react";

export interface ProjectBriefSummary {
  projectType: string;
  goal: string;
  budget: string;
  timeline: string;
  contentStatus: string;
  notes: string;
}

export function ProjectBriefWizard({ onComplete }: { onComplete: (brief: ProjectBriefSummary) => void }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [projectType, setProjectType] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contentStatus, setContentStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [complete, setComplete] = useState(false);
  const canContinue = step === 1 ? Boolean(projectType) : step === 2 ? Boolean(goal && budget && timeline) : step === 3 ? Boolean(contentStatus) : true;

  function finish() {
    onComplete({ projectType, goal, budget, timeline, contentStatus, notes: notes.trim() });
    setComplete(true);
    window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function moveTo(nextStep: number) {
    setDirection(nextStep > step ? "forward" : "back");
    setStep(nextStep);
  }

  return (
    <section className="brief-section" aria-labelledby="brief-title">
      <div className="container">
        <div className="brief-heading"><span className="estimator-eyebrow"><ClipboardList aria-hidden="true" /> Project brief</span><h2 id="brief-title">Plan Your Project</h2><p>Answer a few focused questions and I&apos;ll add a clear brief to your message.</p></div>
        <div className="brief-tool">
          <div className="brief-progress" aria-label={`Step ${step} of 4`}>{[1, 2, 3, 4].map((item) => <span className={item <= step ? "active" : ""} key={item} />)}</div>
          {complete ? (
            <div className="brief-complete brief-panel brief-panel-forward" role="status"><Check aria-hidden="true" /><div><h3>Brief added to your message</h3><p>You can review and edit it in the contact form below.</p></div></div>
          ) : (
            <>
              <div className={`brief-panel brief-panel-${direction}`} key={step}>
                {step === 1 && <ChoiceStep title="What are you building?" options={["Business website", "E-commerce", "Web application", "Website redesign"]} value={projectType} onChange={setProjectType} />}
                {step === 2 && <div className="brief-step"><ChoiceStep title="What is the main goal?" options={["Generate more leads", "Sell products online", "Explain my services", "Launch a new product"]} value={goal} onChange={setGoal} compact /><div className="brief-split"><ChoiceStep title="Starting budget" options={["Under $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000+"]} value={budget} onChange={setBudget} compact /><ChoiceStep title="Preferred timeline" options={["Flexible", "Within 1 month", "1-2 months", "2+ months"]} value={timeline} onChange={setTimeline} compact /></div></div>}
                {step === 3 && <div className="brief-step"><ChoiceStep title="How ready is your content?" options={["Ready to use", "Partially ready", "Need help creating it"]} value={contentStatus} onChange={setContentStatus} compact /><label className="brief-notes">Anything useful I should know?<textarea rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Current website, inspiration, required features, or project context..." /></label></div>}
                {step === 4 && <div className="brief-review"><h3>Review your brief</h3><dl><div><dt>Project</dt><dd>{projectType}</dd></div><div><dt>Goal</dt><dd>{goal}</dd></div><div><dt>Budget</dt><dd>{budget}</dd></div><div><dt>Timeline</dt><dd>{timeline}</dd></div><div><dt>Content</dt><dd>{contentStatus}</dd></div>{notes && <div><dt>Notes</dt><dd>{notes}</dd></div>}</dl></div>}
                <div className="brief-actions"><button type="button" disabled={step === 1} onClick={() => moveTo(step - 1)}><ArrowLeft aria-hidden="true" /> Back</button>{step < 4 ? <button type="button" className="btn-primary" disabled={!canContinue} onClick={() => moveTo(step + 1)}>Continue <ArrowRight aria-hidden="true" /></button> : <button type="button" className="btn-primary" onClick={finish}>Add to Message <Send aria-hidden="true" /></button>}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ChoiceStep({ title, options, value, onChange, compact = false }: { title: string; options: string[]; value: string; onChange: (value: string) => void; compact?: boolean }) {
  return <fieldset className={`brief-choices ${compact ? "compact" : ""}`}><legend>{title}</legend><div>{options.map((option) => <button type="button" className={value === option ? "selected" : ""} aria-pressed={value === option} onClick={() => onChange(option)} key={option}>{value === option && <Check aria-hidden="true" />}<span>{option}</span></button>)}</div></fieldset>;
}
