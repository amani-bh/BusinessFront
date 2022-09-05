import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';

@Component({
  selector: 'app-verify-sub-account',
  templateUrl: './verify-sub-account.component.html',
  styleUrls: ['./verify-sub-account.component.css']
})
export class VerifySubAccountComponent implements OnInit {
verify:boolean=false;
  constructor(private businessAuthService: BusinessAuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.businessAuthService.VerifySubAccount(this.route.snapshot.paramMap.get("code")).subscribe(
      data=>{
        console.log("********",data)
        this.verify=data
      }
    );
  }

}
