import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-member-ship-form',
  templateUrl: './member-ship-form.component.html',
  styleUrls: ['./member-ship-form.component.css']
})
export class MemberShipFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(null, Validators.required),
      address: new FormControl(null,Validators.required),
      city: new FormControl(null,Validators.required),
      country: new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    }, {updateOn: 'submit'}
    )
  }
  ngOnInit() {
    // throw new Error('Method not implemented.');
  }
  onSubmit() {
    console.log(this.formGroup.value);
  }
}
