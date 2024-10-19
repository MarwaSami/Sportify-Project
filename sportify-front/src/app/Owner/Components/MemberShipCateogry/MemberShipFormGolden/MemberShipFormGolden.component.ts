import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-MemberShipFormGolden',
  templateUrl: './MemberShipFormGolden.component.html',
  styleUrls: ['./MemberShipFormGolden.component.css']
})
export class MemberShipFormGoldenComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private router:Router) {
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