import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Posts } from "../models/posts.model";
import { PostModule } from "../posts/posts.module";

@Injectable({
    providedIn:'root',
})
export class PostsService{
    constructor(private http:HttpClient){}
    getPosts():Observable<Posts[]>{
        return this.http.get<Posts[]>('https://ngrx-pro-9cd4a-default-rtdb.firebaseio.com/posts.json').pipe(map((data)=>{
            const posts:Posts[]=[];
            for(let key in data){
                posts.push({...data[key],id:key});
            }
            return posts;
        })); 
    }

    addPost(post:Posts):Observable<{name:string}>{
        return this.http.post<{name:string}>('https://ngrx-pro-9cd4a-default-rtdb.firebaseio.com/posts.json',post);
    }

    updatePost(post:Posts){
        const postData={[post.id]:{title:post.title,description:post.description},};
        return this.http.patch('https://ngrx-pro-9cd4a-default-rtdb.firebaseio.com/posts.json',postData);
    }

    deletePost(id:string){
        return this.http.delete(
            `https://ngrx-pro-9cd4a-default-rtdb.firebaseio.com/posts/${id}.json`
        );
    }

    getPostById(id:string):Observable<Posts>{
        return this.http.get<Posts>(
            `https://ngrx-pro-9cd4a-default-rtdb.firebaseio.com/posts/${id}.json`
        );
    }

    // posts=[{id:1,post1},{id:2,post2},{id:3,post3}];
    // posts={
    //     ids:[1,2,3],
    //     entities:{1:post1,2:post2,3:post3}
    // }
}