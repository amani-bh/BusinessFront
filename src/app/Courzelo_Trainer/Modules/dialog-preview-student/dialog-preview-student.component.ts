import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Course } from '../../Classes/CourseClass';
import { CustomerPhase } from '../../Classes/CustomerPhase';
import { KolbPhase } from '../../Classes/KolbPhase';
import { CourseDataSharedService } from '../../Shared/Services/SharedCourseData/course-data-shared.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dialog-preview-student',
  templateUrl: './dialog-preview-student.component.html',
  styleUrls: ['./dialog-preview-student.component.css'],
})
export class DialogPreviewStudentComponent implements OnInit {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];
  checkGroup!: FormGroup;

  addCourseInfoSubscription!: Subscription;
  addModelChoosenSubscription!: Subscription;
  addCustomChoosenSubscription!: Subscription;
  data!: Course;
  introductionPhases: any;
  introductionName!: any;
  conclusionName!: any;
  conclusionPhases!: any;
  modelChoosen!: boolean;
  customChoosen!: boolean;
  tab: [] = [];
  constructor(private shared_Data: CourseDataSharedService) {}

  ngOnInit(): void {
    this.addCourseInfoSubscription = this.shared_Data.addCourseInfo.subscribe(
      (val: Course) => {
        this.shared_Data.data = val;
        this.data = this.shared_Data.data;
      }
    );

    this.addModelChoosenSubscription =
      this.shared_Data.addmodelChoosenStatus.subscribe((val: boolean) => {
        this.shared_Data.modelChoosen = val;
        this.modelChoosen = this.shared_Data.modelChoosen;
      });
    this.addCustomChoosenSubscription =
      this.shared_Data.addcustomChoosenStatus.subscribe((val: boolean) => {
        this.shared_Data.customChoosen = val;
        this.customChoosen = this.shared_Data.customChoosen;
      });
    this.introductionName = Object.values(this.data.introduction)[0];
    this.introductionPhases = Object.values(this.data.introduction)[1];
    this.conclusionName = Object.values(this.data.conclusion)[0];
    this.conclusionPhases = Object.values(this.data.conclusion)[1];

    console.log(Object.values(this.introductionPhases[0]['urlsPhase'][0])[2]);
  }

  ngOnDestroy(): void {
    if (this.addCourseInfoSubscription) {
      this.addCourseInfoSubscription.unsubscribe();
    }
    if (this.addModelChoosenSubscription) {
      this.addModelChoosenSubscription.unsubscribe();
    }
    if (this.addCustomChoosenSubscription) {
      this.addCourseInfoSubscription.unsubscribe();
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  checkIntroduction($event: any, item: any, index: number): void {
    /*
                  if ($event.target.checked) {
                    this.listIntroduction=[item];
                  }
                  else
                      { this.listIntroduction=[]} */
  }

  image() {
    /*  let reader = new FileReader();
    reader.readAsDataURL(this.listSections[0].image);
     reader.onload=(event:any)=>{
    this.urlImage=event.target.result
   } */
  }
  video() {
    /*   let reader = new FileReader();
    reader.readAsDataURL(this.listSections[0].video);
     reader.onload=(event:any)=>{
    this.urlVideo=event.target.result
   }
 */
  }
  pdf() {
    /*
    let reader = new FileReader();
    reader.readAsDataURL(this.listSections[0].pdf);
    reader.onload = (e: any) => {
      this.urlPdf.push({
        content: e.target.result
      });
   } */
  }
  text() {
    /*  let reader = new FileReader();
    reader.readAsDataURL(this.listSections[0].text);
     reader.onload=(event:any)=>{
    this.urlText=event.target.result
   } */
  }
  checkSections($event: any, item: KolbPhase, index: number): void {
    /*   if ($event.target.checked) {
      this.listSections=[item];
this.image()
this.video()
this.pdf()
this. text()
//this.urlVideo=this.testss(this.listSections[0].video)
       console.log(this.listSections)
    }
else
{ */
    // this.listSections[index]=new KolbPhase();
  }
}
