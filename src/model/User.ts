export interface INewUser {
    email: string,
    id: string,
    createdAt: string,
}

export interface IUser extends INewUser{
    name: string,
    gender: string,
    age?: number
    photo?: string,
    city?: string,
    postalCode?: string
}