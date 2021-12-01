import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { PostDetailViewModel } from 'src/app/viewmodels/post-detail-viewmodel';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postDetailViewModel: PostDetailViewModel;
  postComments: Comment[];
  alertMessage: string;
  alertType: string;

  constructor(private route: ActivatedRoute, private _commentsService: CommentsService) {
    this.postDetailViewModel = new PostDetailViewModel();
    this.postComments = [];
    this.alertMessage = "";
    this.alertType = "";
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.postDetailViewModel = JSON.parse(JSON.stringify(params, undefined, 2))
      }
    });
    this.getComments();
  }

  /**
   * Obtain all the comments of the post
   */
  async getComments() {
    let response = await this._commentsService.getCommentsByPostId(this.postDetailViewModel.postId);
    if (response && response.status === 200) {
      this.postComments = response.data;
    } else {
      this.showGetDataError();
    }
  }

  /**
   * Show error alert
   */
  showGetDataError() {
    this.alertMessage = "Error al obtener los datos";
    this.alertType = "danger";
  }

}
