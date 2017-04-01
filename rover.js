var whichRover; // checker which rover's submit button was pressed
var roverPos; // current rover's anticipated position
//Kata object
var roverKata = {
    position: [0, 0],
    direction: 'S',
    label: '@'
};
//Napoleon object
var roverNapoleon = {
    position: [9, 9],
    direction: 'N',
    label: '$'
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
obstacleBuilder();
document.getElementById('grid').value = gridMatrix;
document.getElementById("kata-direction").innerText = roverKata.direction;
document.getElementById("napoleon-direction").innerText = roverNapoleon.direction;

//placing 5 random obstacles for our rovers
function obstacleBuilder() {
    var obst = '#';
    for (i = 0; i < 5; i++) {
        var indexX = Math.floor((Math.random() * 9) + 0);
        var indexY = Math.floor((Math.random() * 9) + 0);
        if (gridMatrix[indexX][indexY] != roverKata.label && gridMatrix[indexX][indexY] != roverNapoleon.label && gridMatrix[indexX][indexY] != obst) {
            gridMatrix[indexX][indexY] = obst;
        }
        //making sure we DO get all 5 obstacles
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
    whichRover = "Kata";
    var commands = document.getElementById("kata-command");
    if (commands.value) {
        kataMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered!");
    }
}

//valadating user entered commands for Napoleon/text field is not empty
function napoleonInputCheck() {
    whichRover = "Napoleon";
    var commands = document.getElementById("napoleon-command");
    if (commands.value) {
        napoleonMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered");
    }
}


//updating rover's direction
function updateDirection(currentCommand) {
    directionArray = ['N', 'E', 'S', 'W'];
    console.log("updateDirectionInput: " + roverKata.direction);

    switch (currentCommand) {
        case 'R':
            for (counter = 0; counter < directionArray.length; counter++) {
                if (directionArray[counter] == roverKata.direction && counter == 3) {
                    counter = 0;
                    roverKata.direction = directionArray[counter];
                    break;
                } else if (directionArray[counter] == roverKata.direction) {
                    roverKata.direction = directionArray[counter + 1];
                    break;
                }
            }
            //console.log("updateDirectionCaseR: " + roverKata.direction);
            break;

        case 'L':
            for (counter = 3; counter >= 0; counter--) {
                if (directionArray[counter] == roverKata.direction && counter == 0) {
                    counter = 3;
                    roverKata.direction = directionArray[counter];
                    break;
                } else if (directionArray[counter] == roverKata.direction) {
                    roverKata.direction = directionArray[counter - 1];
                    break;
                }
            }
            break;
        default:
            console.log("no direction change was made at this step");
    }
    console.log("updateDirectionOutput: " + roverKata.direction);
    document.getElementById("kata-direction").innerText = roverKata.direction;
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
    if (gridMatrix[roverPos[0]][roverPos[1]] == "#" || gridMatrix[roverPos[0]][roverPos[1]] == "$" || gridMatrix[roverPos[0]][roverPos[1]] == "@") {
        console.log(message);
        return true;
    }
}

//checking for edges
function isEdge() {
    switch (whichRover) {
        case 'Kata':
            roverPos = roverKata.position;
            break;
        case 'Napoleon':
            roverPos = roverNapoleon.position;
            break;
    }
    if (roverPos[0] > 9) {
        roverPos[0] = 0;
    } else if (roverPos[0] < 0) {
        roverPos[0] = 9;
    } else if (roverPos[1] > 9) {
        roverPos[1] = 0;
    } else if (roverPos[1] < 0) {
        roverPos[1] = 9;
    }
}

//moving Kata
function kataMove(commands) {
    var kataStartPos = JSON.parse(JSON.stringify(roverKata.position));
    var mostRecentPos = JSON.parse(JSON.stringify(roverKata.position));
    var len = commands.length;
    for (i = 0; i < len; i++) {
        var currentCommand = commands[i];
        switch (roverKata.direction) {

            case 'N':
                if (currentCommand == 'F') {
                    mostRecentPos[0] = roverKata.position[0];
                    roverKata.position[0]--;
                } else if (currentCommand == 'B') {
                    mostRecentPos[0] = roverKata.position[0];
                    roverKata.position[0]++;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    roverKata.position[0] = mostRecentPos[0];
                    break;
                } else {
                    continue;
                }
                break;

            case 'E':
                if (currentCommand == 'F') {
                    mostRecentPos[1] = roverKata.position[1];
                    roverKata.position[1]++;
                } else if (currentCommand == 'B') {
                    mostRecentPos[1] = roverKata.position[1];
                    roverKata.position[1]--;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    roverKata.position[1] = mostRecentPos[1];
                    break;
                } else {
                    continue;
                }
                break;

            case 'S':
                if (currentCommand == 'F') {
                    mostRecentPos[0] = roverKata.position[0];
                    roverKata.position[0]++;
                } else if (currentCommand == 'B') {
                    mostRecentPos[0] = roverKata.position[0];
                    roverKata.position[0]--;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    roverKata.position[0] = mostRecentPos[0];
                    break;
                } else {
                    continue;
                }
                break;

            case 'W':
                if (currentCommand == 'F') {
                    mostRecentPos[1] = roverKata.position[1];
                    roverKata.position[1]--;
                } else if (currentCommand == 'B') {
                    mostRecentPos[1] = roverKata.position[1];
                    roverKata.position[1]++;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    roverKata.position[1] = mostRecentPos[1];
                    break;
                } else {
                    continue;
                }
                break;


            default:
                console.log(currentCommand + " - command not recognized");
                continue;
        }
    }
    document.getElementById("kata-command").value = "";
    updateKataPos(kataStartPos);
}
