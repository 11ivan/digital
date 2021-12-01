import { Post } from "../models/post";
import { User } from "../models/user";

export class PostViewModel {

	post: Post;
	user: User;

	constructor(){
		this.post = new Post();
		this.user = new User();		
	}
}