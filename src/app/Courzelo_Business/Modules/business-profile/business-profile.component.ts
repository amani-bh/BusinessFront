import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { BusinessService } from '../../Shared/services/Business.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  currentBusiness:any;
  constructor(private userService:BusinessService,private router: Router,private businessTokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {
    if (this.businessTokenStorage.getToken()) {
      
      this.currentBusiness = this.businessTokenStorage.getUser();}

  }

}
