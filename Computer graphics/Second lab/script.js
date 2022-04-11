function mult(point, matrix) {
    return [
        point[0] * matrix[0][0] + point[1] * matrix[1][0] + point[2] * matrix[2][0],
        point[0] * matrix[0][1] + point[1] * matrix[1][1] + point[2] * matrix[2][1],
        point[0] * matrix[0][2] + point[1] * matrix[1][2] + point[2] * matrix[2][2]
    ]
}

class Frame {
    constructor(container) {
        this.stage = acgraph.create(container);
        this.point = [4.14, 7, 1];
        this.c1 = [[0.456, -0.006, 0], [0.019, 0.683, 0], [2.118, 2.243, 1]];
        this.c2 = [[0.327, 0.293, 0], [-0.534, 0.591, 0], [2.381, -0.453, 1]];
        this.c3 = [[-0.354, 0.351, 0], [0.618, 0.628, 0], [4.782, -0.748, 1]];
        this.c4 = [[-0.002, -0.053, 0], [0.006, 0.14, 0], [3.49, 0.239, 1]];

        this.i = 0;
    }

    start(){


        this.#recurs(this.point, 0)
        console.log(this.i);
    }

    #recurs(point, step){
        if (step > 5) {
            return
        }
        if (step === 5) {
            this.stage.circle(point[0] * 50 + 200, point[1] * 50 + 200, 1)
                .stroke('green');
            this.i += 1;
        }



        this.#recurs(mult(point, this.c1), step+1)
        this.#recurs(mult(point, this.c2), step+1)
        this.#recurs(mult(point, this.c3), step+1)
        this.#recurs(mult(point, this.c4), step+1)


    }
}

const test = new Frame('stage-container');
test.start()