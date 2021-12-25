export interface INewUser {
    email: string,
    id: string,
    createdAt: string,
}

export interface IUser extends INewUser{
    name: string,
    age: number,
    photo?: string,
}