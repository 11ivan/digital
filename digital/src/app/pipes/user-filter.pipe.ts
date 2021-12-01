import { Pipe, PipeTransform } from '@angular/core';
import { PostViewModel } from '../viewmodels/post-view-model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(items: PostViewModel[], username: string): any {
    console.log("USRNAME: " + username);
    //console.log("ITEMS: " + JSON.stringify(items, undefined, 2));
    let returnList = [];
    if (!items || !username) {
      return items;
    }
    returnList = items.filter(item => item.user?.username.toLocaleLowerCase().indexOf(username.toLocaleLowerCase()) !== -1);

    return returnList;
  }

}
