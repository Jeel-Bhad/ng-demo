import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

export const COUNTER_STATE_NAME='counter';

const getCounterState=createFeatureSelector<CounterState>(COUNTER_STATE_NAME); //feature to use 

///send the entire state;return only required parts
export const getCounter=createSelector(getCounterState,(state)=>{
    return state.counter;
});

export const getText=createSelector(getCounterState,(state)=>{
    return state.text;
});