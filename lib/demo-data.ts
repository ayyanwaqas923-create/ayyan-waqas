import type { AttemptRecord, Paper, ProgressPoint, Question, SubjectMeta } from "@/lib/types";

export const subjects: SubjectMeta[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Algebra, geometry, functions, and problem-solving",
    progress: 76,
    averageScore: 68,
    weakTopics: ["Probability", "Graphs"],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Algorithms, logic, systems, and programming ideas",
    progress: 79,
    averageScore: 72,
    weakTopics: ["Networks", "Databases"],
  },
  {
    id: "accounting",
    name: "Accounting",
    description: "Double entry, financial statements, and adjustments",
    progress: 71,
    averageScore: 66,
    weakTopics: ["Adjustments", "Calculations"],
  },
  {
    id: "economics",
    name: "Economics",
    description: "Markets, data response, and policy evaluation",
    progress: 67,
    averageScore: 64,
    weakTopics: ["Analysis", "Evaluation"],
  },
  {
    id: "pakistan-studies",
    name: "Pakistan Studies",
    description: "History, politics, society, and geography",
    progress: 74,
    averageScore: 70,
    weakTopics: ["Evidence", "Structure"],
  },
  {
    id: "islamiyat",
    name: "Islamiyat",
    description: "Faith, ethics, and civic understanding",
    progress: 81,
    averageScore: 75,
    weakTopics: ["Explanation", "Evidence"],
  },
  {
    id: "urdu",
    name: "Urdu",
    description: "Comprehension, response, and language analysis",
    progress: 70,
    averageScore: 67,
    weakTopics: ["Structure", "Expression"],
  },
  {
    id: "english",
    name: "English",
    description: "Reading, writing, analysis, and interpretation",
    progress: 82,
    averageScore: 78,
    weakTopics: ["Analysis", "Evaluation"],
  },
];

export const papers: Paper[] = [
  {
    id: "paper-01-maths",
    subject: "mathematics",
    title: "Mathematics Paper 1",
    year: "2024",
    session: "May/June",
    duration: 90,
    totalMarks: 80,
    topic: "Algebra & Graphs",
    instructions: [
      "Answer all questions.",
      "Show all working clearly.",
      "Use a ruler where necessary.",
      "Check arithmetic carefully before finalising your answer.",
    ],
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "paper-02-cs",
    subject: "computer-science",
    title: "Computer Science Paper 2",
    year: "2023",
    session: "October/November",
    duration: 75,
    totalMarks: 70,
    topic: "Algorithms & Logic",
    instructions: [
      "Read each question carefully.",
      "Write clearly in structured sections.",
      "Use pseudocode and terminology accurately.",
    ],
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "paper-03-accounting",
    subject: "accounting",
    title: "Accounting Paper 1",
    year: "2024",
    session: "May/June",
    duration: 120,
    totalMarks: 100,
    topic: "Financial Statements",
    instructions: [
      "Show all calculations and workings.",
      "Label ledger entries clearly.",
      "Use the correct accounting treatment.",
    ],
    demoLabel: "Demo / Sample Material",
  },
];

export const questions: Question[] = [
  {
    id: "q-math-1",
    paperId: "paper-01-maths",
    subject: "mathematics",
    topic: "Algebra",
    title: "Solve linear equations",
    questionText:
      "Solve the simultaneous equations 3x + 2y = 14 and x - y = 2. Show your method and give the final values of x and y.",
    commandWord: "SOLVE",
    maximumMarks: 6,
    markingGuidance:
      "Award method marks for correct elimination or substitution, process marks for accurate calculations, and final answer marks for correct x and y values.",
    year: "2024",
    session: "May/June",
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "q-math-2",
    paperId: "paper-01-maths",
    subject: "mathematics",
    topic: "Graphs",
    title: "Interpret a graph",
    questionText:
      "A straight-line graph passes through (0, 3) and (4, 11). Find the equation of the line and explain what the gradient represents.",
    commandWord: "EXPLAIN",
    maximumMarks: 8,
    markingGuidance:
      "Award marks for correct gradient, intercept, equation, and a valid explanation relating the gradient to rate of change.",
    year: "2024",
    session: "May/June",
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "q-cs-1",
    paperId: "paper-02-cs",
    subject: "computer-science",
    topic: "Algorithms",
    title: "Algorithm design",
    questionText:
      "Describe an algorithm that finds the highest number in a list of 20 values. Explain why your algorithm is efficient and clear enough for a programmer to implement.",
    commandWord: "DESCRIBE",
    maximumMarks: 7,
    markingGuidance:
      "Look for correct algorithm structure, comparison logic, clear step-by-step flow, and valid explanation of efficiency.",
    year: "2023",
    session: "October/November",
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "q-cs-2",
    paperId: "paper-02-cs",
    subject: "computer-science",
    topic: "Databases",
    title: "Database normalisation",
    questionText:
      "Explain why a database table should not store repeated customer data in multiple rows. Discuss the problem this creates for data consistency and maintenance.",
    commandWord: "ANALYSE",
    maximumMarks: 9,
    markingGuidance:
      "Reward logical reasoning about duplication, inconsistency, retrieval, update problems, and better system design.",
    year: "2023",
    session: "October/November",
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "q-accounting-1",
    paperId: "paper-03-accounting",
    subject: "accounting",
    topic: "Adjustments",
    title: "Accruals and prepayments",
    questionText:
      "A business has prepaid rent of $1200 and accrued electricity of $450. Explain how each item affects the financial statements and calculate the correct adjustment entries.",
    commandWord: "CALCULATE",
    maximumMarks: 10,
    markingGuidance:
      "Check correct treatment of prepayments and accruals, accurate calculations, and correct statement impact.",
    year: "2024",
    session: "May/June",
    demoLabel: "Demo / Sample Material",
  },
  {
    id: "q-english-1",
    paperId: "paper-01-maths",
    subject: "english",
    topic: "Analysis",
    title: "Language analysis",
    questionText:
      "Explain how the writer uses language to create tension in the extract. Refer to specific words and phrases in your answer.",
    commandWord: "ANALYSE",
    maximumMarks: 8,
    markingGuidance:
      "Award marks for relevant quotations, explanation of language choices, and developed analysis of effect on tension.",
    year: "2024",
    session: "May/June",
    demoLabel: "Demo / Sample Material",
  },
];

export const recentAttempts: AttemptRecord[] = [
  { title: "Algebra Revision Set", subject: "Mathematics", score: "5/6", percentage: 83, date: "2026-09-10" },
  { title: "Computer Science Paper 2", subject: "Computer Science", score: "12/16", percentage: 75, date: "2026-09-08" },
  { title: "Economics Data Response", subject: "Economics", score: "19/25", percentage: 76, date: "2026-09-06" },
  { title: "Accounting Practice", subject: "Accounting", score: "7/10", percentage: 70, date: "2026-09-04" },
];

export const progressChartData: ProgressPoint[] = [
  { subject: "Mathematics", score: 76, previous: 61, trend: [55, 62, 68, 74, 76] },
  { subject: "Computer Science", score: 79, previous: 69, trend: [58, 63, 70, 77, 79] },
  { subject: "Accounting", score: 71, previous: 64, trend: [52, 55, 60, 66, 71] },
  { subject: "English", score: 82, previous: 75, trend: [61, 68, 73, 79, 82] },
];

export const dashboardSummary = {
  overallPercentage: 74,
  examsCompleted: 12,
  averageScore: 71,
  strongestTopics: ["English Analysis", "Islamiyat Knowledge", "Mathematics Algebra"],
  weakestTopics: ["Probability", "Networks", "Adjustments"],
};

export const aiCoachPrompts = [
  "Why did I lose marks?",
  "How do I get full marks?",
  "Explain this topic.",
  "Give me another question like this.",
  "Give me an easier question.",
  "Give me a harder question.",
  "What should I revise?",
  "What are my weakest topics?",
];

export const profileSettings = {
  name: "Ayesha Rahman",
  email: "ayesha.rahman@student.example",
  targetGrade: "A*/A",
  revisionHours: 4,
  preferredSubjects: ["Mathematics", "Computer Science", "English"],
};
