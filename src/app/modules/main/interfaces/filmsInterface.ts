export interface Film  {
  id: number;
  title: string;
  year: number;
  director: string;
  writer: string;
  poster: string;
  genres: string[];
  type: string;
  rank: number;
  likes_count: number;
  comments_count: number;
  link: string;
  content: string;
}