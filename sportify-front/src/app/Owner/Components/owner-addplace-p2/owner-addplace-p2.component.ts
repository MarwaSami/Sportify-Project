import { EditplaceService } from './../../Services/editplace.service';
import { FacilitesService } from '../../../Shared/Services/facilites.service';
import { AfterViewInit, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../../Services/form-data.service';
import { Router } from '@angular/router';
import { IFacilities } from '../../../Shared/ViewModels/IFacilities';
import { Icategory } from '../../../Shared/ViewModels/Icategory';
import { CategoriesService } from '../../../Shared/Services/categories.service';
import { PlacesService } from 'src/app/Shared/Services/places.service';
import { Iplace } from 'src/app/Shared/ViewModels/IPlace';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-owner-addplace-p2',
  templateUrl: './owner-addplace-p2.component.html',
  styleUrls: ['./owner-addplace-p2.component.css', '../owner-addplace/owner-addplace.component.css']
})
export class OwnerAddplaceP2Component implements AfterViewInit {
  // form Group,controls and form data variable
  Place_Facit_category: FormGroup;
  data: FormData = new FormData;;
  // variable for form validations
  haveAttach: boolean = false;
  havecate: boolean = false;
  errorvalue: string = '';
  // variables for get facilites,categories, cateindex
  Facilitelem: Array<IFacilities> = [];
  Categorieselem: Array<Icategory> = [];
  Categoriescard: Array<Icategory>;
  category_index: number = 0;
  // for edited page
  place: Iplace = this.Placeser.setdefaultPlace();
  isedited: boolean = false;
  formdata: FormData = new FormData()
  // end of variables
  constructor(private Builder: FormBuilder, private setdata: FormDataService, private route: Router, private FacilitesService: FacilitesService
    , private cateser: CategoriesService, private EditService: EditplaceService
    , private Placeser: PlacesService) {
      this.EditService.GetPlace().subscribe(
        result=>{this.place=result;
          if (this.place.id != 0) {
            this.isedited = true
            this.haveAttach = true;
            this.havecate = true;
            this.data.append('CategoryID', (String)(this.place.categoryID))
            for (let i = 0; i < this.place.attachments.length; i++) {
            this.formdata.append(`Attachments`, this.place.attachments[i])

          }}
        });
      this.getFacilitesandCategories()
// initalize for get facilites,categories, cateinde
this.Place_Facit_category = this.Builder.group(
  {
    Facilities_ids: this.Builder.array([]),
  })
//------------------------------------------------------------------------------------Here
this.Categoriescard = []
  }
ngAfterViewInit(): void {
  let element = document.getElementsByClassName('form-select')[0] as HTMLSelectElement;
  console.log(element,this.place);
  for (let i = 0; i < element.options.length; i++) {
    if (element.options[i].value == this.place.categoryID.toString()) {
      console.log(element.options[i].selected, element.options[i].selected);
      element.options[i].selected = true;
      break;
    }
  }
}
// Get Facilites and categories from API
getFacilitesandCategories() {
  this.cateser.getAll.subscribe(
    result => {
      if (result.isSuccceed) {
        //console.log(result.data);
        this.Categorieselem = result.data;
        this.Categoriescard = this.getcategory();
      }
    }
  );
  this.FacilitesService.getAll.subscribe(
    result => {
      if (result.isSuccceed) {
        this.Facilitelem = result.data
        this.Place_Facit_category = this.Builder.group(
          {
            Facilities_ids: this.Builder.array(this.Facilites()),
          })
      }

    }
  )
}
  get facilitesList() {
  return this.Place_Facit_category.controls["Facilities_ids"] as FormArray
}
getcategory(): Array < Icategory > {
  return [this.Categorieselem[this.category_index], this.Categorieselem[++this.category_index]]
}

Facilites(): Array < FormControl > {
  let FAcarrContr: Array<FormControl> = []
    let isexist: boolean = false;
  for(let i of this.Facilitelem) {
  if (this.isedited) {
    for (let j = 0; j < this.place.facilities_ids.length; j++) {
      if (i.id == this.place.facilities_ids[j]) {
        FAcarrContr.push(this.Builder.control(true,))
        isexist = true;
        break;
      }
    }
    if (!isexist) {
      FAcarrContr.push(this.Builder.control(false,))
    }
    isexist = false;
  }
  else {
    FAcarrContr.push(this.Builder.control(false,))
  }
}
return FAcarrContr
  }
upload(file: any) {
  this.haveAttach = true
  if (file.files.length == 0) {
    return;
  }
  if (this.isedited) {
      this.data.delete(`Attachments`)
  }
  for (var i = 0; i < file.files.length; i++) {

    this.formdata.append('file', <File>file.files[i], file.files[i].name);
  }
}
//  go up and down in category
goup(event: Event) {
  event.preventDefault();
  if ((this.category_index + 2) < this.Categorieselem.length) {
    this.category_index++;
  }
  else {
    this.category_index = 0;
  }
  this.Categoriescard = this.getcategory()
}
godown() {
  if ((this.category_index - 2) > 0) {
    this.category_index -= 3;
  }
  else {
    this.category_index = this.Categorieselem.length - 2;
  }
  this.Categoriescard = this.getcategory()
}
// selected category
selectedcategory(elem: any) {
  if (this.havecate == false) {
    this.havecate = true;
    this.data.append('CategoryID', (String)(elem.id))
  }
  else if (this.data.get('CategoryID') == (String)(elem.id) && !this.isedited) {
    this.havecate = false;
    this.data.delete('CategoryID')
  }
  // cateogry in edited case
  if (this.isedited) {
    console.log(elem.target.value);
    this.data.append('CategoryID', elem.target.value)
  }
}
// show attahcment in edit
Showattachment(e: any) {
  let element = document.getElementsByClassName("Hide")[0] as HTMLInputElement;
  if (e.target.checked) {
    element.classList.add("d-flex");
  }
  else {
    element.classList.remove("d-flex");
  }
}

// sumbit
send() {
  if (this.haveAttach == false && this.havecate == false) {
    this.errorvalue = 'you must add an input'
  }
  else if (this.haveAttach == false) {
    this.errorvalue = 'You must add an attachment'
  }
  else if (this.havecate == false) {
    this.errorvalue = 'You must add a category '
  }
  else {

    for (const key in this.Place_Facit_category.controls) {
      this.data.append(key, this.Place_Facit_category.controls[key].value)
    }
    let sendAttach: boolean = true;
    this.data.forEach(
      (value, k) => {
        if (k == 'Facilities_ids') {
          let strval: string = value.toString()
          let arraval = strval.split(',')
          for (let i = 0; i < arraval.length; i++) {
            if (JSON.parse(arraval[i]) == true) {
              this.formdata.append("Facilities_ids", this.Facilitelem[i].id.toString())
            }
          }
        }
        else if (value != '') {
          if (k == 'CategoryID')
            this.formdata.append('CategoryID', value);
        }
      }
    );
    this.setdata.setFormData(this.formdata)
    this.route.navigateByUrl('/Owner/addplace/P3')
  }
}
}
