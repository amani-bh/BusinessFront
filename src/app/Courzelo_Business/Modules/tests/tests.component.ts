import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestsService } from '../../Shared/services/Tests.service';
import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { PrehiringTests } from '../../Shared/entities/PrehiringTests';
import { TechTestService } from '../../Shared/services/TechTest.service';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit,AfterViewInit  {

  currentBusiness:any;
  tests!: PrehiringTests[];
  TechTest=[] as Quiz[];
  public dataSource= new  MatTableDataSource<PrehiringTests>();
  public dataSource2= new  MatTableDataSource<Quiz>();
  displayedColumns = ['title', 'creationDate', 'type','action'];
  displayedColumns2 = ['title', 'creationDate', 'evaluationmodel'];

  @ViewChild("paginator1") paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort2!: MatSort;
  
  constructor(private _liveAnnouncer: LiveAnnouncer,private quizservice : QuizService,private jobServices:JobOffersService,private techTestService:TechTestService,private testsService:TestsService,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }


  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.GetTests();
    this.GetTechTestBusiness()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource2 = new  MatTableDataSource<Quiz>(this.TechTest);
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
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
    
    this.testsService.GetTestsByBusiness(this.currentBusiness.idBusiness).subscribe(data=>{this.tests=data;
     this.dataSource.data = this.tests as PrehiringTests[];
       },err=>{
      console.log(err);
    })}

  
   

    VerifExistPrehiring(idPrehiringTest:any){
  
  
      this.jobServices.VerifExistPrehiringTest(idPrehiringTest).subscribe(res=>
        {
          if(res==false){
            this.DeleteTest(idPrehiringTest)
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


    DeleteTest(idPrehiringTest:any){
    
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
          this.testsService.DeleteTest(idPrehiringTest).subscribe(result => {  this.GetTests(); 
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


    GetTechTestBusiness(){
      var i=0
      
      this.techTestService.GetAlldtechTestByBusiness(this.currentBusiness.idBusiness).subscribe((res)=>{
        this.TechTest=[] as Quiz[]
        
        res.forEach(e=>{
          this.quizservice.getquizbyid(e.idQuiz).subscribe(r=>{
            this.TechTest.push(r)
             i++;
             if(i==res.length){
              console.log(this.TechTest)
              this.dataSource2 = new  MatTableDataSource<Quiz>(this.TechTest);
              this.dataSource2.paginator=this.paginator2
              
             }

        })
      })
    })
        
        
        
    }


  }

