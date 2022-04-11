

class Circle{
    constructor(center, r) {
        this.center = center;
        this.r = r;
    }

    updateCenter(start, t){
        this.center.x = start.x + 4 * t;
        this.center.y = start.y + 4 * t;
    }

    show(stage){
        stage.circle(this.center.x, this.center.y, this.r);
        stage.circle(this.center.x, this.center.y, 1);
    }
}


class Point{
    constructor(radius) {
        this.r = radius;
        this.x = this.r * Math.cos(0);
        this.y = this.r * Math.sin(0);
    }

    updatePoint(t){
        this.x = this.r * Math.cos(4 * t);
        this.y = this.r * Math.sin(4 * t);
    }

    show(stage){
        stage.circle(this.x, this.y, 1);
    }
}

class Frame{
    constructor() {
        this.stage = acgraph.create('stage-container');
        this.layer = this.stage.layer();
        this.circle = new Circle();
        this.point = new Point();
    }

    #show(){
        this.circle.show(this.layer);
        this.point.show(this.layer);
    }

    #clear(){
        this.layer.removeChildren();
    }

    async move(startPos){
        this.circle = new Circle({...startPos}, 40);
        this.point = new Point(40);
        for (let t = 0; t < 6 * Math.PI; t += 0.2){
            this.#clear();
            this.#show();
            this.circle.updateCenter(startPos, t);
            this.point.updatePoint(t);

            // sleep
            await new Promise(resolve => setTimeout(resolve, 40));
        }
    }
}

new Frame().move({x:300, y:300});
