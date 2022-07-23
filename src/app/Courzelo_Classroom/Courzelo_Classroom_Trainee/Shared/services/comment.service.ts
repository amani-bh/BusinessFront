import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../entities/Comment';
const API_URL = 'https://springgateway.herokuapp.com/courzeloclassroom';
const API_URL_USER = 'https://springgateway.herokuapp.com/auth-herokuu';
@Injectable({
  providedIn: 'root'
})

export class CommentService {
  
  constructor(protected httpClient: HttpClient) { }


  addComments(id:any,idPost:any,comment:Comment) {

    return this.httpClient.post(API_URL+"/api/Comments/"+id+"/formation/"+idPost,comment);

  }

  getcommentuserById(id:any){
      return this.httpClient.get(API_URL_USER+"/api/auth/getUser/"+id)
  }
  getCommentsByIdPost(id:any) {

    return this.httpClient.get<Comment[]>(API_URL+"/api/Comments/post/"+id);

  }
  getCommentsById(id:any) {

    return this.httpClient.get<Comment>(API_URL+"/api/Comments/"+id);

  }
  deleteCommentById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Comments/"+id);

  }
  UpdateComment(id:any,comment:FormData) {

    return this.httpClient.put(API_URL+"/api/Comments/"+id,comment);

  }
}
