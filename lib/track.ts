// Custom event tracking helper. Sends to Plausible if available, otherwise no-op.

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  try {
    window.plausible(event, props ? { props } : undefined);
  } catch {
    // Swallow — analytics must never break UX.
  }
}

// Named event helpers — centralized so we can rename/refactor easily.
export const Events = {
  letterGenerated: (type: string) => track("letter_generated", { type }),
  epuWizardCompleted: () => track("epu_wizard_completed"),
  leadSubmitted: (riskLevel: string) => track("lead_submitted", { risk: riskLevel }),
  lawyerSignup: (city: string) => track("lawyer_signup", { city }),
  jobSubmitted: (region: string) => track("job_submitted", { region }),
  jobContactRevealed: (jobId: string) => track("job_contact_revealed", { job: jobId }),
  statuteCalculated: (result: string) => track("statute_calculated", { result }),
  aiChatStarted: () => track("ai_chat_started"),
  caseAssessmentStarted: () => track("case_assessment_started"),
  caseAssessmentCompleted: (riskLevel: string) => track("case_assessment_completed", { risk: riskLevel }),
};
