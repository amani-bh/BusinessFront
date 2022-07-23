import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of } from 'rxjs';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import Swal from 'sweetalert2';
import { ModalCoursesTrainerComponent } from '../../Module/modal-courses-trainer/modal-courses-trainer.component';
import { ModalUpdateCoursesComponent } from '../../Module/modal-update-courses/modal-update-courses.component';
import {Location} from '@angular/common';


@Component({
  selector: 'app-sidebar-trainer',
  templateUrl: './sidebar-trainer.component.html',
  styleUrls: ['./sidebar-trainer.component.css']
})
export class SidebarTrainerComponent implements OnInit {
  @ViewChild (MatSidenav)
  sidenav!: MatSidenav;
  isExpanded=true;
  navShow=false;
  addShow=false;
  paramShow=false;
  coursepath=""
  archpath=""
  
  constructor(location:Location, 
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
    private diag: MatDialog,
    private formationService:FormationService,
    private router :Router    ) { 
  
    this.navpath()
}

  navpath(){
    this.router.events.subscribe((val)=>{
      if( (this.router.url=='/trainer/coursestrainer'))
      {  
        this.addShow=true
        this.paramShow=false
        this.navShow=false
      }
    
      else if((this.router.url=="/trainer/archivedcoursestrainer")){
        this.navShow=false
        this.addShow=false
        this.paramShow=false
      }
      else if ((this.router.url.includes("/trainer/coursestrainer/")))
      {
        this.navShow=true
        this.addShow=false
        this.paramShow=true
      }
      else {
        this.navShow=true
        this.addShow=false
        this.paramShow=false
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
  
deleteFormation(){
  let id=localStorage.getItem('idFormation1')
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#07294d',
    cancelButtonColor: '#ffc600',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.formationService.deleteFormationsById(id).subscribe(res=>{
        this.router.navigate(['/coursestrainer'])
      })
      Swal.fire(
        'Deleted!',
        'Your course has been deleted.',
        'success'
      )
    }
  })
  

}
  AddJobDialog() {
    
    const diagref = this.diag.open(ModalUpdateCoursesComponent, {
      width: '900px',
      height: '700px',
      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;
   
    
  }
  AddcoursesDialog() {
    localStorage.setItem("e","0")
    const diagref = this.diag.open(ModalCoursesTrainerComponent, {
      width: '900px',
      height: '700px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;


  }

  checkPath(){

    let path =location.pathname
    console.log(path)
    if(path.includes("/trainer/coursestrainer")){
      this.coursepath="/trainer/coursestrainer"
      
    }
    else if (path.includes("/trainer/archivedcoursestrainer")){
      this.archpath="/trainer/archivedcoursestrainer"
    }

  }

    navigateTo(p:any){
      console.log(this.router)
      let path =location.pathname
      console.log(path)
      if(path.includes("/trainer/coursestrainer/")){
        console.log(this.coursepath);
        this.router.navigate(["/trainer/coursestrainer/"+p],{relativeTo: this.route.parent});
        console.log(path)
      }
      else if(path.includes("/trainer/archivedcoursestrainer/")){
        this.router.navigate(["/trainer/archivedcoursestrainer/"+p],{relativeTo: this.route.parent});
        console.log(path)
      }
      
    }
  
  }