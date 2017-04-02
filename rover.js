//identifying console user
function identification() {
  var username = prompt("Who is using the shell?");
  if (username) {
    document.getElementById('username').innerText = username;
  }
  else {document.getElementById('username').innerText = "User";}
}
identification();

//Creating objects
var roverKata = {
    position: [0, 0],
    direction: 'S',
    label: '@'
};

var roverNapoleon = {
    position: [9, 9],
    direction: 'S',
    label: '$'
};

var whichRover; //global checker which rover's submit button was pressed

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
document.getElementById('kata-direction').innerText = roverKata.direction;
document.getElementById('napoleon-direction').innerText = roverNapoleon.direction;

//placing 5 random obstacles for rovers
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

//valadating user entered commands/text field is not empty
function kataInputCheck() {
    whichRover = "Kata";
    var commands = document.getElementById("kata-command");
    if (commands.value) {
        roverMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered!");
    }
}

function napoleonInputCheck() {
    whichRover = "Napoleon";
    var commands = document.getElementById("napoleon-command");
    if (commands.value) {
        roverMove(commands.value.toUpperCase());
    } else {
        alert("No commands were entered");
    }
}

//updating rover's direction
function updateDirection(currentCommand) {
    directionArray = ['N', 'E', 'S', 'W'];
    switch (currentCommand) {

        case 'R':
            if (whichRover == "Kata") {
                for (var counter = 0; counter < directionArray.length; counter++) {
                    if (directionArray[counter] == roverKata.direction && counter == 3) {
                        counter = 0;
                        roverKata.direction = directionArray[counter];
                        break;
                    } else if (directionArray[counter] == roverKata.direction) {
                        roverKata.direction = directionArray[counter + 1];
                        break;
                    }
                }
            } else if (whichRover == "Napoleon") {

                for (var counter = 0; counter < directionArray.length; counter++) {
                    if (directionArray[counter] == roverNapoleon.direction && counter == 3) {
                        counter = 0;
                        roverNapoleon.direction = directionArray[counter];
                        break;
                    } else if (directionArray[counter] == roverNapoleon.direction) {
                        roverNapoleon.direction = directionArray[counter + 1];
                        break;
                    }
                }
            }
            break;

        case 'L':
            if (whichRover == "Kata") {
                for (var counter = 3; counter >= 0; counter--) {
                    if (directionArray[counter] == roverKata.direction && counter == 0) {
                        counter = 3;
                        roverKata.direction = directionArray[counter];
                        break;
                    } else if (directionArray[counter] == roverKata.direction) {
                        roverKata.direction = directionArray[counter - 1];
                        break;
                    }
                }
            } else if (whichRover == "Napoleon") {

                for (var counter = 3; counter >= 0; counter--) {
                    if (directionArray[counter] == roverNapoleon.direction && counter == 0) {
                        counter = 3;
                        roverNapoleon.direction = directionArray[counter];
                        break;
                    } else if (directionArray[counter] == roverNapoleon.direction) {
                        roverNapoleon.direction = directionArray[counter - 1];
                        break;
                    }
                }
            }
            break;
    }
    //updating rovers' direction on web page
    document.getElementById('kata-direction').innerText = roverKata.direction;
    document.getElementById('napoleon-direction').innerText = roverNapoleon.direction;
}

//updating Kata's position on a grid
function updateCurrentRoverPos(currentRoverStartPos) {
    console.log("CurrentRoverPosition: " + currentRoverPos);
    gridMatrix[currentRoverStartPos[0]][currentRoverStartPos[1]] = "G";
    gridMatrix[currentRoverPos[0]][currentRoverPos[1]] = currentRoverLabel;
    setTimeout(function() {
        document.getElementById('grid').value = gridMatrix;
    }, 1000);
}

//checking for obstacles
function isObstacle() {
    var message = "Obstacle ahead!";
    if (gridMatrix[currentRoverPos[0]][currentRoverPos[1]] == "#" || gridMatrix[currentRoverPos[0]][currentRoverPos[1]] == "$" || gridMatrix[currentRoverPos[0]][currentRoverPos[1]] == "@") {
        console.log(message);
        return true;
    }
}

//checking for edges
function isEdge() {
    if (currentRoverPos[0] > 9) {
        currentRoverPos[0] = 0;
    } else if (currentRoverPos[0] < 0) {
        currentRoverPos[0] = 9;
    } else if (currentRoverPos[1] > 9) {
        currentRoverPos[1] = 0;
    } else if (currentRoverPos[1] < 0) {
        currentRoverPos[1] = 9;
    }
}

//moving current rover
function roverMove(commands) {
    switch (whichRover) {
        case "Kata":
            //JSON.parse "deep" copies value of a variable instead of referencing to it
            var currentRoverStartPos = JSON.parse(JSON.stringify(roverKata.position));
            var currentRoverMostRecentPos = JSON.parse(JSON.stringify(roverKata.position));
            var currentRoverDirection = roverKata.direction;
            //declaring global variables within function
            window.currentRoverPos = roverKata.position;
            window.currentRoverLabel = roverKata.label;
            break;
        case "Napoleon":
            currentRoverStartPos = JSON.parse(JSON.stringify(roverNapoleon.position));
            currentRoverMostRecentPos = JSON.parse(JSON.stringify(roverNapoleon.position));
            currentRoverDirection = roverNapoleon.direction;
            currentRoverPos = roverNapoleon.position;
            currentRoverLabel = roverNapoleon.label;
            break;
    }
    var len = commands.length;
    for (var i = 0; i < len; i++) {
        var currentCommand = commands[i];
        switch (currentRoverDirection) {

            case 'N':
                if (currentCommand == 'F') {
                    currentRoverMostRecentPos[0] = currentRoverPos[0];
                    currentRoverPos[0]--;
                } else if (currentCommand == 'B') {
                    currentRoverMostRecentPos[0] = currentRoverPos[0];
                    currentRoverPos[0]++;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    currentRoverPos[0] = currentRoverMostRecentPos[0];
                    break;
                } else {
                    continue;
                }
                break;

            case 'E':
                if (currentCommand == 'F') {
                    currentRoverMostRecentPos[1] = currentRoverPos[1];
                    currentRoverPos[1]++;
                } else if (currentCommand == 'B') {
                    currentRoverMostRecentPos[1] = currentRoverPos[1];
                    currentRoverPos[1]--;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    currentRoverPos[1] = mostRecentPos[1];
                    break;
                } else {
                    continue;
                }
                break;

            case 'S':
                if (currentCommand == 'F') {
                    currentRoverMostRecentPos[0] = currentRoverPos[0];
                    currentRoverPos[0]++;
                } else if (currentCommand == 'B') {
                    currentRoverMostRecentPos[0] = currentRoverPos[0];
                    currentRoverPos[0]--;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    currentRoverPos[0] = currentRoverMostRecentPos[0];
                    break;
                } else {
                    continue;
                }
                break;

            case 'W':
                if (currentCommand == 'F') {
                    currentRoverMostRecentPos[1] = currentRoverPos[1];
                    currentRoverPos[1]--;
                } else if (currentCommand == 'B') {
                    currentRoverMostRecentPos[1] = currentRoverPos[1];
                    currentRoverPos[1]++;
                } else if (currentCommand == 'R' || currentCommand == 'L') {
                    updateDirection(currentCommand);
                    continue;
                }
                isEdge();
                if (isObstacle()) {
                    currentRoverPos[1] = currentRoverMostRecentPos[1];
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
    document.getElementById("napoleon-command").value = "";
    updateCurrentRoverPos(currentRoverStartPos);
}
