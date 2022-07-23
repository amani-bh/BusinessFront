import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { FormationService } from '../services/formation.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  isExpanded=true;
  
  navShow=false;

  coursepath=""
  archpath=""

  constructor(location:Location, 
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
    private diag: MatDialog,
    private formationService:FormationService,
    private router :Router  ) { 
  
      this.navpath()
  }
  navpath(){
    this.router.events.subscribe((val)=>{
      if( (this.router.url=='/sidebar/espaceformation'))
      {  
        this.navShow=false
   
      }
    
      else if((this.router.url=="/sidebar/archivedcourses")){
        this.navShow=false
       
      }
      else if ((this.router.url.includes("/sidebar/espaceformation/")))
      {
        this.navShow=true
       
      }
      else {
        this.navShow=true
        
      }
      //console.log(this.router.url)
   
     })
  }

  ngOnInit(): void {
    var p=this.router.url;
    console.log(p);
    this.navpath();
    
   }
    toggle() {
     //this.sidenav.toggle();
     this.isExpanded = !this.isExpanded;
 
   }
  
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          //this.sidenav.close();
          this.isExpanded=false

        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.isExpanded=true
        }
      });
  }

  checkPath(){

    let path =location.pathname
    console.log(path)
    if(path.includes("/sidebar/espaceformation")){
      this.coursepath="/sidebar/espaceformation"
      
    }
    else if (path.includes("/sidebar/archivedcourses")){
      this.archpath="/sidebar/archivedcourses"
    }

  }

    navigateTo(p:any){
      console.log(this.router)
      let path =location.pathname
      console.log(path)
      if(path.includes("/sidebar/espaceformation/")){
        console.log(this.coursepath);
        this.router.navigate(["/sidebar/espaceformation/"+p],{relativeTo: this.route.parent});
        console.log(path)
      }
      else if(path.includes("/sidebar/archivedcourses/")){
        this.router.navigate(["/sidebar/archivedcourses/"+p],{relativeTo: this.route.parent});
        console.log(path)
      }
      
    }
  
  }