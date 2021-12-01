export class Comment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;

	constructor(){
		this.postId = -1;
		this.id = -1;
		this.name = "";
		this.email = "";
		this.body = "";
	}
}