import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { isThisTypeNode } from 'typescript';
import { Notification } from '../entities/Notification';
import { BusinessTokenStorageService } from '../services/Business-token-storage.service';
import { BusinessService } from '../services/Business.service';
import { WebSocketService } from '../services/websocket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  clicked=false;
  isCollapsed=false;
  url="../../../../assets/CourzeloBusiness/js/main.js"
  index=0;
  isLoggedIn = false;
  BusinessisLoggedIn = false;
  currentBusiness:any;
  roles:any;
  content?: string;
  x:boolean;
  @ViewChild('checkbox') private id: MatCheckbox;;
   done1=false;
   done2=false;
  notifications:String =""
  count=0;
  UnreadNotif=[] as Notification[];
  lastReadNotif=[] as Notification[]
  notif=[] as Notification[]
  iduser:any
  constructor(private webSocketService:WebSocketService,private userService:BusinessService,private router: Router,private tokenStorageService: TokenStorageService,private businessTokenStorage: BusinessTokenStorageService) { 
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.businessTokenStorage.getToken()) {
      this.BusinessisLoggedIn = true;
      this.currentBusiness = this.businessTokenStorage.getUser();
      this.iduser=this.currentBusiness.idBusiness
      this.getAll(this.iduser)
      this.socket(this.iduser);
    }
    else if(this.tokenStorageService.getToken()){
          this.iduser=this.tokenStorageService.getUser().id
          console.log(this.tokenStorageService.getUser())
          this.getAll(this.iduser)
          this.socket(this.iduser);
    }

    
    this.x=false;
  }

  ngOnInit(): void {
    this.x=false;

    

   let loadAPI = new Promise(resolve => {
      console.log("resolving promise...");
      this.loadScript(this.url);
    });
  }
  

  logout(): void {
    this.businessTokenStorage.signOut();
    this.router.navigate(["/Businessregister"]).then(onfulfilled => window.location.reload()) ;

  }


IsAdmin(){
    var roles= this.currentBusiness.roles as Array<String>
    return roles.includes("ROLE_ADMIN",0);
}


show(){
  
  if(this.x==false)
  {
    this.count=0
    this.x=true
    
  }
  else if (this.x==true){
       this.x=false
       this.count=0
       this.UnreadNotif.forEach(n=>{
        this.webSocketService.setRead(n.idNotif).subscribe(res=>{
          this.GetUnreadNotif(this.iduser)
          this.LastReadNotif(this.iduser)
    
        })
      })

  } 
}


getAll(id:any){
  this.GetUnreadNotif(id);
  this.LastReadNotif(id);
  console.log(this.notif)
  if(this.done1 && this.done2){
  console.log(this.notif)
  this.notif=(this.lastReadNotif.concat(this.UnreadNotif)).sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime() )
  
  }
}



public loadScript(url:any) {
  console.log("preparing to load...");
  let node = document.createElement("script");
  node.src = url;
  node.type = "text/javascript";
  node.async = true;
  node.charset = "utf-8";
  document.getElementsByTagName("head")[0].appendChild(node);
}


GetUnreadNotif(id:any){
  this.webSocketService.getUnread(id).subscribe(res=>{
    this.UnreadNotif=res;
    this.count=this.UnreadNotif.length
 
})
}

LastReadNotif(id:any){
  this.webSocketService.getRead(id).subscribe((res :Notification[])=>
    {
      let data = res.sort((a,b) =>  new Date(b.date).getTime() - new Date(a.date).getTime())
      this.lastReadNotif=data.slice(0,3)
    })
}


socket(id:any){
let stompClient = this.webSocketService.connect();

stompClient.connect({}, (frame: any) => {

    stompClient.subscribe('/topic/notification', (notifications: any) => {

      if(id){
        if(JSON.parse(notifications.body).userId==id){
          this.UnreadNotif.unshift(JSON.parse(notifications.body))
          this.count=this.UnreadNotif.length
      }
    }

    })

});

}


}

