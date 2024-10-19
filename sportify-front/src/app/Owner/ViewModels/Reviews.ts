import { SubscriptionLog } from "rxjs/internal/testing/SubscriptionLog"

export interface Reviews {
    id: number,
    user: string,
    imgUrl: string,
    rating: number,
    date: string,
    content: string,
    like: Boolean
}

export interface IPlaceReviews {

    id: number,
    rateValue: number,
    ratemsg: string,
    placeId: string,
    userId: string,
    userName: string,
    userImg: string
}
export interface IOwnerPlaces{
    id:number,
    name:string,
}
