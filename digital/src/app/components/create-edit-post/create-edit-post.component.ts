import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.css']
})
export class CreateEditPostComponent implements OnInit {

  isEdit: boolean;
  pageTitle: string;
  post: Post;
  users: User[];
  alertMessage: string;
  alertType: string;

  constructor(private route: ActivatedRoute, private _usersService: UsersService, private _postsService: PostsService, private router: Router, private _location: Location) {
    this.isEdit = false;
    this.pageTitle = "";
    this.post = new Post();
    this.users = [];
    this.alertMessage = "";
    this.alertType = "";
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.post = JSON.parse(JSON.stringify(params, undefined, 2))
      }
      if (this.post.id !== undefined) {
        this.isEdit = true;
        this.pageTitle = "Editar Post";
      } else {
        this.isEdit = false;
        this.pageTitle = "Crear Post";
      }
    });

    this.getUsers();
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
   * Evento when selected user change
   * @param event 
   */
  selectedUserChange(event: any) {
    this.post.userId = event.target.value;
  }

  /**
   * Event when button submit its clicked
   */
  onSubmit() {
    if (this.isEdit) {
      this.editPost();
    } else {
      this.createPost();
    }
  }

  /**
   * Cretate a new Post
   */
  async createPost() {
    let response = await this._postsService.createPost(this.post);
    if (response && response.status === 201) {
      this.showSaveDataSuccess();
      setTimeout(() => {
        this._location.back();
      }, 2500);
    } else {
      this.showSaveDataError();
    }
  }

  /**
   * Update existing Post
   */
  async editPost() {
    let response = await this._postsService.editPost(this.post);
    if (response && response.status === 200) {
      this.showSaveDataSuccess();
      setTimeout(() => {
        this._location.back();
      }, 2500);
    } else {
      this.showSaveDataError();
    }
  }

  /**
   * Show get data error alert
   */
  showGetDataError() {
    this.alertMessage = "Error al obtener los datos";
    this.alertType = "danger";
  }

  /**
   * Show save data error alert
   */
  showSaveDataError() {
    this.alertMessage = "Error al guardar los datos";
    this.alertType = "danger";
  }

  /**
   * Show save data success alert
   */
  showSaveDataSuccess() {
    this.alertMessage = `Se ha ${this.isEdit ? "editado" : "creado"} correctamente`;
    this.alertType = "success";
  }

}
