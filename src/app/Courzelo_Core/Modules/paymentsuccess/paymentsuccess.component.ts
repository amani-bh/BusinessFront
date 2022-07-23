import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../../Shared/Service/cart.service';
import { MylearningService } from '../../Shared/Service/mylearning.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { Cart } from '../Entity/cart';
import { Mylearning } from '../Entity/mylearning';
import { User } from '../Entity/user';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css']
})
export class PaymentsuccessComponent implements OnInit {

  constructor(private cartService: CartService, private tokenService: TokenStorageService, private mylearningService: MylearningService) { }
  currentUser: User | any;
  mylearningExist: boolean | any;
  myLearning: Mylearning | any;
  carts?: Cart[];
  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    //this.existsMyLearning(this.currentUser.id);
    //this.onDeleteCart(this.currentUser.id);
    // Promise.all([this.existsMyLearning(this.currentUser.id)]).then([this.onDeleteCart(this.currentUser.id)]);
    // this.main(this.currentUser.id);

    // const promises = [
    //   new Promise(resolve => setTimeout(resolve, 0, 1)),
    //   new Promise(resolve => setTimeout(resolve, 300, 2))
    // ];
    // Promise.all(promises)
    //   .then(data => {
         this.existsMyLearning(this.currentUser.id);
    //   })
    //   .then(data => {
    //     this.onDeleteCart(this.currentUser.id);
    //   });
    
  }

  onDeleteCart(userId: number) {
    // this.existsMyLearning(this.currentUser.id);
    this.cartService.deleteCartsByUser(userId).subscribe(
      (response: void) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your order has been submitted',
          icon: 'success',
          confirmButtonText: 'Return'
        })
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMyLearning(): void {
    this.mylearningService.addMylearning(this.currentUser.id).subscribe(
      (response: Mylearning | null) => {
       
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Your course was not added to My Learning space',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );
  }

  public existsMyLearning(userId: number){
    this.mylearningService.existsMyLearning(userId).subscribe(
      (response: boolean) => {
        this.mylearningExist=response;
        if(response==true){
          this.onUpdateMyLearning();
        } else {
          this.onAddMyLearning();
        }
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Sorry! Error on server',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    )
    return this.mylearningExist;
  }

  public onUpdateMyLearning(): void {
    this.mylearningService.updateMyLearning(this.currentUser.id).subscribe(
      (response: Mylearning | null) => {
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'Your course was not added to My Learning space',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );
  }

  // async main(userId: number){
  //   this.existsMyLearning(userId);
  //   //await this.onDeleteCart(userId);
  // }

}
