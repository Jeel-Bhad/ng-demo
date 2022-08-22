import { routerCancelAction } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { postsAdapter, PostState } from "./posts.state";
export const POST_STATE_NAME='posts';
export const getPostsState=createFeatureSelector<PostState>(POST_STATE_NAME);
export const postsSelectors=postsAdapter.getSelectors();
export const getPosts=createSelector(getPostsState,postsSelectors.selectAll);
export const getPostEntities=createSelector(getPostsState,postsSelectors.selectEntities);


export const getPostById=createSelector(
    getPostEntities,
    getCurrentRoute,
    (posts : any,route:RouterStateUrl)=>{
        return posts ? posts[route.params['id']]:null;
    }
    // console.log(props);
    // return state.posts[props.id] ? state.posts[props.id]:null;
);

export const getCount=createSelector(getPostsState,(state)=>state.count);