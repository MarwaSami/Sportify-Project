import { Time } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-Tdialog-modal',
  templateUrl: './Tdialog-modal.component.html',
  styleUrls: ['./Tdialog-modal.component.css'],

})
export class TDialogModalComponent {
  initPrice:number;
  constructor(public dialogRef: MatDialogRef<TDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA)  public  data:  {StartTime:string, EndTime:string,TotalPrice:number,date:string}
  )
   {
   this.initPrice=this.data.TotalPrice;
   this.data.TotalPrice=this.initPrice*this.Timediff(parseInt(this.data.StartTime.split(":")[0]),parseInt(this.data.EndTime.split(":")[0]));
  }
  onNoClick(){
    this.dialogRef.close();
  }
  changePrice(){
    this.data.TotalPrice=this.initPrice*this.Timediff(parseInt(this.data.StartTime.split(":")[0]),parseInt(this.data.EndTime.split(":")[0]));
  }
  Timediff(starth:number,endhour:number):number{
    return endhour-starth;
    }
}
// export interface DialogData {
//   animal: string;
//   name: string;
// }
