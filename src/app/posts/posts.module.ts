import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { PostsEffects } from "./posts-list/state/posts.effects";
import { postsReducer } from "./posts-list/state/posts.reducer";
import { POST_STATE_NAME } from "./posts-list/state/posts.selector";
import { SinglePostComponent } from './single-post/single-post.component';

const routes:Routes=[
    {
    path:'',
    component:PostsListComponent,
    children:[
        {path:'add',component:AddPostComponent},
        {path:'edit/:id',
        component:EditPostComponent,
        },
    ],
  },
];
@NgModule({
    declarations:[
        PostsListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent
    ],
    imports:[CommonModule,
    ReactiveFormsModule,RouterModule.forChild(routes),StoreModule.forFeature(POST_STATE_NAME,
    postsReducer),
    EffectsModule.forFeature([PostsEffects])
],
})
export class PostModule{}