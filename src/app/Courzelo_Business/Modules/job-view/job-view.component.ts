import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  currentJob!:any;
  idJob:any;
  currentUser: any;
  isLoggedIn = false;
  constructor(private _Activatedroute:ActivatedRoute,private JobsService:JobOffersService,private businessAuthService: BusinessAuthService,) { }

  ngOnInit(): void {
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.GetJobByid(this.idJob)

  }


  GetJobByid(id:any){
    this.JobsService.GetJobById(id).subscribe(res=>{
      this.currentJob=res;
    })
  }





 


}
