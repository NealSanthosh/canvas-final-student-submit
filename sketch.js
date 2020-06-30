var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;
var drawingColor = 255;

function setup(){
    canvas = createCanvas(400, 400);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    canvas.parent('canvascontainer');

    database = firebase.database();

    // var ref = database.ref('drawings')
    // ref.on('value', gotData, errData);
    database.ref('drawing/').on('value', (data) => {
        drawing = data.val().drawing101,
        drawingColor = data.val().color
    })


    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

    var clearbutton = select('#clearbutton');
    clearbutton.mousePressed(clearDrawing)
}

function startPath(){
    isDrawing = true;
    currentPath = [];

    drawing.push(currentPath);
    var color = '#'
    var letters = '0123456789abcdef'
    for(var i = 0 ; i < 6;i ++ ){
      color += letters[Math.floor(Math.random()*16)]
    }  
    drawingColor = color
    
}

function endPath(){
    isDrawing = false;
}

function draw(){
    background(0)


    if(isDrawing){
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }

    stroke(drawingColor);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < drawing.length; i++){
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++){
            vertex(path[j].x, path[j].y)
        }
        endShape();
    }
}

function saveDrawing(){
    // var ref = database.ref('drawings'); 
    // ref.push(drawing);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "drawing101": drawing,
        "color":drawingColor
    })
}

function clearDrawing() {
    drawing = [];
    clear();
    var adaRef = database.ref('drawing');
    adaRef.remove()
}

function gotData(data){

   

    // var drawings = data.val();

    // var keys = Object.keys(drawing);
    // for(var i = 0; i < keys.length; i++){
    //     var key = keys[i];
    //     console.log(key);
    //     var li = createElement('li', '');
    //     var aherf = createA('#', key);
    //     aherf.mousePressed(showDrawing);
    //     ahref.parent(li);
    //     li.parent('drawinglist');
    // }
}

function errData(err){
    console.log(err);
}

function showDrawing(){
    console.log(this.html());

    var key = this.html();

    var ref = database.ref('drawings/' + key);
    ref.on('value', oneDrawing, errData);

    function oneDrawing(){
        var drawing = data.val();
        console.log(drawing);
    }

}