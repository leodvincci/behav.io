export interface ResponseType {
  app_user_id: number;
  feedbackCounter: number;
  id: number;
  response_S: string;
  response_T: string;
  response_A: string;
  response_R: string;
  vid_link: string;
  isPrivate: boolean;
  question_id: number;
  question_text: string;
}

export interface ResponseLoaderType {
  question: {
    category_id: number;
    id: number;
    isFavorite: boolean;
    question_text: string;
  };
  responses: ResponseType[];
}

export interface ResponseFormType {
  response_S: string;
  response_T: string;
  response_A: string;
  response_R: string;
  vid_link: string;
  isPrivate: boolean;
  isFavorite: boolean;
  setSituation: (situation: string) => void;
  setTask: (task: string) => void;
  setAction: (action: string) => void;
  setResults: (results: string) => void;
  setYoutubeLink: (link: string) => void;
  setIsPrivate: (isPrivate: boolean) => void;
  setIsFavorite: (isFavorite: boolean) => void;
  handleResponseSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface ResponseType {
  question: {
    category_id: number;
    id: number;
    isFavorite: boolean;
    question_text: string;
  };
  responses: any[];
}

export interface QuestionType {
  category_id: number;
  id: number;
  question_text: string;
  isFavorite: boolean;
}

export interface RandomQuestionType {
  question: {
    question_text: string;
    id: number;
    category: string;
    isFavorite: boolean;
  };
}

export interface FavoriteQuestionType {
  success: boolean;
  question: QuestionType;
  favorites: QuestionType;
}

export interface FavoriteQuestionLoaderType {
  success: boolean;
  questions: {
    id: number;
    app_user_id: number;
    question_id: number;
    isFavorite: boolean;
    question_text: string;
  };
}
