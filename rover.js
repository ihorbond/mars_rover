//Kata object created here
/*var K = document.getElementById("kata").innerText;
K.style.color = "red";*/
var roverKata = {
    position: [0, 0],
    direction: 'S',
    label: document.getElementById('kata').innerText
};
//Napoleon object
var roverNapoleon = {
    position: [9, 9],
    direction: 'N',
    label: document.getElementById('napoleon').innerText
};

//initial grid matrix is being built here
var gridMatrix = new Array(10);
for (i = 0; i < gridMatrix.length; i++) {
    gridMatrix[i] = new Array(10);
}
for (i = 0; i < gridMatrix.length; i++) {
    for (j = 0; j < gridMatrix.length; j++) {
        gridMatrix[i][j] = 'G';
    }
}
gridMatrix[0][0] = roverKata.label;
gridMatrix[9][9] = roverNapoleon.label;
// gridMatrix[0][0] = "#";
obstacleBuilder();
document.getElementById('grid').value = gridMatrix;

//placing 5 random obstacles for our rovers
function obstacleBuilder() {
    var obst = document.getElementById('obstacle').innerText;
    for (i = 0; i < 5; i++) {
        var indexX = Math.floor((Math.random() * 9) + 0);
        var indexY = Math.floor((Math.random() * 9) + 0);
        if (gridMatrix[indexX][indexY] != roverKata.label && gridMatrix[indexX][indexY] != roverNapoleon.label && gridMatrix[indexX][indexY] != obst) {
            gridMatrix[indexX][indexY] = obst;
        }
        //make sure we DO get 5 obstacles
        else {
            --i;
            continue;
        }
    }
}

//Submit buttons action
document.getElementById("button-kata").onclick = kataInputCheck;
document.getElementById("button-napoleon").onclick = napoleonInputCheck;

//valadating user entered commands for Kata/text field is not empty
function kataInputCheck() {
    var commands = document.getElementById("kata-command");
    if (commands.value) {
        kataMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered!");
        //kataCommand.focus();
    }
}

//valadating user entered commands for Napoleon/text field is not empty
function napoleonInputCheck() {
    var commands = document.getElementById("napoleon-command");
    if (commands.value) {
        napoleonMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered");
        //napoleonCommand.focus();
    }
}

//updating Kata's position on a grid
function updateKataPos(kataStartPoint) {
    console.log(roverKata.position);
    gridMatrix[kataStartPoint[0]][kataStartPoint[1]] = "G";
    gridMatrix[roverKata.position[0]][roverKata.position[1]] = roverKata.label;
    setTimeout(function() {
        document.getElementById('grid').value = gridMatrix;
    }, 1000);
}

//checking for obstacles
function isObstacle() {
    var message = "Obstacle ahead!";
    var nextMove = roverKata.position;
    if (gridMatrix[nextMove[0]][nextMove[1]] == "#" || gridMatrix[nextMove[0]][nextMove[1]] == "$") {
        console.log(message);
        return true;
    }
}

//checking for edges
function isEdge() {

    if (roverKata.position[0] > 9) {
        roverKata.position[0] = 0;
    } else if (roverKata.position[0] < 0) {
        roverKata.position[0] = 9;
    } else if (roverKata.position[1] > 9) {
        roverKata.position[1] = 0;
    } else if (roverKata.position[1] < 0) {
        roverKata.position[1] = 9;
    }
}

//moving Kata
function kataMove(commands) {
    var kataStartPoint = JSON.parse(JSON.stringify(roverKata.position));
    var kataCurrentPos = JSON.parse(JSON.stringify(roverKata.position));
    var len = commands.length;
    for (i = 0; i < len; i++) {

        switch (commands[i]) {

            case 'F':
                kataCurrentPos[0] = roverKata.position[0];
                roverKata.position[0]++;
                isEdge();
                if (isObstacle()) {
                    roverKata.position[0] = kataCurrentPos[0];
                    break;
                } else {
                    continue;
                }

            case 'R':
                kataCurrentPos[1] = roverKata.position[1];
                roverKata.position[1]++;
                isEdge();
                if (isObstacle()) {
                    roverKata.position[1] = kataCurrentPos[1];
                    break;
                } else {
                    continue;
                }

            case 'B':
                kataCurrentPos[0] = roverKata.position[0];
                roverKata.position[0]--;
                isEdge();
                if (isObstacle()) {
                    roverKata.position[0] = kataCurrentPos[0];
                    break;
                } else {
                    continue;
                }

            case 'L':
                kataCurrentPos[1] = roverKata.position[1];
                roverKata.position[1]--;
                isEdge();
                if (isObstacle()) {
                    roverKata.position[1] = kataCurrentPos[1];
                    break;
                } else {
                    continue;
                }
            default:
                console.log(commands[i] + " - command not recognized");
                continue;
        }
    }
    document.getElementById("kata-command").value = "";
    updateKataPos(kataStartPoint);
}
