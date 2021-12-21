export interface INewUser {
    email: string,
    name: string,
    age: number,
}

export interface IUser extends INewUser{
    id: string,
    photo?: string,
}