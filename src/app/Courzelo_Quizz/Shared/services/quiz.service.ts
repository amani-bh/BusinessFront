import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../Shared/entities/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizurlapi : string = "https://springgateway.herokuapp.com/quizcourzelo/api/Quiz/";
  quizzurl : string = "https://springgateway.herokuapp.com/quizcourzelo/quiz/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http : HttpClient) { }

  addquiz(quiz : Quiz) : Observable<Quiz>{ return this.http.post<Quiz>(this.quizurlapi+"add_quiz",quiz,this.httpOptions)}
  getquizbyid(id:string):Observable<Quiz>{ return this.http.get<Quiz>(this.quizzurl+"get_quizbyid/"+id)}
  updatequiz(id: string, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(this.quizurlapi+'update_quiz/'+ id, quiz, this.httpOptions);
    }
 gatallquiz(): Observable<Quiz[]> { return this.http.get<Quiz[]>(this.quizurlapi+"getall_quiz/")}
 DeleteQuiz(id:string){return this.http.delete(this.quizurlapi +"delete_quiz/"+id);}
 getqcuqcore(id:string,quiz : Quiz,iduser:string):Observable<Quiz>{return this.http.post<Quiz>(this.quizzurl +"getscoreqcu/"+id+"/"+iduser,quiz,this.httpOptions);}
 getqcmscore(id:string,quiz : Quiz,iduser:string):Observable<Quiz>{return this.http.post<Quiz>(this.quizzurl +"getscoreqcm/"+id+"/"+iduser,quiz,this.httpOptions);}
 getopen_questioncore(id:string,quiz : Quiz,iduser:string):Observable<Quiz>{return this.http.post<Quiz>(this.quizzurl +"getscoreopenquestion/"+id+"/"+iduser,quiz,this.httpOptions);}
}
