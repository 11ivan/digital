import { Geo } from "./geo";

export class Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;

	constructor(){
		this.street = "";
		this.suite= "";
		this.city= "";
		this.zipcode= "";
		this.geo = new Geo();
	}
}