import { APIResult } from 'src/app/Shared/ViewModels/APIResult';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../models/pagination';
import { ITrainerCard } from 'src/app/Customer/ViewModels/ITrainer-Filter';
import { ITFilter } from 'src/app/Customer/ViewModels/ITFilter';
import { ISearchTrainer } from 'src/app/Customer/ViewModels/ITSearch';
import { PaginationViewModel } from 'src/app/Shared/ViewModels/PaginationViewModel';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  constructor(private Http: HttpClient) { }

  GetTrainers(pageSize: number = 20, pageIndex: number = 1) {
    return this.Http.get<Pagination<ITrainerCard>>(`https://localhost:59528/TrainerCard/GetAll?pageSize=${pageSize}&pageIndex=${pageIndex}`)
  }
  FilterTrainer(filter: ITFilter) {
    return this.Http.post<APIResult<PaginationViewModel<ITrainerCard>>>(`https://localhost:59528/Trainer/Filter`, filter)
  }
  SearchTrainer(search: ISearchTrainer) {
    return this.Http.post<APIResult<PaginationViewModel<ITrainerCard>>>(`https://localhost:59528/Trainer/Search`, search)
  }
  GetCities() {
    return this.Http.get<APIResult<Array<string>>>(`https://localhost:59528/Trainer/TrainerCities`)
  }

}
