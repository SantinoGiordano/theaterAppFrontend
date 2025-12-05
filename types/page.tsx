export interface Movie {
    id: string;
    title: string;
    description: string;
    runtime: number;
    releaseDate: string;
    rating: number;
    genre: string[];
    directors: string;
    img?: string;
}