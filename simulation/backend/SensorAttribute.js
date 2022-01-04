import randomNormal from "random-normal";

export default class SensorAttribute {
    
    constructor(min,max,avg,stdDeviation) {
      this.min = min;
      this.max = max;
      this.avg = avg;
      this.stdDeviation=stdDeviation;
      this.value=randomNormal(this.avg);
      console.log(this.value);
    }

    generateNewValue(){
        this.value= randomNormal({mean: this.avg, dev: this.stdDeviation});
    }

    getValue(){
        return this.value;
    }
}