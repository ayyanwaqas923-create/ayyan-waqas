import { AppShell } from "@/components/app-shell";
import { ExamSession } from "@/components/exam-session";
import { questions } from "@/lib/demo-data";

export default function PracticePage() {
  const practiceQuestions = questions.filter((question) => question.subject === "mathematics").slice(0, 1);

  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Practice mode</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Targeted question practice</h2>
      </div>

      <ExamSession mode="practice" questions={practiceQuestions} title="Algebra practice" />
    </AppShell>
  );
}
