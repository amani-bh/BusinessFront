import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from "@angular/material/card";
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    HeaderComponent

  
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    

   
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    HeaderComponent
    
  ]
})
export class SharedClassroomTraineeModule { }
