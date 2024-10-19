import { Ischedule } from './../../../Shared/ViewModels/Ischedule';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormDataService } from '../../Services/form-data.service';
import { Router } from '@angular/router';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { EditplaceService } from '../../Services/editplace.service';
import { WeekDay } from '@angular/common';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-owner-addplace-p3',
  templateUrl: './owner-addplace-p3.component.html',
  styleUrls: ['./owner-addplace-p3.component.css', './../owner-addplace/owner-addplace.component.css']
})
export class OwnerAddplaceP3Component {
  ScheduleForm!: FormGroup
  formdata: FormData = new FormData();
  errorvalue: string = '';
  showForm: boolean = false;
  place: Iplace = this.Placser.setdefaultPlace();
  isedited: boolean = false;
  days: Array<any> = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  constructor(private Builder: FormBuilder, private setdata: FormDataService, private route: Router
    , private Placser: PlacesService, private EditService: EditplaceService) {
    this.EditService.GetPlaceId().subscribe(
      id => {
        if (id != -1) {
          this.isedited = true;
          this.EditService.GetPlace().subscribe(
            result => {
              if (result.id != 0) {
                this.place = result;
                //schedule not working?
                this.ScheduleForm = this.Builder.group(
                  {
                    saturday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[0]), this.getTime(this.place.schedulesEndTime[0]))),
                    sunday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[1]), this.getTime(this.place.schedulesEndTime[1]))),
                    monday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[2]), this.getTime(this.place.schedulesEndTime[2]))),
                    tuesday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[3]), this.getTime(this.place.schedulesEndTime[3]))),
                    wednesday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[4]), this.getTime(this.place.schedulesEndTime[4]))),
                    thursday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[5]), this.getTime(this.place.schedulesEndTime[5]))),
                    friday: this.Builder.array(this.daysschedule(this.getTime(this.place.schedulesStartTime[6]), this.getTime(this.place.schedulesEndTime[6]))),
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
            }
          );
          this.showForm = true
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
          this.showForm = true;
        }

      })
  }
  //  data:any;
  //  data.sunday={from:'',to:''}

  Schedulearr(day: any) {
    // console.log(this.ScheduleForm.controls[day] as FormArray);
    return this.ScheduleForm.controls[day] as FormArray
  }
  send() {
    let sch: Array<Ischedule> = [
      { Day: "saturday", StartTime: '', EndTime: '' },
      { Day: "sunday", StartTime: '', EndTime: '' },
      { Day: "monday", StartTime: '', EndTime: '' },
      { Day: "tuesday", StartTime: '', EndTime: '' },
      { Day: "wednesday", StartTime: '', EndTime: '' },
      { Day: "thursday", StartTime: '', EndTime: '' },
      { Day: "friday", StartTime: '', EndTime: '' },
    ]
    for (let day of this.days) {
      if (!this.validtime(parseInt(this.ScheduleForm.controls[day].value[0]), parseInt(this.ScheduleForm.controls[day].value[1]))) {
        this.errorvalue = `you must valid time for day: ${day}`
      }
      else {
        this.errorvalue = ''
        // let str:string=(String)day
        // sch[str]={from:this.ScheduleForm.controls[day].value[0],to:this.ScheduleForm.controls[day].value[1]}
      }

    }
    if (this.errorvalue == '') {
      for (let i = 0; i < sch.length; i++) {
        if (this.ScheduleForm.controls[this.days[i]].value[0] == '') {
          this.ScheduleForm.controls[this.days[i]].value[0] = '00:00';
        }
        if (this.ScheduleForm.controls[this.days[i]].value[1] == '') {
          this.ScheduleForm.controls[this.days[i]].value[1] = '00:00';
        }
        sch[i].StartTime = this.ScheduleForm.controls[this.days[i]].value[0];

        sch[i].EndTime = this.ScheduleForm.controls[this.days[i]].value[1];
        this.formdata.append('SchedulesDay', sch[i].Day)
        this.formdata.append('SchedulesStartTime', sch[i].StartTime)
        this.formdata.append('SchedulesEndTime', sch[i].EndTime)
      }
      this.setdata.setFormData(this.formdata);
      this.route.navigateByUrl('/Owner/addplace/P4')
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
