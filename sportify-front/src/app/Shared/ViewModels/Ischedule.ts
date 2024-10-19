
export interface ITschedule{
  day: string,
  startTime:string,
  endTime:string,
}

export interface getITschedule{
  day: Array<string>,
  startTime:Array<string>,
  endTime:Array<string>,
}
export interface Ischedule {
  Day: string,
  StartTime: string,
  EndTime: string
}
export interface PlaceSchedule {
  dayofWeek: string,
  date: Date
  schedule: Array<SchedulePerHour>
  isWorking: boolean,
}
export interface SchedulePerHour {
  period: number,
  duration: number,
  status:SchStatus,
  capacity: number,
}
 enum SchStatus
{
    Booked,
    Available,
    SemiAvailable
}

