import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postsReducer } from "../posts/posts-list/state/posts.reducer";
import { PostState } from "../posts/posts-list/state/posts.state";

export interface AppState{
    counter:CounterState;
    posts:PostState;
}

export const appReducer={
    counter :counterReducer,
    posts:postsReducer,
}