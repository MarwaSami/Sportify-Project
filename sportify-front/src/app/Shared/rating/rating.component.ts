import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit ,OnChanges {
  @Input() Value :number = 0
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }
  getloop(){
    let loop = []
    for (let i=0;i<this.Value;i++){
      loop.push(true)
    }
    return loop
  }
  getActive(){
    let loop = []
    for (let i=0;i < (5-this.Value);i++){
      loop.push(true)
    }
    return loop
  }

    
  

}
