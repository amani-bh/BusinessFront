import { Component, OnInit ,ViewChild,Input} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import {trigger,state,style,animate,transition} from '@angular/animations';


@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css'],
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
  ],
})
export class SlideBarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @Input()
  isExpanded!:boolean
  constructor(private observer: BreakpointObserver) {
  }
  ngOnInit(): void {
  }
  /*receive a variable event */
  addItem(newItem: boolean) {
   this.isExpanded=newItem;
  }
  /* for responsive view */
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.isExpanded=false
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.isExpanded=true;
        }
      });
  }

}
