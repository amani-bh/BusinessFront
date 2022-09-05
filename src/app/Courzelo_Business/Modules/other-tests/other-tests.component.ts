import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { OtherTestService } from '../../Shared/services/other-test.service';
import { OtherTest } from '../../Shared/entities/OtherTest';

@Component({
  selector: 'app-other-tests',
  templateUrl: './other-tests.component.html',
  styleUrls: ['./other-tests.component.css']
})
export class OtherTestsComponent implements OnInit {
  idJob:any
  currentJob:any
  currentBusiness:any;
  tests!: OtherTest[];
  tests2!: OtherTest[];
  public dataSource= new  MatTableDataSource<OtherTest>();
  public dataSource2= new  MatTableDataSource<OtherTest>();
  displayedColumns = ['title', 'creationDate', 'category','action'];
  assignedTest!:OtherTest;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  
  constructor(private _Activatedroute:ActivatedRoute,private _liveAnnouncer: LiveAnnouncer,private JobsService:JobOffersService,private testsService:OtherTestService,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }


  ngOnInit(): void {
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.GetTests();
    this.GetJobByid(this.idJob)
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  SortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }
    

     
  GetTests(){
    
    this.testsService.GetTestsByCompanyName(this.currentBusiness.companyName).subscribe(data=>{this.tests=data;
     this.dataSource.data = this.tests as OtherTest[];
     
       },err=>{
      console.log(err);
    })}

    GetTestsById(id:any){
      this.testsService.GetTestById(id).subscribe(res=>
        { this.assignedTest=res;
          this.tests2.push(this.assignedTest as OtherTest);
          this.dataSource2.data=this.tests2;
          
        },err=>{
          console.log(err);
        })
    }

    GetJobByid(id:any){
      this.JobsService.GetJobById(id).subscribe(res=>{
        this.currentJob=res;
        if(this.currentJob.idOtherTest!=null){
          this.tests2=[]
          this.GetTestsById(this.currentJob.idOtherTest)
        }
      })
    }
  

    Assign(idtest:any){
      if(this.currentJob.idOtherTest){
        Swal.fire({
          title: 'this job is already assigned to a prehiring test !',
          text: " Are you sure you want to change it !",
          icon: 'warning',
          confirmButtonColor: '#07294d',
          cancelButtonColor: '#d33',
          showCancelButton: true,
          confirmButtonText: 'Sure',
        }).then((result) => {

          this.JobsService.AssignOtherTest(idtest,this.idJob).subscribe(res=>{
            
            
            Swal.fire({
              title: 'Other Test has been assigned successufly to this job',
              icon:'success',
              confirmButtonColor: '#07294d'
               })
    
               this.GetJobByid(this.idJob)
          })


        })

       

      
    }
    else {
      
      this.JobsService.AssignOtherTest(idtest,this.idJob).subscribe(res=>{
       
        
        Swal.fire({
          title: 'Other Test has been assigned successufly to this job',
          icon:'success',
          confirmButtonColor: '#07294d'
           })

           this.GetJobByid(this.idJob)
      })


    
    }
  }


  UnAssign(id:any){
    this.JobsService.UnAssignOtherTest(id).subscribe(res=>{
      this.GetJobByid(this.idJob)
      this.tests2=[]
      this.currentJob=res
      Swal.fire({
        title: 'Other Test has been removed successufly from this job',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
    })
}



VerifExistOther(idOtherTest:any){
  
  
  this.JobsService.VerifExistOtherTest(idOtherTest).subscribe(res=>
    {
      if(res==false){
        this.DeleteOtherTest(idOtherTest)
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "can't delete this test ! it has been assigned to many jobs " ,
          
        })
      }
    })
}


DeleteOtherTest(idOtherTest:any){

      Swal.fire({
        title: 'Are u sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonColor: '#07294d',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          this.testsService.DeleteTest(idOtherTest).subscribe(result => {  
            this.GetTests(); 
            
            Swal.fire({
              title: 'Test deleted successufly',
              icon:'success',
              confirmButtonColor: '#07294d'
               })
           },
           err=>
           { console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,
              
            })
           });
          
        }
      })

      

    }

   

  }

