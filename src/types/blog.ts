export type Author = {
  name: string;
  title: string;
  url: string;
  image_url: string;
  page: boolean;
  email: string;
  socials: {
    linkedin?: string;
    github?: string;
    scholar?: string;
  };
};

export type Blog = {
  id?: number;
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  date?: string;
  author?: string;
  tags?: string[];
  authorData?: Author | null;
};
