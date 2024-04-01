export type ExploreTopic = {
  topic_id: number;
  topic_name: string;
  description?: string;
  emoji: string;
};

export type Explore = {
  explore_id: number;
  lesson_name: string;
  description?: string;
  emoji: string;
  lesson_content: string;
  created_at: string;
  topic_id: number;
};

export type ExploreUser = {
  explore_user_id: number;
  explore_id: number;
  user_id: number;
  liked: boolean;
  created_at?: string;
  updated_at?: string;
  explore?: Explore;
};
