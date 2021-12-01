import { Injectable } from '@angular/core';
import { POSTS_URL } from '../constants/constants';
import { Post } from '../models/post';
declare var require: any
const axios = require('axios').default;


@Injectable()
export class PostsService {

  constructor() { }

  /**
   * Obtain all posts
   * @returns
   */
  async getPosts(): Promise<any> {
    let response = null;
    try {
      response = await axios.get(POSTS_URL);
    } catch (error) {
      console.log("POSTS ERROR: " + JSON.stringify(error, undefined, 2));
    }
    return response;
  }

  /**
   * Create new Post
   * @param post 
   * @returns 
   */
  async createPost(post: Post): Promise<any> {
    let response = null;
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      response = await axios.post(POSTS_URL, post, headers);
    } catch (error) {
      console.log("CREATE POSTS ERROR: " + JSON.stringify(error, undefined, 2));
    }
    return response;
  }

  /**
   * Update existing Post
   * @param post 
   * @returns 
   */
  async editPost(post: Post): Promise<any> {
    let response = null;
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    try {
      response = await axios.put(`${POSTS_URL}/${post.id}`, post, headers);
    } catch (error) {
      console.log("EDIT POSTS ERROR: " + JSON.stringify(error, undefined, 2));
    }    
    return response;
  }
}
