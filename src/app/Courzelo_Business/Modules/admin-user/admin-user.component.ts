import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  activeUsers!: any[];
  inactiveUsers!: any[];
  public dataSource1= new  MatTableDataSource<any>();
  public dataSource2= new  MatTableDataSource<any>();
  displayedColumns = ['companyName', 'website', 'responsable', 'phone','country','industry'];
  displayedColumns2 = ['companyName', 'website', 'responsable', 'phone','country','industry','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @Output() selectedTabChange!: EventEmitter<MatTabChangeEvent>
  index=0;
  constructor(private _liveAnnouncer: LiveAnnouncer,private businessAuthService:BusinessAuthService) { }

  ngOnInit(): void {
    this.GetActiveUser();
    this.GetInactiveUser();
  }


  ngAfterViewInit(): void {
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
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
   if(this.index==0){
    this.dataSource1.filter = value.trim().toLocaleLowerCase();
   }

   else if(this.index==1){
    this.dataSource2.filter = value.trim().toLocaleLowerCase();
   }
  }


  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.index=tabChangeEvent.index
    //console.log(this.index)
    //console.log(tabChangeEvent);
}


  GetActiveUser(){
    this.businessAuthService.GetActive().subscribe(res=>{
      this.activeUsers=res
      this.dataSource1.data=res; 
    })
  }

  GetInactiveUser(){
    this.businessAuthService.GetInactive().subscribe(res=>{
      this.inactiveUsers=res;
      this.dataSource2.data=res; 
    })
  }


  ActivateUser(user:any){
    this.businessAuthService.ActivateUser(user.idBusiness).subscribe(res=>{
      Swal.fire({
        title: 'Account activated successfully ! An email has been send',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
      this.GetActiveUser();
      this.GetInactiveUser();
    })
  }


  
  

}
