export interface Movie {
  id: string;
  name: string;
  description: string;
  runtime: number;
  releaseDate: string;
  rating: number;
  genres: string[];
  showtimes: string[];
  directors: string;
  img?: string;
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
  sizes?: FoodSize[];
  price?: number;
  calories?: number;
}

