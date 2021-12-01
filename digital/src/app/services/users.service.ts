import { Injectable } from '@angular/core';
import { USERS_URL } from '../constants/constants';
declare var require: any
const axios = require('axios').default;


@Injectable()
export class UsersService {

  constructor() { }

  /**
   * Obtain all users
   * @returns
   */
  async getUsers(): Promise<any> {
    let response = null;    
    try {
      response = await axios.get(USERS_URL);
    } catch (error) {
      console.log("USERS ERROR: " + JSON.stringify(error, undefined, 2));
    }
    return response;
  }
}
