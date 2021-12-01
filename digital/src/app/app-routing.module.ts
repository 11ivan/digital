import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditPostComponent } from './components/create-edit-post/create-edit-post.component';
import { MainComponent } from './components/main/main.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'create-post', component: CreateEditPostComponent },
  { path: 'edit-post', component: CreateEditPostComponent},
  { path: 'post-detail', component: PostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
