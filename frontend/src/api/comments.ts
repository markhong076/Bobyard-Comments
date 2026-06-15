import axios from "axios";

export type Comment = {
    id: number;
    author: string;
    text: string;
    date: string;
    likes: number;
    image: string | null;
};

const API_URL = "http://localhost:3000/comments";

export async function fetchComments() {
    const response = await axios.get<Comment[]>(API_URL);
    return response.data;
}

export async function createComment(text: string) {
    const response = await axios.post<Comment>(API_URL, { 
        comment: {
            text,
        },
    });
    return response.data;
}

export async function updateComment(id: number, text: string) {
    const response = await axios.patch<Comment>(`${API_URL}/${id}`, { 
        comment: {
            text,
        },
    });
    return response.data;
}

export async function deleteComment(id: number) {
    await axios.delete(`${API_URL}/${id}`);
}