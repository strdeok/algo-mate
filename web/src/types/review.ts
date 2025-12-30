export interface ReviewType {
  id: number;
  user_id: string;
  problem_id: number;
  stage: number;
  next_review_at: string;
  last_solved_at: string;
  memo: null | string;
  is_mastered: boolean;
  problems: {
    tags: [
      {
        key: string;
        name: string;
      }
    ];
    level: number;
    title: string;
  };
}
