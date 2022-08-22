import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Posts } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../posts-list/state/posts.actions';
import { getPostById } from '../posts-list/state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit,OnDestroy {
  post:Posts | undefined;
  postForm!:FormGroup;
  postSubscription:Subscription|undefined;
  constructor(private store:Store<AppState>,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription=this.store.select(getPostById).subscribe((post)=>{
      if(post){

      
      this.post=post;
      this.postForm.patchValue({
        title:post?.title,
        description:post?.description
      })
    }
    });
    // this.route.paramMap.subscribe((params)=>{
    //   const id=params.get('id');
    //   this.postSubscription=this.store.select(getPostById,{id}).subscribe((data)=>{
    //     this.post=data;
    //     // console.log(this.post);
    //     this.createForm();
    //   });  
    // });
  }
  createForm(){
    this.postForm=new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      description:new FormControl(null,[ Validators.required,Validators.minLength(10), ])
    });
  }
  onSubmit()
  {
    if(!this.postForm.valid){
      return;
    }
    const title=this.postForm.value.title;
    const description=this.postForm.value.description;
    //dispatch the action

    const post:Posts={
      id:this.post?.id,
      title,
      description,
    };
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }
  ngOnDestroy(): void {
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }
}
