import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { AuthService } from 'src/app/Courzelo_Core/Shared/Service/auth.service';
import { SkillsService } from '../../Shared/services/Skills.service';
import { throws } from 'assert';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  Form!: FormGroup;
  currentBusiness:any
  jobOffers!:JobOffers[]
  job!:JobOffers
  state= new AppState(null,new Date(),"pre-selected",1,0,'',"",'',null,false,"");
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null) ;
  users:any[]
  skills=[] as any[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   // MatPaginator Inputs
   length:any;
   pageSize = 5;

    // MatPaginator Output
    pageEvent!: PageEvent;
   
  constructor(private skillsService:SkillsService,private fb: FormBuilder,private JobsService:JobOffersService,private businesstokenStorage: BusinessTokenStorageService,private AppService:CandidateAppService,private authService:AuthService) { }

  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.Form = this.fb.group({
     
      search: [''],
      job: ['']
    })

    this.Getjobs()
    this.GetUsers()
    this.GetSkillsUser(1)
  }


  Getjobs(){
    
    this.JobsService.GetJobsByBusinessAndState(this.currentBusiness.idBusiness,'Active').subscribe(data=>{
      this.jobOffers=data;
      
       },err=>{
      console.log(err);
    })}


   


    AddApp(idUser:any){
      if(this.Form.get('job')?.value){

      this.app.candidateState.push(this.state)
      this.AppService.PostApp(this.app,this.Form.get('job')?.value,idUser).subscribe(res => 
        { 
         
        //console.log(res);
        Swal.fire({
          title: 'Candidate has been selected successufly',
          icon:'success',
          confirmButtonColor: '#07294d'
           })
        },
        err=>
        {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + err.error.text,
            
          })
        })
  
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select a job first! ' ,
        
      })
    }
  }

  GetUsers(){
this.authService.getUsers().subscribe(res=>{
  this.users=res;
  this.length=this.users.length
  this.users.forEach(user=>{
    var skills=this.GetSkillsUser(user.id)
    user.skills=skills
    var json = JSON.stringify(user);
    console.log(json)
  })
})
  }

  GetSkillsUser(id:any):any{
    this.skills=[]
    this.skillsService.GetMacrohardskills(id).subscribe(macro=>{
      macro.forEach(m=>{ this.skills.push(m)})
      console.log(this.skills)
      return this.skills
    })
    
  }

  }

