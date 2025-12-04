export interface Movie {
    id: string;
    title: string;
    description: string;
    runtime: number;
    releaseDate: string;
    rating: number;
    genre: string[];
    director: string;
    img?: string;
}