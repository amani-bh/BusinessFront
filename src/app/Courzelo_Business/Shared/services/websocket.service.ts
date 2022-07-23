import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as SockJs from "sockjs-client"
import * as Stomp from "stompjs"
//var SockJs = require("sockjs-client");
//var Stomp = require("stompjs");

const API = 'https://springgateway.herokuapp.com/business-auth/';

@Injectable()
export class WebSocketService {

    constructor(private http:HttpClient) { }

    connect() {
        let socket = new SockJs(API+"/socket");

        let stompClient = Stomp.over(socket);

        return stompClient;
    }


    getUnread(id:any){
        return this.http.get<any>(API+"/websocket-backend/unread/"+id)
    }

    getRead(id:any){
        return this.http.get<any>(API+"/websocket-backend/read/"+id)
    }


    setRead(id:any){
        return this.http.post(API+"/websocket-backend/SetRead/"+id,null)
    }

    Notify(id:any,msg:String){
        return this.http.post(API+"/websocket-backend/notify/"+id,msg,{ responseType: 'text'})
    }

   
}
