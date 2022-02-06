// функція парсить та перевіряє на коректність вхідні данні від користувача
function input(){
    let checkLen = (tmpString) => {
        if (tmpString.length !== 6) {
            alert("Недопустима кількість значень!");
            return false;
        }
        return true;
    }
    
    let parse = (string) => {
        for (let i = 0; i < string.length; i++){
            string[i] = +string[i];
        }
        return string;
    }

    let tmp = null;

    while (true) {
        if (tmp !== null) {
            tmp = tmp.split(' ');
            if (checkLen(tmp)){
                return parse(tmp);
            } else {
                tmp = null;
            }
        }
        else {
            tmp = window.prompt(
                'Введіть, будь ласка, інформацію про полігон: кількість сторін та координати точки, ' +
                'навколо якої буде побудований полігон! ' +
                '\n У вас наступне розширення екрану: ' + window.screen.width + 'x' + window.screen.height);
        }
    }
}

// клас, що відповідатиме за відображення полігонів на екрані
class Frame {
    constructor(div, polygon1, polygon2) {
        this.stage = acgraph.create(div);
        this.layer = this.stage.layer();
        this.polygon1 = polygon1;
        this.polygon2 = polygon2;
        this.step = {
            x: (this.polygon2.mainPoint.x - this.polygon1.mainPoint.x) / 1000,
            y: (this.polygon2.mainPoint.y - this.polygon1.mainPoint.y) / 1000
        }
    }
    
    // намалювати полігони та зʼєднати їх центри
    show () {
        this.#showPolygon(this.polygon1, this.layer);
        this.#showPolygon(this.polygon2, this.stage);

        this.layer.path()
            .moveTo(this.polygon1.mainPoint.x, this.polygon1.mainPoint.y)
            .lineTo(this.polygon2.mainPoint.x, this.polygon2.mainPoint.y);
    }

    // рухати перший полігон до другого 
    async move() {

        while (!this.#check(this.polygon1, this.polygon2) && !this.#check(this.polygon2, this.polygon1)) {
            this.#clear();
            this.#updatePoints();
            this.#showPolygon(this.polygon1, this.layer)
            this.layer.path()
                .moveTo(this.polygon1.mainPoint.x, this.polygon1.mainPoint.y)
                .lineTo(this.polygon2.mainPoint.x, this.polygon2.mainPoint.y);


            // sleep
            await new Promise(resolve => setTimeout(resolve, 10));

        }
    }
    
    // очистити фрейм з першим полігоном (для руху)
    #clear() {
        this.layer.removeChildren();
    }

    // намалювати полігон на певному фреймі
    #showPolygon (polygon, layer){
        for (let i = 1; i < polygon.points.length; i++){
            layer.path()
                .moveTo(polygon.points[i-1].x, polygon.points[i-1].y)
                .lineTo(polygon.points[i].x, polygon.points[i].y);
        }
        layer.path()
            .moveTo(polygon.points[polygon.points.length - 1].x, polygon.points[polygon.points.length - 1].y)
            .lineTo(polygon.points[0].x, polygon.points[0].y);
    }
    
    // перевірка на дотик двох полігонів
    #check (polygon1 = new Polygon(), polygon2 = new Polygon()) {
        for (let i = 1; i <= polygon1.numberOfLines; i++){
            let x1 = polygon1.points[i-1].x;
            let y1 = polygon1.points[i-1].y;
            let x2, y2;
            if (i === polygon1.numberOfLines){
                x2 = polygon1.points[0].x;
                y2 = polygon1.points[0].y;
            } else {
                x2 = polygon1.points[i].x;
                y2 = polygon1.points[i].y;
            }
            
            let len = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
            
            for (let k = 0; k < polygon2.numberOfLines; k++){
                let x3 = polygon2.points[k].x;
                let y3 = polygon2.points[k].y;
                
                let distance = Math.sqrt((x3 - x1)**2 + (y3 - y1)**2);
                distance += Math.sqrt((x3 - x2)**2 + (y3 - y2)**2);
                if (Math.abs(len - distance) < 1e-2) return true;
            }
        }
        return false;
    }
    
    // оновити координати полігона  (для руху)
    #updatePoints () {
        for (let i = 0; i < this.polygon1.numberOfLines; i++){
            this.polygon1.points[i].x += this.step.x;
            this.polygon1.points[i].y += this.step.y;
        }

        this.polygon1.mainPoint.x += this.step.x;
        this.polygon1.mainPoint.y += this.step.y;
    }
}

// клас, ще відбовідає за створення полігона та пошук координат його вершин
class Polygon {
    constructor(numberOfLines = 0, x = 0, y = 0) {
        this.mainPoint = {
            x: x,
            y: y
        }
        
        this.numberOfLines = numberOfLines;
        
        this.points = this.#getCoordinate();
    }
    
    // вираховує координати вершин полігона
    #getCoordinate () {
        let points = [];
        let radius = this.#getRadius();
        let angle = 360;
        let koefOfAngle = 10;
        
        points[0] = {
            x: this.mainPoint.x + radius,
            y: this.mainPoint.y
        }
        
        for (let i = 0; i < this.numberOfLines; i++){
            points[i] = {
                x: this.mainPoint.x + radius * Math.cos(koefOfAngle + (2 * Math.PI * i) / this.numberOfLines),
                y: this.mainPoint.y + radius * Math.sin(koefOfAngle + (2 * Math.PI * i) / this.numberOfLines)
             }
        }

        return points;
    }
    
    // вираховує максимально допустимий радіус полігона
    #getRadius () {
        let maxRadius = 105;
        
        if (this.mainPoint.x <= 100 || this.mainPoint.x >= window.screen.width - 100){
            maxRadius = Math.min(this.mainPoint.x, window.screen.width - this.mainPoint.x);
        }

        if (this.mainPoint.y <= 100 || this.mainPoint.y >= window.screen.height - 100){
            maxRadius = Math.min(this.mainPoint.y, window.screen.height - this.mainPoint.y);
        }
        
        return maxRadius - 5;
    }
}


let inputArray = input();
let frame = new Frame(
    'stage-container', 
    new Polygon(inputArray[0], inputArray[1], inputArray[2]), 
    new Polygon(inputArray[3], inputArray[4], inputArray[5]));
frame.show();
frame.move();