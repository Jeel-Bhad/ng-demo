import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { customIncrement } from '../state/counter.action';
import { CounterState } from '../state/counter.state';
@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
value:any;
text:any;
  constructor(private store:Store<{counter:CounterState}>) { }
  ngOnInit(): void {
    this.store.select('counter').subscribe(data=>{
      this.text=data.text;
    })
  }
  onAdd(){
    // console.log(this.value);
    this.store.dispatch(customIncrement({count:+this.value}));
  }
  onChangeTextName()
  {

  }
}

