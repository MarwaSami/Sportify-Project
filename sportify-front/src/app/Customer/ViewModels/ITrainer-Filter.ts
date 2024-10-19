export interface ITrainerFilter {
    Id: number,
    Name: string,
    ProfileImgUrl: string,
    PricePerSession: number,
    Cat: string,
    Rating: number,
    lng: number,
    lat: number,
    main: string,
    street: string,
    city: string,
    gov: string,
    Surface: Array<string>
}
export interface ITrainerCard {
    id: string,
    userName: string,
    description: string,
    jobTitle: string
    image: string,
    categoryName: string,
    adress: string,
    surface: string,
    pricePerSession: number
}

export interface UpdateProfileViewModel {
    id: string,
    userName: string,
    email: string,
    phoneNumber: string,
    newPassword: string,
    currentPassword: string,
    image: string,
    categoryID: number,
    city: string,
    surfaceID: number,
    pricePerSession: number,
    description: string,
    jobTitle: string
}
export interface ITrainerDetail {
    id: string,
    userName: string,
    image: string,
    categoryName: string,
    adress: string,
    surface: string,
    pricePerSession: number,
    workingHours: Array<any>,
    description: string,
    jobTitle: string
}
export interface ITrainerReviews {
    id:number,
    rateValue:number,
    ratemsg:string,
    trainerId:string,
    userId:string,
    userName:string,
    userImg:string
}