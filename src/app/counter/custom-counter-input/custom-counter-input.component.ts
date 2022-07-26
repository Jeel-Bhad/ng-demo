import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeText, customIncrement } from '../state/counter.action';
import { getText } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';
@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value:any;
  text:any;
  text$:Observable<string>|undefined;
  constructor(private store:Store<AppState>) { }  
  ngOnInit(): void {
    this.text$=this.store.select(getText);
  }
  onAdd(){
    // console.log(this.value);
    this.store.dispatch(customIncrement({count:+this.value}));
  }
  onChangeTextName()
  {
    this.store.dispatch(changeText());
  }
}

