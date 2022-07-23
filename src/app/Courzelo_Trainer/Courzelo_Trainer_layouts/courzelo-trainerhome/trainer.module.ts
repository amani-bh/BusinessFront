import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
import { SharedTrainerModule } from '../../Shared/shared-trainer.module';
import { AddCourseComponent } from '../../Modules/addCourse/addCourse.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CourseHomeComponent } from '../../Modules/course-home/course-home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatTableModule } from '@angular/material/table';
import { ManageCourseComponent } from '../../Modules/manage-course/manage-course.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { ChooseCourseTypeComponent } from '../../Modules/choose-course-type/choose-course-type.component';
import { CustomCourseComponent } from '../../Modules/custom-course/custom-course.component';
import { FourMatDescriptionComponent } from '../../Modules/four-mat-description/four-mat-description.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPreviewComponent } from '../../Modules/dialog-preview/dialog-preview.component';
import { CustomDescriptionComponent } from '../../Modules/custom-description/custom-description.component';
import { DialogPreviewStudentComponent } from '../../Modules/dialog-preview-student/dialog-preview-student.component';
import { MatRadioModule } from '@angular/material/radio';
import { CourseUpdateComponent } from '../../Modules/course-update/course-update.component';
import { UploaderComponent } from '../../Modules/uploader/uploader.component';
import { UploadTaskComponent } from '../../Modules/upload-task/upload-task.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BloomTaxonomyDescriptionComponent } from '../../Modules/bloom-taxonomy-description/bloom-taxonomy-description.component';
import { CourzeloQuizzHomeModule } from 'src/app/Courzelo_Quizz/Courzelo_layouts/CourzeloQuizzHome/courzelo-quizz-home.module';

@NgModule({
  declarations: [
    TrainerComponent,
    AddCourseComponent,
    ChooseCourseTypeComponent,
    CustomCourseComponent,
    CourseHomeComponent,
    ManageCourseComponent,
    FourMatDescriptionComponent,
    DialogPreviewComponent,
    CustomDescriptionComponent,
    DialogPreviewStudentComponent,
    CourseUpdateComponent,
    UploaderComponent,
    UploadTaskComponent,
    BloomTaxonomyDescriptionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TrainerRoutingModule,
    SharedTrainerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    IvyCarouselModule,
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTreeModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    NgxFileDragDropModule,
    DragDropModule,
    CourzeloQuizzHomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TrainerComponent],
})
export class TrainerModule {}
