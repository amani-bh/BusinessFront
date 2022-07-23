import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../Classes/CourseClass';
import { ExtremCourse } from '../../Classes/ExtremCourse';
import { CourseDataSharedService } from '../../Shared/Services/SharedCourseData/course-data-shared.service';

@Component({
  selector: 'app-dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css'],
})
export class DialogPreviewComponent implements OnInit {
  addCourseInfoSubscription!: Subscription;
  addModelChoosenSubscription!: Subscription;
  addCustomChoosenSubscription!: Subscription;
  data!: Course;
  sectionsPreview: ExtremCourse[] = [];
  introductionPhases: any;
  introductionName!: any;
  conclusionName!: any;
  conclusionPhases!: any;
  modelChoosen!: boolean;
  customChoosen!: boolean;
  sectionsLength!: number;
  customersectionslength!: number;

  constructor(private shared_Data: CourseDataSharedService) {}

  ngOnInit(): void {
    this.addCourseInfoSubscription = this.shared_Data.addCourseInfo.subscribe(
      (val: Course) => {
        this.shared_Data.data = val;
        this.data = this.shared_Data.data;
        console.log(this.data);
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
    // this.sectionsLength=this.data.sections.length
    // this.customersectionslength=this.data.customerSections.length
    this.introductionName = Object.values(this.data.introduction)[0];
    this.introductionPhases = Object.values(this.data.introduction)[1];
    this.conclusionName = Object.values(this.data.conclusion)[0];
    this.conclusionPhases = Object.values(this.data.conclusion)[1];
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
    //window.location.reload();
  }
}
