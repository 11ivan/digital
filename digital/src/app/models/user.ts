import { Address } from "./address";
import { Company } from "./company";

export class User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;

	constructor() {
		this.id = 0;
		this.name = "";
		this.username = "";
		this.email = "";
		this.address = new Address();
		this.phone = "";
		this.website = "";
		this.company = new Company();
	}
}