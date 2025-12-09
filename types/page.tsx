export interface Movie {
    id: string;
    name: string;
    description: string;
    runtime: number;
    releaseDate: string;
    rating: number;
    genre: string[];
    showtime: string[];
    directors: string;
    img?: string;
}