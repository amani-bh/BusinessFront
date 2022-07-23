import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private token: TokenStorageService) { }
  currentuser: any;
  
  ngOnInit(): void {

    this.currentuser = this.token.getUser();
    console.log(window.sessionStorage.getItem("auth-user"));
    //this.values = window.sessionStorage.getItem("auth-user");
  }

}
