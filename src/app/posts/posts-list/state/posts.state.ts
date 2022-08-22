import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Posts } from "src/app/models/posts.model";
export interface PostState extends EntityState<Posts>{
    count:number;
}
export const postsAdapter=createEntityAdapter<Posts>({
    //selectId:(post:Posts)=>post.id,
    sortComparer:sortByName,

});

export const initialState:PostState=postsAdapter.getInitialState({
    count:0,
});

export function sortByName(a: Posts, b: Posts): number {
    const compare= a.title.localeCompare(b.title);

    if(compare>0)
    {
        return -1;
    }
    if(compare<0)
    {
        return 1;
    }
    return compare;
  }