export interface ICustomerSeeSchedule {
    placeName: string,
    lng: number,
    lat: number,
    main: string,
    street: string,
    city: string,
    gov: string,
    placeType: [{
        type: string,
        imgsURL: Array<string>,
        workingHours: Array<string>,
        description: string,
        facilities: Array<string>,
        schedule: [{
            day: string,
            date: string,
            schedule: [{
                period: string,
                duration: string,
                status: string
            }]
        }]
    }]
}
