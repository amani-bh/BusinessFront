import { Component,OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-course-type',
  templateUrl: './choose-course-type.component.html',
  styleUrls: ['./choose-course-type.component.css']
})
export class ChooseCourseTypeComponent implements OnInit {
  @Output()modelChoosenEvent = new EventEmitter<boolean>();
   modelChoosen=false;

   @Output() customChoosenEvent = new EventEmitter<boolean>();
   customChoosen=false;
  constructor() { }

  ngOnInit(): void {
  }
  modelChoosenBtn(value: boolean){
    this.modelChoosenEvent.emit(!value);


  }
  customChoosenBtn(value: boolean){
    this.customChoosenEvent.emit(!value);

  }
}
