import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestsService } from '../../Shared/services/Tests.service';
import Swal from "sweetalert2";
import { Question } from '../../Shared/entities/PrehiringTests';
import { MatStepper } from '@angular/material/stepper';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-test-dialog',
  templateUrl: './add-test-dialog.component.html',
  styleUrls: ['./add-test-dialog.component.css']
})


export class AddTestDialogComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  newFormGroup!: FormGroup;
  finish = false;
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
  state = false;
  idTest: any;
  questions!: Question[];
  currentBusiness: any;
  id: any
  constructor(private _location: Location, private testsService: TestsService, private fb: FormBuilder, private businesstokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {

    this.currentBusiness = this.businesstokenStorage.getUser()
    this.firstFormGroup = this.fb.group({

      title: ['', Validators.required],
      creationDate: [new Date(), Validators.required],
      intro: ['', Validators.required],
      randomOrder: [false],

    })

    this.firstFormGroup.get("creationDate")?.setValue(new Date());

    this.newFormGroup = this.fb.group({
      questions: this.fb.array([]),
    })

    this.addMore();

  }

  Questions(): FormArray {
    return this.newFormGroup.get("questions") as FormArray
  }


  newQuestion(): FormGroup {
    return this.fb.group({
      questionId: [],
      questionLabel: ['', Validators.required],
      falseResponses: [[],],
      correctResponses: [[],],
      score: [10, Validators.required],
      time: [1, Validators.required],
      typeQ: ['', Validators.required],
      responses: this.fb.array([]),
    })

  }

  addMore() {
    this.Questions().push(this.newQuestion());
    this.addMoreResponse(this.Questions().length - 1);
  }

  removeQuestion(i: number) {
    this.Questions().removeAt(i);

  }

  Responses(i: any): FormArray {
    var q = this.newFormGroup.get("questions") as FormArray
    return q.at(i).get("responses") as FormArray

  }

  newResponse(): FormGroup {
    return this.fb.group({
      state: [false, Validators.required],
      label: ['', Validators.required],
    })
  }


  addMoreResponse(i: any) {
    //console.log(this.newFormGroup.get("questions"))
    this.Responses(i).push(this.newResponse())
  }


  removeResponse(i: any, j: number) {
    this.Responses(i).removeAt(j);
  }




  AddTest() {

    if (this.firstFormGroup.invalid) {
      this.validateAllFormFields(this.firstFormGroup);
    }
    else if (this.firstFormGroup.valid) {
      console.log(this.currentBusiness.idBusiness)
      this.testsService.PostTest(this.firstFormGroup.value,this.currentBusiness.idBusiness)
        .subscribe(
          res => {
            this.idTest = res.idPrehiringTest;

            Swal.fire({
              title: 'test created successufly ! Next add your questions',
              icon: 'success',
              confirmButtonColor: '#07294d'
            })
            this.stepper.next();
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,

            })

          })
    }
  }





  Done() {

    //console.log(this.newFormGroup.value.questions)
    if (this.Questions().valid && this.VerifyAllQ()) {
      Swal.fire({
        title: 'Are u sure ?',
        text: "all the questions will be added to the test !",
        icon: 'warning',
        confirmButtonColor: '#07294d',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < this.Questions().length; i++) {
            this.AddQuestion(this.Questions().at(i));

          }
          Swal.fire({
            title: 'Questions added successfuly ! Your test is now ready to use , link it to your job offers or send it to your candidates',
            icon: 'success',
            confirmButtonColor: '#07294d'
          }).then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => {
                this.GetQuestion(this.idTest);
                //this.questions=this.Questions().value
                this.stepper.next();
              }, 0);
            }
          })
        }
      })
    }
    else {
      for (let i = 0; i < this.Questions().length; i++) {
        this.validateAllFormFields(this.Questions().at(i) as FormGroup);
        this.validateAllFormFields(this.Questions().at(i).get("responses") as FormGroup);
      }
    }
  }


  AddQuestion(form: any) {


    if (form.invalid) {
      this.validateAllFormFields(form);
      //this.validateAllFormFields(form.get('responses') as FormGroup);
    }
    else if (form.valid) {

      for (let i = 0; i < form.get('responses').length; i++) {
        if (form.get('responses').at(i).get('state').value === true) {
          form.get('correctResponses').value.push(form.get('responses').at(i).get("label")?.value)
        }
        else if (form.get('responses').at(i).get('state').value === false) {
          form.get('falseResponses').value.push(form.get('responses').at(i).get("label")?.value)
        }


      }

      if (form.get('correctResponses').value.length < 2 && form.get('typeQ') == "Multiple choice" && form.get('falseResponses').value.length < 1) {
        Swal.fire({
          icon: 'error',
          title: 'its a multiple choice question ! check again your selection',
          text: 'Something went wrong! '
        })
      }

      else if (form.get('correctResponses').value.length != 1 && form.get('typeQ').value == "Single choice" && form.get('falseResponses').value.length < 1) {
        Swal.fire({
          icon: 'error',
          title: 'its a single choice question ! check again your selection',
          text: 'Something went wrong! '
        })
      }
      else if ((form.get('correctResponses').value.length == 1 && form.get('typeQ').value == "Single choice") || (form.get('correctResponses').value.length > 1 && form.get('typeQ').value == "Multiple choice")) {

      }

      this.testsService.AddQuestion(this.idTest, form.value)
        .subscribe(
          res => {
            console.log(res);
            form.value.questionId = res.questions[res.questions.length - 1].questionId


          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,
            })
          })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something is wrong with ur selection ! '
      })
    }

  }


  GetQuestion(idTest: any) {
    this.testsService.GetQuestions(idTest).subscribe(data => {
      this.questions = data;
      console.log(this.Questions())
    }, err => {
      // console.log(err);
    })

  }


  DeleteQuestion(questionId: any, i: any) {
    this.removeQuestion(i);
    this.testsService.DeleteQuestions(this.idTest, questionId).subscribe(res => {
      this.GetQuestion(this.idTest);
    }
    )
  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      //console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  Reset(form: any) {
    form.reset();
  }


  verifFalse(q: any): boolean {
    let nbC = 0
    let nbF = 0


    for (let i = 0; i < q.value.responses.length; i++) {
      if (q.value.responses.at(i).state == true) { nbC++ }
      else if (q.value.responses.at(i).state == false) { nbF++ }
    }
    if (nbF > 0) { return true }
    else { return false }
  }

  verifMulti(q: any): boolean {
    let nbC = 0
    let nbF = 0


    for (let i = 0; i < q.value.responses.length; i++) {
      if (q.value.responses.at(i).state == true) { nbC++ }
      else if (q.value.responses.at(i).state == false) { nbF++ }
    }
    if (q.value.typeQ == "Multiple choice" && nbC > 1 && nbF > 0) { return true }
    else { return false }
  }

  verifSingle(q: any): boolean {
    let nbC = 0
    let nbF = 0

    //console.log(q)
    for (let i = 0; i < q.value.responses.length; i++) {
      if (q.value.responses.at(i).state == true) { nbC++ }
      else if (q.value.responses.at(i).state == false) { nbF++ }
    }
    if (q.value.typeQ == "Single choice" && nbC == 1 && nbF > 0) { return true }
    else { return false }
  }


  VerifyAllQ(): boolean {

    var nbT = 0
    //console.log(this.Questions().controls[0].value)
    for (let question of this.Questions().controls) {
      if ((this.verifSingle(question) && (question.value.typeQ == "Single choice") && this.verifFalse(question))) {
        nbT++

      }
      else if (this.verifMulti(question) && (question.value.typeQ == "Multiple choice") && this.verifFalse(question)) {
        nbT++
      }


    }

    if (nbT == this.Questions().length) { return true }
    else return false


  }

  shuffle(list: Array<any>) {
    return list.reduce((p, n) => {
      const size = p.length;
      const index = Math.trunc(Math.random() * (size - 1));
      p.splice(index, 0, n);
      return p;
    }, []);
  };


  backClicked() {
    //this.appService.updateApprovalMessage( {'j':'hiiii5'});
    this._location.back();
  }


}




