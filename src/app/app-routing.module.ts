import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter/counter.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'counter',
    loadChildren:()=>import('./counter/counter.module').then(m=>m.CounterModule)
  },
  {
    path:'posts',
    loadChildren:()=>import('./posts/posts.module').then(m=>m.PostModule),
    canActivate:[AuthGuard]
  },
  {
    path:'posts/details/:id',
    component:SinglePostComponent
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule), 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
