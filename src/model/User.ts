export interface INewUser {
    email: string,
    readonly id: string,
    readonly createdAt: string,
    version: number,
}

export interface IUser extends INewUser{
    name: string,
    gender: string,
    age?: number
    photo?: string,
    city?: string,
    postalCode?: string
}