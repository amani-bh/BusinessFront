
import { Output,EventEmitter,Component,OnInit} from '@angular/core';
@Component({
  selector: 'app-header-trainer',
  templateUrl: './header-trainer.component.html',
  styleUrls: ['./header-trainer.component.css']
})
export class HeaderTrainerComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  isShow=false
  constructor() { }
  ngOnInit(): void {
  }
  /* Send the variable output */
  addNewItem(value: boolean){
    this.newItemEvent.emit(value);
    this.isShow=!this.isShow;
  }
}
