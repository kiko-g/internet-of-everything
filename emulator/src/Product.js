class Product{

	constructor(id, machineID, state, fault, weight){
		this.id = id;
		this.location = machineID; //MachineID
		this.state = state;
		this.weight = weight;
		this.fault = fault;
	}

	getState(){
		return this.state;
	}

	setState(to){
		this.state = to;
	}

	getLocation(){
		return this.location;
	}

	updateLocation(location){
		this.location = location;
	}

	hasFault(){
		return this.fault;
	}

	makeFault(){
		this.fault = true;
	}

	fixFault(){
		this.fault = false;
	}

	getWeight(){
		return this.weight;
	}

	setWeight(weight){
		this.weight = weight;
	}
}

export default Product;