export interface ICustomerSeeScheduleT {
    Id: number,
    Name: string,
    imgsURL: Array<string>,
    Cat: string,
    lng: number,
    lat: number,
    main: string,
    street: string,
    city: string,
    gov: string,
    Surface: [
        {
            type: string,
            workingHours: Array<string>,
            description: string,
            schedule: [{
                day: string,
                date: string,
                schedule: [
                    {
                        period: string,
                        duration: string,
                        status: string,
                    }]
            }
            ]
        }]
}
