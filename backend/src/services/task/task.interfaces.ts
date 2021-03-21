export interface NewTask {
    title: string;
    description: string;
    realisationDate: string;
    userId: number;
    tagId: number;
}

export interface TaskResponse {
        id: number;
        title: string;
        description: string;
        realisationDate: string;
        userId: number;
        [key: string]: string | number;
}

export interface TaskToUpdate {
    title?: string;
    description?: string;
    realisationDate?: string;
}
