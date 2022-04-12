

class Circle{
    constructor(center, r) {
        this.center = center;
        this.r = r;
    }

    updateCenter(start, t){
        this.center.x = start.x + 20 * t;
        this.center.y = start.y + 20 * t;
    }

    show(stage){
        stage.circle(this.center.x, this.center.y, this.r);
        stage.circle(this.center.x, this.center.y, 1);
    }
}


class Point{
    constructor(radius, color) {
        this.r = radius;
        this.color = color;
        this.x = this.r * Math.cos(0);
        this.y = this.r * Math.sin(0);
    }

    updatePoint(center, t){
        this.x = center.x + this.r * Math.cos(4 * t);
        this.y = center.y + this.r * Math.sin(4 * t);
    }

    show(stage){
        stage.circle(this.x, this.y, 1)
            .stroke(this.color);
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
        this.point = new Point(40, "red");
        for (let t = 0; t < 6 * Math.PI; t += 0.01){
            this.#clear();
            this.#show();
            this.circle.updateCenter(startPos, t);
            this.point.updatePoint(this.circle.center, t);


            let p = new Point(40, "blue");
            p.updatePoint(this.circle.center, t);
            p.show(this.stage);


            // sleep
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    }
}

new Frame().move({x:200, y:200});
