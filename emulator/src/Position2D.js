class Position2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    isInside(top_left_pos, bottom_right_pos) { 
        const check_x = this.x >= top_left_pos.x && this.x <= bottom_right_pos.x;       
        const check_y = this.y >= top_left_pos.y && this.y <= bottom_right_pos.y;       
                                                                                   
        return check_x && check_y;
    }
    
    getDistance(pos) {
        return Math.sqrt(Math.pow(this.x - pos.x, 2) + Math.pow(this.y - pos.y, 2));
    }
}

module.exports = Position2D
