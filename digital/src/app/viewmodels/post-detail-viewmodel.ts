export class PostDetailViewModel {

	postId: number;
	title: string;
	body: string;
	username: string;

	constructor(){
		this.postId = -1;
		this.title = "";
		this.body = "";
		this.username = "";
	}
}