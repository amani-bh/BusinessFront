import { Component, OnInit, ViewChild } from '@angular/core';
import { AddSubAccountDialogComponent } from '../add-sub-account-dialog/add-sub-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Business } from '../../Shared/entities/Business';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UpdateSubAccountDialogComponent } from '../update-sub-account-dialog/update-sub-account-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-accounts',
  templateUrl: './sub-accounts.component.html',
  styleUrls: ['./sub-accounts.component.css'],
})
export class SubAccountsComponent implements OnInit {
  subAccounts!: Business[];
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'active',
    'creationDate',
    'phone',
    'action'
  ];
  public dataSource = new MatTableDataSource<Business>();
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private diag: MatDialog,
    private businessAuthService: BusinessAuthService,
    private businesstokenStorage: BusinessTokenStorageService
  ) {
   
    this.getAllSubAccount();

  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getAllSubAccount() {
    this.businessAuthService
      .GetAllSubAccount(this.businesstokenStorage.getUser().idBusiness)
      .subscribe(
        (data) => {
          this.subAccounts = data;
          this.dataSource.data = this.subAccounts as Business[];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  AddJobDialog() {
    const diagref = this.diag.open(AddSubAccountDialogComponent, {
      width: '900px',
      height: 'auto',

      disableClose: true,
    }).afterClosed().subscribe((res => {
      this.getAllSubAccount();
    }));
  }


  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

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
  Update(msg: any) {
    const newMsg = Object.assign({}, msg);
    const diagref = this.diag.open(UpdateSubAccountDialogComponent, {
      width: '650px',
      height: 'auto',
      data:
      {
        message: newMsg,
      }
    })
      .afterClosed().subscribe((res => {
        this.getAllSubAccount();
      }));;


}
DeleteAccount(id: number) {
  Swal.fire({
    title: 'Are u sure ?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    confirmButtonColor: '#07294d',
    cancelButtonColor: '#d33',
    showCancelButton: true,
    confirmButtonText: 'Sure',
  }).then((result) => {
    if (result.isConfirmed) {
      this.businessAuthService.Delete(id).subscribe(result => {
        this.getAllSubAccount();
        Swal.fire({
          title: 'Sub Account deleted successfully',
          icon: 'success',
          confirmButtonColor: '#07294d'
        })
      },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + err,

          })
        });
        this.getAllSubAccount();
    }
  })




}
}
