import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  url="../../../../assets/CourzeloBusiness/js/sidnav.js"
  constructor() {
     
   }

  ngOnInit(): void {
    let loadAPI = new Promise(resolve => {
      console.log("resolving promise...");
      this.loadScript();
    });
  }



  public loadScript() {
    console.log("preparing to load...");
    let node = document.createElement("script");
    node.src = this.url;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
}

}
