import { Injectable } from '@angular/core';
import { ICard } from '../ViewModels/ICard';
import { Services } from '../ViewModels/ServicesEnum';
@Injectable({
  providedIn: 'root',
})
export class PitchService {
  constructor() {}

  PitchCard: Array<ICard> = [
    {
      id: 1,
      Img: 'https://images.pexels.com/photos/6675925/pexels-photo-6675925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      Name: 'Elakkad-Soccer-Pitch',
      service: [1,2],
      price: 500,
    },
    {
      id: 3,
      Img: 'https://images.pexels.com/photos/6675925/pexels-photo-6675925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      Name: 'Elakkad-Soccer-Pitch',
      service: [1,4],
      price: 500,
    },
    {
      id: 4,
      Img: '/src/assets/images/footbal.jpeg',
      Name: 'Elakkad-Soccer-Pitch',
      service: [1,3],
      price: 500,
    },
    {
      id: 5,
      Img: '/src/assets/images/footbal.jpeg',
      Name: 'Elakkad-Soccer-Pitch',
      service: [3,4],
      price: 500,
    },
    {
      id: 2,
      Img: '/src/assets/images/footbal.jpeg',
      Name: 'Elnasr-Tennis-Court',
      service: [3,5],
      price: 500,
    },
  ];
}
