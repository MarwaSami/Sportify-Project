
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { WeekDay } from '@angular/common';
import { scheduled } from 'rxjs';
import { TrainerService } from 'src/app/Owner/Services/trainer.service';
import { ITschedule, getITschedule } from 'src/app/Shared/ViewModels/Ischedule';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-TrainerSchedule',
  templateUrl: './Trainer-schedule.component.html',
  styleUrls: ['./Trainer-schedule.component.css']
})
export class TrainerScheduleComponent {
  ScheduleForm!: FormGroup
  formdata: FormData = new FormData();
  errorvalue: string = '';
  schedule:getITschedule={day:[],startTime:[],endTime:[]}
  showForm: boolean = false;
  isedited: boolean = false;
  days: Array<any> = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  constructor(private Builder: FormBuilder, private Trainersch:TrainerService,
     private route: Router, private toaster:ToastrService ) {
    this.Trainersch.getSchedule().subscribe(
      result => {
        if (result.isSuccceed &&result.data.day.length>0) {
          this.isedited = true;
          this.schedule=result.data;
          console.log(this.schedule);

                this.ScheduleForm = this.Builder.group(
                  {
                    saturday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[0]), this.getTime(this.schedule.endTime[0]))),
                    sunday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[1]), this.getTime(this.schedule.endTime[1]))),
                    monday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[2]), this.getTime(this.schedule.endTime[2]))),
                    tuesday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[3]), this.getTime(this.schedule.endTime[3]))),
                    wednesday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[4]), this.getTime(this.schedule.endTime[4]))),
                    thursday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[5]), this.getTime(this.schedule.endTime[5]))),
                    friday: this.Builder.array(this.daysschedule(this.getTime(this.schedule.startTime[6]), this.getTime(this.schedule.endTime[6]))),
                  }
                )
              }
              else {
                this.ScheduleForm = this.Builder.group(
                  {
                    saturday: this.Builder.array(this.daysschedule('', '')),
                    sunday: this.Builder.array(this.daysschedule('', '')),
                    monday: this.Builder.array(this.daysschedule('', '')),
                    tuesday: this.Builder.array(this.daysschedule('', '')),
                    wednesday: this.Builder.array(this.daysschedule('', '')),
                    thursday: this.Builder.array(this.daysschedule('', '')),
                    friday: this.Builder.array(this.daysschedule('', '')),
                  }
                )
              }
            });
          this.showForm = true
      }
  //  data:any;
  //  data.sunday={from:'',to:''}

  Schedulearr(day: any) {
    // console.log(this.ScheduleForm.controls[day] as FormArray);
    return this.ScheduleForm.controls[day] as FormArray
  }
  send() {
    let sch: Array<ITschedule> = [
      { day: "saturday", startTime: '', endTime: '' },
      { day: "sunday", startTime: '', endTime: '' },
      { day: "monday", startTime: '', endTime: '' },
      { day: "tuesday", startTime: '', endTime: '' },
      { day: "wednesday", startTime: '', endTime: '' },
      { day: "thursday", startTime: '', endTime: '' },
      { day: "friday", startTime: '', endTime: '' },

    ]
    // for (let day of this.days) {
    //   if (!this.validtime(parseInt(this.ScheduleForm.controls[day].value[0]), parseInt(this.ScheduleForm.controls[day].value[1]))) {
    //     this.errorvalue = `you must valid time for day: ${day}`
    //   }
    //   else {
    //     this.errorvalue = ''
    //     // let str:string=(String)day
    //     // sch[str]={from:this.ScheduleForm.controls[day].value[0],to:this.ScheduleForm.controls[day].value[1]}
    //   }

    // }
    if (this.errorvalue == '') {
      for (let i = 0; i < sch.length; i++) {
        if (this.ScheduleForm.controls[this.days[i]].value[0] =='') {
          this.ScheduleForm.controls[this.days[i]].value[0] = '00:00';
        }
        if (this.ScheduleForm.controls[this.days[i]].value[1] == '') {
          this.ScheduleForm.controls[this.days[i]].value[1] = '00:00';
        }
        sch[i].startTime = this.ScheduleForm.controls[this.days[i]].value[0];

        sch[i].endTime = this.ScheduleForm.controls[this.days[i]].value[1];
        this.formdata.append('Day', sch[i].day)
        this.formdata.append('StartTime', sch[i].startTime)
        this.formdata.append('EndTime', sch[i].endTime)
      }
      if(!this.isedited){
        this.Trainersch.addSchedule(this.formdata).subscribe(
          (res)=>{
            if(res.isSuccceed){
              this.toaster.success("Successfully added your schedule");
              this.route.navigateByUrl('/Trainer');
            }
          }
        );
      }
      else{
        this.Trainersch.updateSchedule(this.formdata).subscribe(
          (res)=>{
            if(res.isSuccceed){
              this.toaster.success("Successfully updated your schedule");
              this.route.navigateByUrl('/Trainer')
            }
          }
        );
      }
    }

  }
  validtime(from: number, to: number): boolean {
    if ((to - from > 0) || isNaN(to - from))
      return true;
    else
      return false
  }
  daysschedule(from: string, to: string): Array<FormControl> {
    let arrContr: Array<FormControl> = []
    arrContr.push(this.Builder.control(from))
    arrContr.push(this.Builder.control(to,))
    return arrContr
  }

  getTime(str: string): string {
    let temp = str.split('T')[1].split(":")
    temp.pop()
    if (temp[0] == temp[1])
      return "";
    else
      return temp.join(":");
  }
}
