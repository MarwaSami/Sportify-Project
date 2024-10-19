import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css'],

})
export class DialogModalComponent {
  constructor(public dialogRef: MatDialogRef<DialogModalComponent>,
    @Inject(MAT_DIALOG_DATA)  public  data:  {title:string, msg:string,rate:string}
  ) {

  }
  onNoClick(){
    this.dialogRef.close();
  }
}
// export interface DialogData {
//   animal: string;
//   name: string;
// }
