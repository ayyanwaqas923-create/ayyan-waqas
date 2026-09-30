import { AppShell } from "@/components/app-shell";
import { ExamSession } from "@/components/exam-session";
import { papers, questions } from "@/lib/demo-data";

export default function ExamPage() {
  const selectedPaper = papers[0];
  const examQuestions = questions.filter((question) => question.paperId === selectedPaper.id).slice(0, 2);

  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Full exam mode</p>
        <h2 className="mt-2 text-3xl font-bold text-white">{selectedPaper.title}</h2>
      </div>

      <ExamSession mode="exam" paper={selectedPaper} questions={examQuestions} title={selectedPaper.title} />
    </AppShell>
  );
}
