export interface IFacility {
    readonly id: string,
    readonly ownerId: string,
    name: string,
    city: string,
    street: string,
    streetNumber: string,
    postalCode: string,
    version: number
}