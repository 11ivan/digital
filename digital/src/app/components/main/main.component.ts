import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostViewModel } from 'src/app/viewmodels/post-view-model';
import { Router } from '@angular/router';
import { PostDetailViewModel } from 'src/app/viewmodels/post-detail-viewmodel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('modal') modal!: ElementRef;
  alertMessage: string;
  posts: Post[];
  users: User[];
  postsWithUsers: PostViewModel[];
  userNameFilter: string;
  selectedUser: User;

  constructor(private _modalService: NgbModal, private _postsService: PostsService,
    private _usersService: UsersService, private router: Router) {
    this.alertMessage = "";
    this.posts = [];
    this.users = [];
    this.postsWithUsers = [];
    this.userNameFilter = "";
    this.selectedUser = new User();;
  }

  ngOnInit(): void {
    this.alertMessage = "";
    this.posts = [];
    this.users = [];
    this.postsWithUsers = [];
    this.userNameFilter = "";
    this.getPostData();
  }

  /**
   * Obtain all posts and users items
   */
  async getPostData() {
    await this.getPosts();
    await this.getUsers();
    if (this.posts.length > 0 && this.users.length > 0) {
      this.fillTableData();
    } else {
      this.showGetDataError();
    }
  }

  /**
   * Obtain all posts items
   */
  async getPosts() {
    let response = await this._postsService.getPosts();
    if (response && response.status === 200) {
      this.posts = response.data;
    } else {
      this.showGetDataError();
    }
  }

  /**
   * Obtain all users items
   */
  async getUsers() {
    let response = await this._usersService.getUsers();
    if (response && response.status === 200) {
      this.users = response.data;
    } else {
      this.showGetDataError();
    }
  }

  /**
   * create the list of PostViewModel from the list of posts and users
   */
  fillTableData() {
    let tableData = new Array<PostViewModel>();
    this.posts.forEach((post: Post, index: number) => {
      let postWithUser = new PostViewModel();
      postWithUser.post = post;
      let user = this.users.find(user => user.id === post.userId);
      postWithUser.user = user !== undefined ? user : new User();
      tableData.push(postWithUser);
    });
    this.postsWithUsers = tableData;
  }

  /**
   * Navigate to Create Post page
   */
  newPost() {
    this.router.navigate(['/create-post']);
  }

  /**
   * Navigate to Edit Post page sending selected post model
   * @param post
   */
  editPost(post: Post) {
    this.router.navigate(['/edit-post'],
      {
        queryParams: {
          ...post,
        }
      });
  }

  /**
   * Create PostDetailViewModel from postViewModel property and
   * Navigate to Edit Post page sending PostDetail ViewModel
   * @param postViewModel 
   */
  showPostDetail(postViewModel: PostViewModel) {
    let postDetailViewModel: PostDetailViewModel = {
      postId: postViewModel.post.id,
      title: postViewModel.post.title,
      body: postViewModel.post.body,
      username: postViewModel.user.username
    };
    this.router.navigate(['/post-detail'],
      {
        queryParams: {
          ...postDetailViewModel,
        }
      });
  }

  /**
   * Show Modal of selected user data
   * @param user 
   */
  showUserDetailModal(user: User) {
    this.selectedUser = user;
    this._modalService.open(this.modal, { centered: true, modalDialogClass: '' });
  }

  /**
   * Show error alert
   */
  showGetDataError() {
    this.alertMessage = "Error al obtener los datos";
  }

}
