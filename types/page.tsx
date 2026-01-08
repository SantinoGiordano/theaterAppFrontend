export interface Movie {
  id: string;
  name: string;
  description: string;
  runtime: number;
  releaseDate: string;
  rating: number;
  genres: string[] | string;
  showtimes: string[];
  directors: string;
  img?: string;
  trailerUrl?: string;
}

export interface FoodSize {
  size: "S" | "M" | "L";
  price: number;
  calories: number;
}

export interface FoodItem {
  _id: string;
  name: string;
  category: string;
  img: string;
  sizes: FoodSize[];
}

export interface FeaturedMovie {
  _id: string;
  name: string;
  description: string;
  img: string;
  score: number;
  runtime: number;
  rating: string;
  trailerUrl?: string;
}

export interface ComingSoonMovie{
  _id: string;
  name: string;
  img: string;
  description: string;
  // trailerUrl: string;
  releaseDate: string;
};
