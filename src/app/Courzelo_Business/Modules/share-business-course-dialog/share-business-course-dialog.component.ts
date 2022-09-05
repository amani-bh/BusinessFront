import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Business } from '../../Shared/entities/Business';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';

@Component({
  selector: 'app-share-business-course-dialog',
  templateUrl: './share-business-course-dialog.component.html',
  styleUrls: ['./share-business-course-dialog.component.css']
})
export class ShareBusinessCourseDialogComponent implements OnInit {
  subAccounts!: Business[];
  selectedAccounts:any[] = []
  idCourse:any;

  constructor(
    public dialogRef: MatDialogRef<ShareBusinessCourseDialogComponent>,
    private fb: FormBuilder,
    private businessAuthService: BusinessAuthService,
    private businesstokenStorage: BusinessTokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.getAllSubAccount();

  }

  ngOnInit(): void {
    this.idCourse=this.data.message
  }

  getAllSubAccount() {
    this.businessAuthService
      .GetAllSubAccount(this.businesstokenStorage.getUser().idBusiness)
      .subscribe(
        (data) => {
          this.subAccounts = data;
          
        },
        (err) => {
          console.log(err);
        }
      );
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
  

  // when checkbox change, add/remove the item from the array
  onChange(checked: any, item: any){
    if(checked){
    this.selectedAccounts.push(item);
    } else {
      this.selectedAccounts.splice(this.selectedAccounts.indexOf(item), 1)
    }

    console.log("***list ",this.selectedAccounts)

}
send(){
  for(var account of this.selectedAccounts){
    console.log("acc id ",account.idBusiness)
    console.log("course id ",this.idCourse)
    this.businessAuthService.AddCourseToBusinessUser(account.idBusiness,this.idCourse).subscribe(
      (data) => {
      },
      (err) => {
        console.log(err);
      }
    )
  }
  this.closeDialog();
              Swal.fire({
                title: 'Course shared successfully',
                icon: 'success',
                confirmButtonColor: '#07294d',
              });

}

}
