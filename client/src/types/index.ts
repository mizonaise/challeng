export type AnswerType = {
  id: number;
  createdAt: string;
  description: string;
};

export type QuestionType = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  answers: AnswerType[];
};
