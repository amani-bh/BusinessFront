import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.8
      })),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('1s')
      ]),
    ]),
  ]
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isExpanded=true;
  constructor(private observer: BreakpointObserver) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {
      if (res.matches) {
       // this.sidenav.mode = 'over';
        //this.sidenav.close();
        this.isExpanded=false

      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.isExpanded=true;

      }
    });

  
  }

}
function MatsidenavContent(MatsidenavContent: any) {
  throw new Error('Function not implemented.');
}

function querySelector(arg0: string): HTMLElement {
  throw new Error('Function not implemented.');
}

