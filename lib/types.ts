export type SubjectId =
  | "mathematics"
  | "computer-science"
  | "accounting"
  | "economics"
  | "pakistan-studies"
  | "islamiyat"
  | "urdu"
  | "english";

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  description: string;
  progress: number;
  averageScore: number;
  weakTopics: string[];
}

export interface Paper {
  id: string;
  subject: SubjectId;
  title: string;
  year: string;
  session: string;
  duration: number;
  totalMarks: number;
  topic: string;
  instructions: string[];
  demoLabel: string;
}

export interface Question {
  id: string;
  paperId: string;
  subject: SubjectId;
  topic: string;
  title: string;
  questionText: string;
  commandWord: string;
  maximumMarks: number;
  markingGuidance: string;
  year: string;
  session: string;
  demoLabel: string;
}

export interface AttemptRecord {
  title: string;
  subject: string;
  score: string;
  percentage: number;
  date: string;
}

export interface ProgressPoint {
  subject: string;
  score: number;
  previous: number;
  trend: number[];
}

export interface MarkingResult {
  marksAwarded: number;
  maximumMarks: number;
  whyMarksWereAwarded: string;
  missingPoints: string[];
  strengths: string[];
  fullMarkRequirements: string[];
  improvementAdvice: string[];
  confidence: number;
  status: string;
}

export interface ExamAnswerPayload {
  subject: string;
  topic: string;
  questionText: string;
  commandWord: string;
  maximumMarks: number;
  markingGuidance: string;
  studentAnswer: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}
