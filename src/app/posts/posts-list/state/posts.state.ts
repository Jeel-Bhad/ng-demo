import { Posts } from "src/app/models/posts.model";
export interface PostState{
    posts:Posts[];
}
export const initialState:PostState={
    posts:[
        {
            id:'1',
            title:'Post-1',
            description:'Post-1 Description'
        },
        {
            id:'2',
            title:'Post-2',
            description:'Post-2 Description'
        },
    ],
};