import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Update } from "@ngrx/entity";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { dummyAction } from "src/app/auth/state/auth.action";
import { Posts } from "src/app/models/posts.model";
import { PostsService } from "src/app/services/posts.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { getPosts } from "./posts.selector";

@Injectable()

export class PostsEffects{
    constructor(private actions$:Actions,private postsService:PostsService,private store:Store<AppState>){};
    loadPosts$=createEffect(()=>{
        return this.actions$.pipe(ofType(loadPosts),
        withLatestFrom(this.store.select(getPosts)),
        mergeMap(([action,posts])=>{      
            if(!posts.length){                                                                             
            return this.postsService.getPosts().pipe(map(posts=>{
                // console.log(data);
                return loadPostsSuccess({posts});
            }));
        } 
        return of(dummyAction());
        }));
    });

    addPost$=createEffect(()=>{
        return this.actions$.pipe(ofType(addPost),mergeMap((action)=>{
            return this.postsService.addPost(action.post).pipe(map((data)=>{
                // console.log(data);
                const post={...action.post,id:data.name};
                return addPostSuccess({post});
            })
            );
        })
        );
    }
    )
    updatePost$=createEffect(()=>{
        return this.actions$.pipe(ofType(updatePost),switchMap((action)=>{
            return this.postsService.updatePost(action.post).pipe(map((data)=>{
                const updatedPost:Update<Posts>={
                    id:action.post.id,
                    changes:{
                        ...action.post,
                    },
                };
                return updatePostSuccess({post:updatedPost}); 
            }));
        }));
    })

    deletePost$=createEffect(()=>{
        return this.actions$.pipe(ofType(deletePost),switchMap((action)=>{
            return this.postsService.deletePost(action.id).pipe(map((data)=>{
                return deletePostSuccess({id:action.id}); 
            }));
        }));
    })

    getSinglePost$=createEffect(()=>{
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION),filter((r:RouterNavigatedAction)=>{
            return r.payload.routerState.url.startsWith('/posts/details');
        }),map((r:any)=>{
            return r.payload.routerState['params']['id'];
        }),
        withLatestFrom(this.store.select(getPosts)),
        switchMap(([id,posts])=>{
            if(!posts.length || posts.length===1){
                return this.postsService.getPosts().pipe(map((post)=>{
                    const postData=[{...post,id}];
                    return loadPostsSuccess({posts:post});
                })
                );
            }
            return of(dummyAction());   
        })
        );
        
    });


}