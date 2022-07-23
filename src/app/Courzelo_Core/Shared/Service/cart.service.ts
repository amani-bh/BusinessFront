import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../Modules/Entity/cart';
import { Course } from '../../Modules/Entity/course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //private apiServerUrl ='http://localhost:8088';
  private apiServerUrl ='https://springgateway.herokuapp.com/cart-herokuu';

  constructor(private http: HttpClient) { }

  public getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart/all`);
  }

  public addCart(id: number, idCourse: string): Observable<Cart | null> {
    return this.http.post<Cart>(`${this.apiServerUrl}/cart/add/${id}/${idCourse}`, httpOptions);
  }

  public updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiServerUrl}/cart/update`, cart);
  }

  public deleteCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cart/delete/${cartId}`);
  }

  public getUserCart(id: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart/findCart/${id}`);
  }

  public deleteCartsByUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cart/deleteCarts/${userId}`);
  }
}
