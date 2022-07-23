import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { CourseService } from '../../Shared/Services/CourseCRUD/course.service';
import { Course } from '../../Classes/CourseClass';
import { KolbPhase } from '../../Classes/KolbPhase';
import { ExtremCourse } from '../../Classes/ExtremCourse';
import { IntrConcluExtremCourse } from '../../Classes/IntrConcluExtremCourse';
import Swal from 'sweetalert2';
import { CustomerExtremCourse } from '../../Classes/CustomerExtremCourse';
import { CustomerPhase } from '../../Classes/CustomerPhase';
import { MatDialog } from '@angular/material/dialog';
import { DialogPreviewComponent } from '../dialog-preview/dialog-preview.component';
import { CourseDataSharedService } from '../../Shared/Services/SharedCourseData/course-data-shared.service';
import { DialogPreviewStudentComponent } from '../dialog-preview-student/dialog-preview-student.component';
import { Observable } from 'rxjs';
import { approvalService } from 'src/app/Courzelo_Quizz/Shared/services/approvalService ';

import { FileValidators } from 'ngx-file-drag-drop';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { User } from 'src/app/Courzelo_Core/Modules/Entity/user';
@Component({
  selector: 'app-course',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css'],
})
export class AddCourseComponent implements OnInit {
  CreateListVerb: string[] = [];
  submitted = false;
  introductionSubmitted = false;
  uploadSubmitted = false;
  introduction!: IntrConcluExtremCourse;
  sections: ExtremCourse[] = [];
  sectionsForTest: ExtremCourse[] = [];
  customerSections: CustomerExtremCourse[] = [];
  conclusion!: IntrConcluExtremCourse;
  data!: Course;

  /* for chips material ui */
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skill = new FormControl();
  outcome = new FormControl();
  prerequist = new FormControl();
  //filesSection=new FormControl();
  filteredFruits!: Observable<string[]>;
  skills: string[] = [];
  outcomes: string[] = [];
  prerequists: string[] = [];
  listFilesIntroduction: any;
  listFilesConclusion: any;
  listUrlsIntroduction: string[] = [];
  listUrlsConclusion: string[] = [];

  listTest: any[] = [];
  allSkills: string[] = ['Javascript', 'HTML', 'CSS', 'SEO', 'Mongo'];
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  /*------end---- */

  /*for forms groups */
  firstFormGroup!: FormGroup;
  outcomesFormGroup!: FormGroup;
  introductionFormGroup!: FormGroup;
  sectionFormGroup!: FormGroup;
  customFormGroup!: FormGroup;
  conclusionFormGroup!: FormGroup;
  quizzTotalFromGroup!: FormGroup;
  publishFromGroup!: FormGroup;
  /*-----end----- */
  modelChoosen!: boolean;
  customChoosen!: boolean;
  step = 0;
  /**introduction */
  listFilesIntroP1: File[] = [];
  listFilesIntroP2: File[] = [];
  listFilesIntroP3: File[] = [];
  listFilesIntroP4: File[] = [];

  xIntroP1: string[][] = [];
  xIntroP2: string[][] = [];
  xIntroP3: string[][] = [];
  xIntroP4: string[][] = [];

  totaIntroP1: any = [];
  totaIntroP2: any = [];
  totaIntroP3: any = [];
  totaIntroP4: any = [];

  finalIntroP1: string[][] = [];
  finalIntroP2: string[][] = [];
  finalIntroP3: string[][] = [];
  finalIntroP4: string[][] = [];
  /**--end */
  /**conclusion */
  listFilesConcluP1: File[] = [];
  listFilesConcluP2: File[] = [];
  listFilesConcluP3: File[] = [];
  listFilesConcluP4: File[] = [];

  xConcluP1: string[][] = [];
  xConcluP2: string[][] = [];
  xConcluP3: string[][] = [];
  xConcluP4: string[][] = [];

  totaConcluP1: any = [];
  totaConcluP2: any = [];
  totaConcluP3: any = [];
  totaConcluP4: any = [];

  finalConcluP1: string[][] = [];
  finalConcluP2: string[][] = [];
  finalConcluP3: string[][] = [];
  finalConcluP4: string[][] = [];

  /**--end */
  /**Course image */

  /**--- end--- */
  /**Section */
  listFilesSecP1: File[][] = [];
  listFilesSecP2: File[][] = [];
  listFilesSecP3: File[][] = [];
  listFilesSecP4: File[][] = [];
  listFilesSecP5: File[][] = [];
  listFilesSecP6: File[][] = [];
  listFilesSecP7: File[][] = [];
  listFilesSecP8: File[][] = [];
  xP1: string[][] = [];
  xP2: string[][] = [];
  xP3: string[][] = [];
  xP4: string[][] = [];
  xP5: string[][] = [];
  xP6: string[][] = [];
  xP7: string[][] = [];
  xP8: string[][] = [];
  totalXP1: any = [];
  totalXP2: any = [];
  totalXP3: any = [];
  totalXP4: any = [];
  totalXP5: any = [];
  totalXP6: any = [];
  totalXP7: any = [];
  totalXP8: any = [];

  finalSecP1: any[] = [];
  finalSecP2: any[] = [];
  finalSecP3: any[] = [];
  finalSecP4: any[] = [];
  finalSecP5: any[] = [];
  finalSecP6: any[] = [];
  finalSecP7: any[] = [];
  finalSecP8: any[] = [];
  /**---end--- */
  /**custom section */
  listFilesCustomP: File[][] = [];
  xCustomP: string[][] = [];
  totalXCustomP: any[] = [];
  finalCustomP: any[] = [];
  finalfinal: any[] = [];
  /**end */
  /**course image */
  courseImageFile: File[] = [];
  urlCourseImage: string[] = [];
  /**--end */
  /**course video */
  courseVideoFile: File[] = [];
  urlCourseVideo: string[] = [];
  /**--end */
  /**current user */
  currentuser: User | any;
  BtnQuizzClicked!: boolean;
  idQuizz: any;
  var!: string;
  BtnTotalQuizzClicked!: boolean;
  /**end */
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  modelChoosenBtn(value: boolean) {
    this.modelChoosen = value;
    this.customChoosen = false;
  }
  customChoosenBtn(value: boolean) {
    this.customChoosen = value;
    this.modelChoosen = false;
  }
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private courseService: CourseService,
    public dialog: MatDialog,
    public shared_Data: CourseDataSharedService,
    private appService: approvalService,
    private tokenService: TokenStorageService
  ) {
    /*for Chips material */
    this.filteredFruits = this.skill.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    );
    /*----end---- */
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.currentuser = this.tokenService.getUser();
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      category: ['', Validators.required],
      outcomes: this._formBuilder.array([], Validators.required),
      description: ['', [Validators.required, Validators.maxLength(100)]],
      details: [
        '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(300),
        ],
      ],
      fruits: this._formBuilder.array([], Validators.required),
    });
    this.outcomesFormGroup = this._formBuilder.group({
      learningOutcomes: this._formBuilder.array([this.outcomeForm]),
    });
    this.introductionFormGroup = this._formBuilder.group({
      introName: ['', Validators.required],
      introductionFormGroup1: this._formBuilder.group({
        name: ['', Validators.required],
        filesIntroPhase1: ['', Validators.required],
      }),
      introductionFormGroup2: this._formBuilder.group({
        name: ['', Validators.required],
        filesIntroPhase2: ['', Validators.required],
      }),
      introductionFormGroup3: this._formBuilder.group({
        name: ['', Validators.required],
        filesIntroPhase3: ['', Validators.required],
      }),
      introductionFormGroup4: this._formBuilder.group({
        name: ['', Validators.required],
        filesIntroPhase4: ['', Validators.required],
      }),
    });

    this.sectionFormGroup = this._formBuilder.group({
      sectionsPhases: this._formBuilder.array([this.sectionForm]),
    });
    this.customFormGroup = this._formBuilder.group({
      customPhases: this._formBuilder.array([]),
    });
    this.conclusionFormGroup = this._formBuilder.group({
      concluName: ['', Validators.required],
      conclusionFormGroup1: this._formBuilder.group({
        name: ['', Validators.required],
        filesConclPhase1: ['', Validators.required],
      }),
      conclusionFormGroup2: this._formBuilder.group({
        name: ['', Validators.required],
        filesConclPhase2: ['', Validators.required],
      }),
      conclusionFormGroup3: this._formBuilder.group({
        name: ['', Validators.required],
        filesConclPhase3: ['', Validators.required],
      }),
      conclusionFormGroup4: this._formBuilder.group({
        name: ['', Validators.required],
        filesConclPhase4: ['', Validators.required],
      }),
    });
    this.quizzTotalFromGroup = this._formBuilder.group({
      quizzTotalId: ['', Validators.required],
      requiredScore: ['', Validators.required],
    });
    this.publishFromGroup = this._formBuilder.group({
      audience: ['', Validators.required],
      prerequisites: this._formBuilder.array([], Validators.required),
      information: ['', Validators.required],
      image: ['', Validators.required],
      video: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.firstFormGroup.controls;
  }
  get s(): { [key: string]: AbstractControl } {
    return this.introductionFormGroup.controls;
  }
  get intro(): { [key: string]: AbstractControl } {
    return this.introductionFormGroup.controls;
  }
  get pub(): { [key: string]: AbstractControl } {
    return this.publishFromGroup.controls;
  }
  onSubmitBegin() {
    this.submitted = true;
    if (this.firstFormGroup.invalid) return;
  }
  onSubmitIntroduction() {
    this.introductionSubmitted = true;
    if (this.introductionFormGroup.invalid) return;
  }
  /*course outcome */
  get outcomesControls(): FormArray {
    return this.firstFormGroup.controls['outcomes'] as FormArray;
  }
  addOutcome(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // const value = (event.value || '').trim();

    // Add our fruit
    if ((value || '').trim()) {
      this.outcomesControls.push(this._formBuilder.control(value));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeOutcome(outcome: string): void {
    const index = this.outcomesControls.value.indexOf(outcome);
    if (index >= 0) {
      this.outcomesControls.removeAt(index);
    }
  }

  /*end course outcome */
  /*course prerequiste */
  get preRequistControls(): FormArray {
    return this.publishFromGroup.controls['prerequisites'] as FormArray;
  }
  addPrerequist(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // const value = (event.value || '').trim();

    // Add our fruit
    if ((value || '').trim()) {
      this.preRequistControls.push(this._formBuilder.control(value));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removePrerequist(outcome: string): void {
    const index = this.preRequistControls.value.indexOf(outcome);
    if (index >= 0) {
      this.preRequistControls.removeAt(index);
    }
  }

  /*end course prerequiste */
  /*for chips material */
  get fruitControls(): FormArray {
    return this.firstFormGroup.controls['fruits'] as FormArray;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // const value = (event.value || '').trim();

    // Add our fruit
    if ((value || '').trim()) {
      this.fruitControls.push(this._formBuilder.control(value));
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: string): void {
    const index = this.fruitControls.value.indexOf(fruit);
    if (index >= 0) {
      this.fruitControls.removeAt(index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruitControls.push(this._formBuilder.control(event.option.viewValue));
    // this.skills.push();
    this.fruitInput.nativeElement.value = '';
    this.skill.setValue(null);
    console.log(this.skills);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter((skill) =>
      skill.toLowerCase().includes(filterValue)
    );
  }
  /*----end chips ---- */
  reset() {
    this.customChoosen = false;
    this.modelChoosen = false;
  }
  sectionForm = this._formBuilder.group({
    sectionName: ['', Validators.required],
    sectionFormGroup1: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup2: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup3: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup4: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup5: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup6: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup7: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    sectionFormGroup8: this._formBuilder.group({
      name: ['', Validators.required],
      filesSection: new FormControl([], [FileValidators.required]),
    }),
    quizzId: ['', Validators.required],
  });
  outcomeForm = this._formBuilder.group({
    comptence: ['', Validators.required],
    targetLevel: ['', Validators.required],
  });
  customForm = this._formBuilder.group({
    sectionName: ['', Validators.required],
    customFormGroup1: this._formBuilder.group({
      name: ['', Validators.required],
      filesCustomPhase: new FormControl([], [FileValidators.required]),
    }),
  });
  /**for learning outcomes */
  get learningOutcomes() {
    return this.outcomesFormGroup.controls['learningOutcomes'] as FormArray;
  }
  addLearningOutcome() {
    const outcomeForm = this._formBuilder.group({
      comptence: [''],
      targetLevel: [''],
    });

    this.learningOutcomes.push(outcomeForm);
  }
  deleteLearningOutcome(i: number) {
    this.learningOutcomes.removeAt(i);
  }
  /**end */
  /**for customer course */
  get customPhases() {
    return this.customFormGroup.get('customPhases') as FormArray;
  }
  addCustomSection() {
    this.customPhases.push(
      this._formBuilder.group({
        sectionName: ['', Validators.required],
        subphases: this._formBuilder.array([]),
      })
    );
  }
  deleteCustomSection(lessonIndex: number) {
    this.customPhases.removeAt(lessonIndex);
  }
  listPhases(sectionIndex: number): FormArray {
    return this.customPhases.at(sectionIndex).get('subphases') as FormArray;
  }
  newPhase(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      filesCustomPhase: new FormControl([], [FileValidators.required]),
    });
  }
  addPhase(sectionIndex: number) {
    this.listPhases(sectionIndex).push(this.newPhase());
  }
  removePhase(sectionIndex: number, phaseIndex: number) {
    this.listPhases(sectionIndex).removeAt(phaseIndex);
  }
  /* end customer course*/
  /**for phase customer course */

  /* end phase customer course*/
  get sectionsPhases() {
    return this.sectionFormGroup.controls['sectionsPhases'] as FormArray;
  }
  addLesson() {
    this.appService.approvalStageMessage.unsubscribe();
    const sectionForm = this._formBuilder.group({
      sectionName: ['', Validators.required],
      sectionFormGroup1: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup2: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup3: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup4: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup5: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup6: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup7: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      sectionFormGroup8: this._formBuilder.group({
        name: ['', Validators.required],
        filesSection: ['', Validators.required],
      }),
      quizzId: ['', Validators.required],
    });

    this.sectionsPhases.push(sectionForm);
  }
  deleteLesson(lessonIndex: number) {
    this.sectionsPhases.removeAt(lessonIndex);
  }
  addQuizzCourse(i: number) {
    this.appService.approvalStageMessage = new BehaviorSubject('');
    this.appService.currentApprovalStageMessage =
      this.appService.approvalStageMessage.asObservable();

    this.BtnQuizzClicked = true;
    this.appService.currentApprovalStageMessage.subscribe((msg) => {
      this.sectionsPhases.controls[i].value.quizzId = msg;

      /*   console.log(this.sectionsPhases.controls[i].value.quizzId);
      console.log(msg); */
    });
  }
  addTotalQuizz() {
    this.BtnTotalQuizzClicked = true;
    //  this.appService.approvalStageMessage.unsubscribe();

    this.appService.approvalStageMessage = new BehaviorSubject('');
    this.appService.currentApprovalStageMessage =
      this.appService.approvalStageMessage.asObservable();

    this.appService.currentApprovalStageMessage.subscribe((msg) => {
      this.quizzTotalFromGroup.controls['quizzTotalId'].setValue(msg);

      /*   console.log(this.sectionsPhases.controls[i].value.quizzId);
      console.log(msg); */
    });
  }
  /* sectionFilesPreview(){
  this.listSectionFiles=[]
  this.sectionFormGroup.value.sectionsPhases.forEach((e:any) => {

    this.listSectionFiles.push(new ExtremCourse(e.sectionName,[
      new KolbPhase(e.sectionFormGroup1.name,e.sectionFormGroup1.img,e.sectionFormGroup1.video,e.sectionFormGroup1.pdf,e.sectionFormGroup1.text),
      new KolbPhase(e.sectionFormGroup2.name,e.sectionFormGroup2.img,e.sectionFormGroup2.video,e.sectionFormGroup2.pdf,e.sectionFormGroup2.text),
      new KolbPhase(e.sectionFormGroup3.name,e.sectionFormGroup3.img,e.sectionFormGroup3.video,e.sectionFormGroup3.pdf,e.sectionFormGroup3.text),
      new KolbPhase(e.sectionFormGroup4.name,e.sectionFormGroup4.img,e.sectionFormGroup4.video,e.sectionFormGroup4.pdf,e.sectionFormGroup4.text),
      new KolbPhase(e.sectionFormGroup5.name,e.sectionFormGroup5.img,e.sectionFormGroup5.video,e.sectionFormGroup5.pdf,e.sectionFormGroup5.text),
      new KolbPhase(e.sectionFormGroup6.name,e.sectionFormGroup6.img,e.sectionFormGroup6.video,e.sectionFormGroup6.pdf,e.sectionFormGroup6.text),
      new KolbPhase(e.sectionFormGroup7.name,e.sectionFormGroup7.img,e.sectionFormGroup7.video,e.sectionFormGroup7.pdf,e.sectionFormGroup7.text),
      new KolbPhase(e.sectionFormGroup8.name,e.sectionFormGroup8.img,e.sectionFormGroup8.video,e.sectionFormGroup8.pdf,e.sectionFormGroup8.text),
    ]))
  });

} */
  /* remplirFiles(){

  this.listTest=[]
  this.sectionFormGroup.value.sectionsPhases.forEach((e:any) => {
    this.listTest=[...this.listTest,
      [e.sectionName,
      [e.sectionFormGroup1.name,e.sectionFormGroup2.name,e.sectionFormGroup3.name,e.sectionFormGroup4.name,e.sectionFormGroup5.name,e.sectionFormGroup6.name,e.sectionFormGroup7.name,e.sectionFormGroup8.name],
      [ e.sectionFormGroup1.img,e.sectionFormGroup1.video,e.sectionFormGroup1.pdf,e.sectionFormGroup1.text,
        e.sectionFormGroup2.img,e.sectionFormGroup2.video,e.sectionFormGroup2.pdf,e.sectionFormGroup2.text,
        e.sectionFormGroup3.img,e.sectionFormGroup3.video,e.sectionFormGroup3.pdf,e.sectionFormGroup3.text,
        e.sectionFormGroup4.img,e.sectionFormGroup4.video,e.sectionFormGroup4.pdf,e.sectionFormGroup4.text,
        e.sectionFormGroup5.img,e.sectionFormGroup5.video,e.sectionFormGroup5.pdf,e.sectionFormGroup5.text,
        e.sectionFormGroup6.img,e.sectionFormGroup6.video,e.sectionFormGroup6.pdf,e.sectionFormGroup6.text,
        e.sectionFormGroup7.img,e.sectionFormGroup7.video,e.sectionFormGroup7.pdf,e.sectionFormGroup7.text,
        e.sectionFormGroup8.img,e.sectionFormGroup8.video,e.sectionFormGroup8.pdf,e.sectionFormGroup8.text]]]

});
} */
  initialiser() {
    /*introduction part */
    let introductionPhases = [
      new KolbPhase(
        this.introductionFormGroup.controls[
          'introductionFormGroup1'
        ].value.name,
        this.finalIntroP1
      ),
      new KolbPhase(
        this.introductionFormGroup.controls[
          'introductionFormGroup2'
        ].value.name,
        this.finalIntroP2
      ),
      new KolbPhase(
        this.introductionFormGroup.controls[
          'introductionFormGroup3'
        ].value.name,
        this.finalIntroP3
      ),
      new KolbPhase(
        this.introductionFormGroup.controls[
          'introductionFormGroup4'
        ].value.name,
        this.finalIntroP4
      ),
    ];
    this.introduction = new IntrConcluExtremCourse(
      this.introductionFormGroup.value.introName,
      introductionPhases
    );
    /*end introduction part */
    /* section part */

    this.sections = [];
    this.sectionFormGroup.value.sectionsPhases.forEach(
      (e: any, index: number) => {
        this.sections.push(
          new ExtremCourse(
            e.sectionName,
            [
              new KolbPhase(e.sectionFormGroup1.name, this.finalSecP1[index]),
              new KolbPhase(e.sectionFormGroup2.name, this.finalSecP2[index]),
              new KolbPhase(e.sectionFormGroup3.name, this.finalSecP3[index]),
              new KolbPhase(e.sectionFormGroup4.name, this.finalSecP4[index]),
              new KolbPhase(e.sectionFormGroup5.name, this.finalSecP5[index]),
              new KolbPhase(e.sectionFormGroup6.name, this.finalSecP6[index]),
              new KolbPhase(e.sectionFormGroup7.name, this.finalSecP7[index]),
              new KolbPhase(e.sectionFormGroup8.name, this.finalSecP8[index]),
            ],
            e.quizzId
          )
        );
      }
    );
    console.log(this.sections);
    /* end section part */
    /* Customer Sections */
    this.customerSections = [];
    this.customFormGroup.value.customPhases.forEach((e: any) => {
      let x: CustomerPhase[] = [];
      e.subphases.forEach((element: any, index: number) => {
        x.push(new CustomerPhase(element.name, this.finalCustomP[index]));
      });
      this.customerSections.push(new CustomerExtremCourse(e.sectionName, x));
    });
    /* end customer sections */
    /*conclusion part */
    let conclusionPhases = [
      new KolbPhase(
        this.conclusionFormGroup.controls['conclusionFormGroup1'].value.name,
        this.finalConcluP1
      ),
      new KolbPhase(
        this.conclusionFormGroup.controls['conclusionFormGroup2'].value.name,
        this.finalConcluP2
      ),
      new KolbPhase(
        this.conclusionFormGroup.controls['conclusionFormGroup3'].value.name,
        this.finalConcluP3
      ),
      new KolbPhase(
        this.conclusionFormGroup.controls['conclusionFormGroup4'].value.name,
        this.finalConcluP4
      ),
    ];
    this.conclusion = new IntrConcluExtremCourse(
      this.conclusionFormGroup.value.concluName,
      conclusionPhases
    );
    /*end conclusion part */
    //this.currentuser.id
    this.data = new Course(
      this.currentuser.id,
      this.firstFormGroup.value.title,
      this.firstFormGroup.value.language,
      this.firstFormGroup.value.category,
      this.firstFormGroup.value.outcomes,
      this.firstFormGroup.value.description,
      this.firstFormGroup.value.details,
      this.firstFormGroup.value.fruits,
      this.introduction,
      this.sections,
      this.customerSections,
      this.conclusion,
      this.publishFromGroup.value.audience,
      this.publishFromGroup.value.prerequisites,
      this.publishFromGroup.value.information,
      this.urlCourseImage[0],
      this.urlCourseVideo[0],
      this.publishFromGroup.value.price,
      70,
      'Pending for validation',
      this.quizzTotalFromGroup.controls['quizzTotalId'].value,
      this.quizzTotalFromGroup.controls['requiredScore'].value
    );
  }

  openDialog() {
    this.initialiser();
    this.shared_Data.addCourseInfo.next(this.data);
    this.shared_Data.addmodelChoosenStatus.next(this.modelChoosen);
    this.shared_Data.addcustomChoosenStatus.next(this.customChoosen);
    const dialogRef = this.dialog.open(DialogPreviewComponent);
    dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
    });
  }

  openDialogPreviewStudent() {
    this.initialiser();
    // this.sectionFilesPreview();
    this.shared_Data.addCourseInfo.next(this.data);
    this.shared_Data.addmodelChoosenStatus.next(this.modelChoosen);
    this.shared_Data.addcustomChoosenStatus.next(this.customChoosen);

    const dialogRef = this.dialog.open(DialogPreviewStudentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
    });
  }
  createCourse() {
    //this.currentuser = this.tokenService.getUser();
    this.initialiser();

    this.courseService.addCourse(this.data).subscribe((data) => {
      console.log(data);
    });

    // console.log(this.sectionFormGroup.value.lessons)
  }
  publishCourse() {
    Swal.fire({
      title: 'Are you sure to publish this course?',
      // text: "You won't be able to revert this!",
      icon: 'question',
      confirmButtonColor: '#07294d',
      cancelButtonColor: 'rgb(111 116 23)',
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createCourse();
        Swal.fire({
          title: 'Course added successfully',
          icon: 'success',
          confirmButtonColor: '#07294d',
        }),
          (err: string) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,
            });
          };
      }
    });
  }

  /**phase1 de l'introduction */
  onValueChangeIntroP1(file: File[]) {
    this.listFilesIntroP1 = file;
    if (file) {
      this.finalIntroP1 = [];
      console.log(this.finalIntroP1);
      console.log(...this.finalIntroP1);
    }
  }
  secIntroP1(f: any, value: any) {
    this.xIntroP1.push(f.name, f.type, value);
    this.totaIntroP1.push(this.xIntroP1);
    this.xIntroP1 = [];
    this.finalIntroP1 = this.totaIntroP1;
    if (this.finalIntroP1.length == this.listFilesIntroP1.length) {
      this.listFilesIntroP1 = [];
      this.totaIntroP1 = [];
    }
  }
  /**----------end---------- */
  /**phase2 de l'introduction */
  onValueChangeIntroP2(file: File[]) {
    this.listFilesIntroP2 = file;
    if (file) {
      this.finalIntroP2 = [];
    }
  }
  secIntroP2(f: any, value: any) {
    this.xIntroP2.push(f.name, f.type, value);
    this.totaIntroP2.push(this.xIntroP1);
    this.xIntroP2 = [];
    this.finalIntroP2 = this.totaIntroP2;
    if (this.finalIntroP2.length == this.listFilesIntroP2.length) {
      this.listFilesIntroP2 = [];
      this.totaIntroP2 = [];
    }
  }
  /**----------end---------- */
  /*phase 3 de l'introduction */
  onValueChangeIntroP3(file: File[]) {
    this.listFilesIntroP3 = file;
    if (file) {
      this.finalIntroP3 = [];
    }
  }
  secIntroP3(f: any, value: any) {
    this.xIntroP3.push(f.name, f.type, value);
    this.totaIntroP3.push(this.xIntroP3);
    this.xIntroP3 = [];
    this.finalIntroP3 = this.totaIntroP3;
    if (this.finalIntroP3.length == this.listFilesIntroP3.length) {
      this.listFilesIntroP3 = [];
      this.totaIntroP3 = [];
    }
  }
  /*-----end------- */
  /*phase 4 de l'introduction */
  onValueChangeIntroP4(file: File[]) {
    this.listFilesIntroP4 = file;
    if (file) {
      this.finalIntroP4 = [];
    }
  }
  secIntroP4(f: any, value: any) {
    this.xIntroP4.push(f.name, f.type, value);
    this.totaIntroP4.push(this.xIntroP4);
    this.xIntroP4 = [];
    this.finalIntroP4 = this.totaIntroP4;
    if (this.finalIntroP4.length == this.listFilesIntroP4.length) {
      this.listFilesIntroP4 = [];
      this.totaIntroP4 = [];
    }
  }
  /*-----end------- */
  /**phase1 du Conclusion  */
  onValueChangeConcluP1(file: File[]) {
    this.listFilesConcluP1 = file;
    if (file) {
      this.finalConcluP1 = [];
    }
  }
  secConcluP1(f: any, value: any) {
    this.xConcluP1.push(f.name, f.type, value);
    this.totaConcluP1.push(this.xConcluP1);
    this.xConcluP1 = [];
    this.finalConcluP1 = this.totaConcluP1;
    if (this.finalConcluP1.length == this.listFilesConcluP1.length) {
      this.listFilesConcluP1 = [];
      this.totaConcluP1 = [];
    }
  }
  /** ------end------- */
  /**phase2 du Conclusion  */
  onValueChangeConcluP2(file: File[]) {
    this.listFilesConcluP2 = file;
    if (file) {
      this.finalConcluP2 = [];
    }
  }
  secConcluP2(f: any, value: any) {
    this.xConcluP2.push(f.name, f.type, value);
    this.totaConcluP2.push(this.xConcluP1);
    this.xConcluP2 = [];
    this.finalConcluP2 = this.totaConcluP2;
    if (this.finalConcluP2.length == this.listFilesConcluP2.length) {
      this.listFilesConcluP2 = [];
      this.totaConcluP2 = [];
    }
  }
  /** ------end------- */
  /**phase3 du Conclusion  */
  onValueChangeConcluP3(file: File[]) {
    this.listFilesConcluP3 = file;
    if (file) {
      this.finalConcluP3 = [];
    }
  }
  secConcluP3(f: any, value: any) {
    this.xConcluP3.push(f.name, f.type, value);
    this.totaConcluP3.push(this.xConcluP3);
    this.xConcluP3 = [];
    this.finalConcluP3 = this.totaConcluP3;
    if (this.finalConcluP3.length == this.listFilesConcluP3.length) {
      this.listFilesConcluP3 = [];
      this.totaConcluP3 = [];
    }
  }
  /** ------end------- */
  /**phase4 du Conclusion  */
  onValueChangeConcluP4(file: File[]) {
    this.listFilesConcluP4 = file;
    if (file) {
      this.finalConcluP4 = [];
    }
  }
  secConcluP4(f: any, value: any) {
    this.xConcluP4.push(f.name, f.type, value);
    this.totaConcluP4.push(this.xConcluP4);
    this.xConcluP4 = [];
    this.finalConcluP4 = this.totaConcluP4;
    if (this.finalConcluP4.length == this.listFilesConcluP4.length) {
      this.listFilesConcluP4 = [];
      this.totaConcluP4 = [];
    }
  }
  /** ------end------- */
  /**Section  */
  onValueChange1(file: File[], i: number) {
    this.listFilesSecP1[i] = file;
    if (file) {
      this.finalSecP1[i] = [];
    }
  }
  onValueChange2(file: File[], i: number) {
    this.listFilesSecP2[i] = file;
    if (file) {
      this.finalSecP2[i] = [];
    }
  }
  onValueChange3(file: File[], i: number) {
    this.listFilesSecP3[i] = file;
    if (file) {
      this.finalSecP3[i] = [];
    }
  }
  onValueChange4(file: File[], i: number) {
    this.listFilesSecP4[i] = file;
    if (file) {
      this.finalSecP4[i] = [];
    }
  }
  onValueChange5(file: File[], i: number) {
    this.listFilesSecP5[i] = file;
    if (file) {
      this.finalSecP5[i] = [];
    }
  }
  onValueChange6(file: File[], i: number) {
    this.listFilesSecP6[i] = file;
    if (file) {
      this.finalSecP6[i] = [];
    }
  }
  onValueChange7(file: File[], i: number) {
    this.listFilesSecP7[i] = file;
    if (file) {
      this.finalSecP7[i] = [];
    }
  }
  onValueChange8(file: File[], i: number) {
    this.listFilesSecP8[i] = file;
    if (file) {
      this.finalSecP8[i] = [];
    }
  }
  secP1(f: any, value: any, i: number) {
    this.xP1.push(f.name, f.type, value);
    this.totalXP1.push(this.xP1);
    this.xP1 = [];
    this.finalSecP1[i] = this.totalXP1;
    if (this.finalSecP1[i].length == this.listFilesSecP1[i].length) {
      this.listFilesSecP1[i] = [];
      this.totalXP1 = [];
    }
  }
  secP2(f: any, value: any, i: number) {
    this.xP2.push(f.name, f.type, value);
    this.totalXP2.push(this.xP2);
    this.xP2 = [];
    this.finalSecP2[i] = this.totalXP2;
    if (this.finalSecP2[i].length == this.listFilesSecP2[i].length) {
      this.listFilesSecP2[i] = [];
      this.totalXP2 = [];
    }
  }
  secP3(f: any, value: any, i: number) {
    this.xP3.push(f.name, f.type, value);
    this.totalXP3.push(this.xP3);
    this.xP3 = [];
    this.finalSecP3[i] = this.totalXP3;
    if (this.finalSecP3[i].length == this.listFilesSecP3[i].length) {
      this.listFilesSecP3[i] = [];
      this.totalXP3 = [];
    }
  }
  secP4(f: any, value: any, i: number) {
    this.xP4.push(f.name, f.type, value);
    this.totalXP4.push(this.xP4);
    this.xP4 = [];
    this.finalSecP4[i] = this.totalXP4;
    if (this.finalSecP4[i].length == this.listFilesSecP4[i].length) {
      this.listFilesSecP4[i] = [];
      this.totalXP4 = [];
    }
  }
  secP5(f: any, value: any, i: number) {
    this.xP5.push(f.name, f.type, value);
    this.totalXP5.push(this.xP5);
    this.xP5 = [];
    this.finalSecP5[i] = this.totalXP5;
    if (this.finalSecP5[i].length == this.listFilesSecP5[i].length) {
      this.listFilesSecP5[i] = [];
      this.totalXP5 = [];
    }
  }
  secP6(f: any, value: any, i: number) {
    this.xP6.push(f.name, f.type, value);
    this.totalXP6.push(this.xP6);
    this.xP6 = [];
    this.finalSecP6[i] = this.totalXP6;
    if (this.finalSecP6[i].length == this.listFilesSecP6[i].length) {
      this.listFilesSecP6[i] = [];
      this.totalXP6 = [];
    }
  }
  secP7(f: any, value: any, i: number) {
    this.xP7.push(f.name, f.type, value);
    this.totalXP7.push(this.xP7);
    this.xP7 = [];
    this.finalSecP7[i] = this.totalXP7;
    if (this.finalSecP7[i].length == this.listFilesSecP7[i].length) {
      this.listFilesSecP7[i] = [];
      this.totalXP7 = [];
    }
  }
  secP8(f: any, value: any, i: number) {
    this.xP8.push(f.name, f.type, value);
    this.totalXP8.push(this.xP8);
    this.xP8 = [];
    this.finalSecP8[i] = this.totalXP8;
    if (this.finalSecP8[i].length == this.listFilesSecP8[i].length) {
      this.listFilesSecP8[i] = [];
      this.totalXP8 = [];
    }
  }
  /** ------end------- */
  /**custom Section  */
  onValueChangeCutom(file: File[], i: number, j: number) {
    this.listFilesCustomP[j] = file;
    console.log(this.listFilesCustomP[j]);
    if (file) {
      //this.finalCustomP[j] = [];
      //this.listFilesCustomP[i] = [];
      // this.listFilesCustomP[j] = [];
    }
  }
  secCustomP(f: any, value: any, i: number, j: number) {
    this.xCustomP.push(f.name, f.type, value);
    this.totalXCustomP.push(this.xCustomP);
    this.xCustomP = [];
    this.finalCustomP.push([[]]);
    this.finalCustomP[i][j] = this.totalXCustomP;

    // this.totalXCustomP = [];
    // this.totalXCustomP = [];
    //  this.finalfinal = [...this.finalfinal, ...this.finalCustomP];
    //this.finalCustomP = [];
    if (this.totalXCustomP.length == this.listFilesCustomP[j].length) {
      // this.finalCustomP[i] = [];
      console.log('done');
      //this.finalCustomP[j] = [];
      this.totalXCustomP = [];
      this.listFilesCustomP[j] = [];
      //   this.finalCustomP = [];
    }
  }
  test2() {
    console.log(this.finalCustomP);
  }
  /**end */
  /** Course Image */
  onValueChangeCourseImage(file: File[]) {
    this.courseImageFile = file;
    if (file) {
      this.urlCourseImage = [];
    }
  }
  secCourseImage(value: any) {
    this.urlCourseImage.push(value);
    if (this.courseImageFile.length == this.urlCourseImage.length) {
      this.courseImageFile = [];
    }
  }
  /**----end---- */
  /** Course Video */
  onValueChangeCourseVideo(file: File[]) {
    this.courseVideoFile = file;
    if (file) {
      this.urlCourseVideo = [];
    }
  }
  secCourseVideo(value: any) {
    this.urlCourseVideo.push(value);
    if (this.courseVideoFile.length == this.urlCourseVideo.length) {
      this.courseVideoFile = [];
    }
  }
  /**----end---- */
  test() {
    console.log(this.quizzTotalFromGroup.value);
  }
}
