import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './services/users.service';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { FormsModule } from '@angular/forms';
import { CreateEditPostComponent } from './components/create-edit-post/create-edit-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEdit, faSave, faEye } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserFilterPipe,
    CreateEditPostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    PostsService,
    UsersService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(private library: FaIconLibrary) {
    this.library.addIcons(faEdit, faSave, faEye);
  }
}
