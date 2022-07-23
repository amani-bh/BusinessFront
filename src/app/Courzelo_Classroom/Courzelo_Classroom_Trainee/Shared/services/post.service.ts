import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Post } from '../entities/Post';
const API_URL = 'https://springgateway.herokuapp.com/courzeloclassroom';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(protected httpClient: HttpClient) { }
  
  addPosts(id:any,idFormation:any,post:FormData) {

    return this.httpClient.post(API_URL+"/api/Posts/"+id+"/formation/"+idFormation,post);

  }
  getPostsByIdFormation(id:any) {

    return this.httpClient.get<Post[]>(API_URL+"/api/Posts/formation/"+id);

  }
  getPostsById(id:any) {

    return this.httpClient.get<Post>(API_URL+"/api/Posts/"+id);

  }
  deletePostById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Posts/"+id);

  }
  UpdatePost(id:any,post:FormData) {

    return this.httpClient.put(API_URL+"/api/Posts/"+id,post);

  }
  getPostsprivate(id:any) {

    return this.httpClient.get<Post[]>(API_URL+"/api/Posts/postprivate/"+id);

  }
  updatePostsprivate(id:any,test:Boolean) {

    return this.httpClient.put(API_URL+"/api/Posts/post/"+id+"/private/"+test,event);

  }
}
