import { Injectable } from '@angular/core';
import { COMMENTS_URL } from '../constants/constants';

declare var require: any
const axios = require('axios').default;

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }
  
  /**
   * Obtain all comments by post Id
   * @param postId 
   * @returns 
   */
  async getCommentsByPostId(postId: number): Promise<any> {
    let response = null;
    try {
      response = await axios.get(`${COMMENTS_URL}?postId=${postId}`);
    } catch (error) {
      console.log("COMMENTS ERROR: " + JSON.stringify(error, undefined, 2));
    }
    return response;
  }
}
