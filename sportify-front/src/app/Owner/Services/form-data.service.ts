import { EditplaceService } from './editplace.service';
import { Iplace } from '../../Shared/ViewModels/IPlace';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  addpformdata: FormData= new FormData();
  constructor(private Http: HttpClient, private editser: EditplaceService) {
  //this.addpformdata= new FormData();
  }
  setFormData(data: FormData): void {
    data.forEach((value,key)=>{
      this.addpformdata.append(key.toString(),value)
  })
  }
  getFormData(): FormData {
    return this.addpformdata
  }
//   uploadAttachment(File:any): Observable<APIResult<Array<string>>> {
// // let header = new HttpHeaders({
// //   "Content-Type":"multipart/form-data; boundary=----WebKitFormBoundarymx2fSWqWSd0OxQqq"
// // })
//     // console.log(header);
//     return this.Http.post<APIResult<Array<string>>>(`https://localhost:59528/Upload`,File)
//   }
  addPlace():Observable<APIResult<string>> {
    return this.Http.post<APIResult<string>>("https://localhost:59528/Place/AddPlace", this.getFormData())
  }
 // For Edit
  updatePlace() :Observable<APIResult<string>>{
     return this.Http.post<APIResult<string>>("https://localhost:59528/Place/EditPlace", this.getFormData());
  }

}
