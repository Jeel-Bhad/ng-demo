import { createReducer, on } from "@ngrx/store";
import { initialState, postsAdapter } from "src/app/posts/posts-list/state/posts.state";
import { addPost, addPostSuccess, deletePost, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";


//converting reducer to entity adapter
const _postsReducer=createReducer(initialState,
    on(addPostSuccess,(state,action)=>{
        return postsAdapter.addOne(action.post,{...state,
        count:state.count+1,});
}),on(updatePostSuccess,(state,action)=>{
   return postsAdapter .updateOne(action.post,state);
}),on(deletePost,(state,{id})=>{
    return postsAdapter.removeOne(id,state);
}),on(loadPostsSuccess , (state,action)=>{
    return postsAdapter.setAll(action.posts,{...state,
        count:state.count+1,});
})
);  

export function postsReducer(state:any,action:any){
    return _postsReducer(state,action);
}