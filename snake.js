(function () {
    //initialize variables
    var rows = 10;
    var cols = 10;
    var posX = 0;
    var posY = 0;

    var matrix = initMatrix(rows,cols, posX, posY);
    var continueMove;

    $(document).ready(function () {
        drawMatrix(rows, cols, matrix);
    });

    $(window).on('keydown', function (e) {
        clearInterval(continueMove);
        movePixelToPosition(e.keyCode);
        continueMove = setInterval(function () {
            movePixelToPosition(e.keyCode) ;
        } , 200);

    });


    //moves black box one step into given direction
    function movePixelToPosition(keyCodeDirection){
        switch (keyCodeDirection){
            case 37:
                posX -= 1;
                break;
            case 38:
                posY -= 1;
                break;
            case 39:
                posX += 1;
                break;
            case 40:
                posY += 1;
                break;
            default:
                break;
        }

        checkBounds();
        movePixel(posX, posY);
    }

    //checks coordinates and returns them into matrix bounds
    function checkBounds(){
        if(posX > cols - 1){
            posX = 0;
        } else if(posX < 0){
            posX = cols - 1;
        }
        if(posY > rows - 1){
            posY = 0;
        } else if(posY < 0){
            posY = rows - 1;
        }

    }

    //function that builds matrix
    function initMatrix(row, cols, posX, posY) {
         var matrix = [];
         for (var r = 0; r < rows; r++){
             var row = [];
             for (var c = 0; c < cols; c++){
                 // if (r == posY && c == posX){
                 //     row.push(true);
                 // }
                 // else{
                 //     row.push(false);
                 // }
                 row.push((r == posY && c == posX) ? true : false);
             }
             matrix.push(row);
         }
         return matrix;
    }


    /* function draws the matrix */
    function drawMatrix(rows, cols, matrix) {
        var stage = $('#stage').html('');
        for (var r = 0; r < rows; r += 1) {
            var row = $('<div class="row"></div>').appendTo(stage);
            for (var c = 0; c < cols; c += 1) {
                var col = $('<div class="col"></div>').appendTo(row);
                if (matrix[r][c] == true) {
                    col.addClass('black');
                }
            }
        }
    }

    /* redraw the matrix with new coordinates */
    function movePixel(posX, posY) {
        /* todo: prevent position out matrix */
        matrix = initMatrix(rows, cols, posX, posY);
        drawMatrix(rows, cols, matrix);

    }


})();