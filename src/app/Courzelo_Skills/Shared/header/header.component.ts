import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();

  }

}
