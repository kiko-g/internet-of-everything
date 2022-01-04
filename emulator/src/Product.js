const State = {
	METAL_BAR: "METAL_BAR",
	METAL_STRAW: "METAL_STRAW",
	ANTENA: "ANTENA",
	GLASS: "GLASS",
	SCREEN: "SCREEN"
}

function nextState(state){
	switch(state){
		case State.METAL_BAR:
			return State.METAL_STRAW;
		
		case State.METAL_STRAW:
			return State.ANTENA;

		case State.GLASS:
			return State.SCREEN;
		
		default:
			return "FINAL_STATE";
	}		
}

class Size{
	constructor(width, height, depth){
		this.width = width;
		this.height = height; 
		this.depth = depth;
	}
}

class Product{

	constructor(id, machineID, state, fault, weight, size){
		this.id = id;
		this.position = machineID; //MachineID
		this.state = state;
		this.weight = weight;
		this.fault = fault;
		this.size = size;
	}

	getState(){
		return this.state;
	}

	updateState(to){
		if(nextState(this.state) == to){
			this.state = to;
			return true;
		}
		return false;
	}

	getPosition(){
		return this.position;
	}

	updatePosition(position){
		this.position = position;
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

export const ProductState = State;
export const Product = Product;