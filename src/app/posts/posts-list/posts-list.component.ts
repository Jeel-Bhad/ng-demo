import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Posts } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost } from './state/posts.actions';
import { getPosts } from './state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts!:Observable<Posts[]>;
  constructor(private store:Store<AppState>) { }

  // constructor(private store:Store<{counter:{},posts:{}}>) { } --it will required to declare like this if we not combined with app state
  //otherwise we can use something as we declare above 

  ngOnInit(): void {
    this.posts=this.store.select(getPosts);
    console.log(this.posts);
  }

  onDeletePost(id:any)
  {
    if(confirm("Are you sure ")){
      console.log('delete the post');
      this.store.dispatch(deletePost({id}));
    }
  }
}
