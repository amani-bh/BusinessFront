import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Course } from 'src/app/Courzelo_Trainer/Classes/CourseClass';
import { ExtremCourse } from 'src/app/Courzelo_Trainer/Classes/ExtremCourse';

@Injectable({
  providedIn: 'root'
})
export class CourseDataSharedService {
addCourseInfo!:BehaviorSubject<Course>;
addCourseSections!:BehaviorSubject<any>;
addmodelChoosenStatus!:BehaviorSubject<boolean>;
addcustomChoosenStatus!:BehaviorSubject<boolean>;
addSectionsFilesData!:BehaviorSubject<any>;
data!:Course;
sectionsFilesData!:any
sectionsPreview:ExtremCourse[]=[]
modelChoosen!:boolean;
customChoosen!:boolean;
  constructor() {
   this.addCourseInfo=new BehaviorSubject<Course>(this.data);
   this.addCourseSections=new BehaviorSubject<any>(this.sectionsPreview);
this.addmodelChoosenStatus=new BehaviorSubject<boolean>(this.modelChoosen);
this.addcustomChoosenStatus=new BehaviorSubject<boolean>(this.customChoosen);
this.addSectionsFilesData=new BehaviorSubject<any>(this.sectionsFilesData);
   }
}
