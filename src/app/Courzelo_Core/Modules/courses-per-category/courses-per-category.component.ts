import { Component,OnInit,ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { CourseService } from 'src/app/Courzelo_Trainer/Shared/Services/CourseCRUD/course.service';

@Component({
  selector: 'app-courses-per-category',
  templateUrl: './courses-per-category.component.html',
  styleUrls: ['./courses-per-category.component.css']
})

export class CoursesPerCategoryComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  isExpanded=false;
  coursesList:any;
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
        this.courseService.getAllCourses().subscribe(
          data => {this.coursesList=data;},
          err => {console.log(err);}
        );
  }
/* toggle slidebar*/
  toggle(){
      this.isExpanded = !this.isExpanded;
      if(this.isExpanded ){
        this.accordion.openAll();
      }else{
       this.accordion.closeAll();
      }
         }
}
