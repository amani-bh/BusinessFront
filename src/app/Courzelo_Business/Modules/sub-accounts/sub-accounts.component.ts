import { Component, OnInit } from '@angular/core';
import { AddSubAccountDialogComponent } from '../add-sub-account-dialog/add-sub-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { Business } from '../../Shared/entities/Business';

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
  constructor(
    private diag: MatDialog,
    private businessAuthService: BusinessAuthService,
    private businesstokenStorage: BusinessTokenStorageService
  ) {}

  ngOnInit(): void {
    this.getAllSubAccount();
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
    });
  }
}
