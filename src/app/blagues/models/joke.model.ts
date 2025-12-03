export interface Joke {
    id: string;
    value: string;
    categories: string[];
    icon_url: string;
    created_at: string;
}

export interface SearchResponse{
    total: number;
    result: Joke[];
}