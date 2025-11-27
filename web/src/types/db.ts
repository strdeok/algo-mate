export interface Tag {
    key: string;
    name: string;
  }
  
  // 유저 프로필
  export interface Profile {
    id: string;
    baekjoon_id: string;
    tier: number;
    solved_count: number;
    goal_streak: number;
  }
  
  // 문제 정보
  export interface Problem {
    id: number;
    title: string;
    level: number;
    tags: Tag[];
  }
  
  // 오답 노트 리뷰
  export interface Review {
    id: number;
    user_id: string;
    problem_id: number;
    stage: number;
    next_review_at: string;
    last_solved_at: string;
    memo: string | null;
    is_mastered: boolean;
    
    // Join으로 가져올 문제 정보
    problems?: Problem; 
  }