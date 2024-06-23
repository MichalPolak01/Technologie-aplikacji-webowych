export interface IPost {
    title: string;
    text: string;
    image: string;
    createdAt?: Date;
    likes?: Array<string>;
    comments?: Array<{
        userId: string;
        text: string;
        createdAt?: Date;
    }>
}

export type Query<T> = {
    [key: string] : T;
};