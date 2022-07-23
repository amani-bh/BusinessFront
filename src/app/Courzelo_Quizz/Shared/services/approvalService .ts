import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class approvalService {

 public approvalStageMessage = new BehaviorSubject('');
 currentApprovalStageMessage = this.approvalStageMessage.asObservable();

 constructor() {

 }
 updateApprovalMessage(message: any) {
 this.approvalStageMessage.next(message)
 }
}