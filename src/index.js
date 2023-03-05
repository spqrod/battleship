import { ship } from "./factories/ship.js";
import { gameBoard } from "./factories/gameBoard.js";
import { player } from "./factories/player.js";
import "./style.css";

const gameBoardSize = 100;

// View
const viewConstructor = () => {

    function highlightShipCell(gameBoardPlayerNumber, coordinatesElement) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("shipNormal");
    };

    function highlightShipCellHit(gameBoardPlayerNumber, coordinatesElement) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("shipHit");
        removeEventListener(cell);
    };

    function highlightShipCellSunk(gameBoardPlayerNumber, coordinatesElement) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("shipSunk");
        cell.classList.remove("shipHit");
        removeEventListener(cell);
    };
    
    function highlightMissedHit(gameBoardPlayerNumber, missedHitCoordinates) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, missedHitCoordinates);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("missedHit");
        removeEventListener(cell);
    };

    function translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement) {
        const cellNumber = coordinatesElement.y * Math.sqrt(gameBoardSize) + coordinatesElement.x;
        const cellID = `board${gameBoardPlayerNumber}cell${cellNumber}`;
        return cellID;
    };

    function translateCellIDToCoordinates(cellID) {
        const cellNumber = Number(cellID.split("cell")[1]);
        const x = cellNumber % 10;
        const y = (cellNumber - x) / 10;
        return { y, x };
    };

    function addEventListeners() {
        const cellsArray = document.querySelectorAll(".cell");
        cellsArray.forEach(cell => {
            cell.addEventListener("click", processCellClick);
        });
    };

    function addEventListenersForPlacingShips() {
        const cellsArray = document.querySelectorAll(".cell");
        cellsArray.forEach(cell => {
            cell.addEventListener("click", processCellClickForPlacingShips);
        });
    };

    function removeEventListenersForPlacingShips(cell) {
        const cellsArray = document.querySelectorAll(".cell");
        cellsArray.forEach(cell => {
            cell.removeEventListener("click", processCellClickForPlacingShips);
        });
    };

    function removeEventListener(cell) {
        cell.removeEventListener("click", processCellClick);
    };

    function processCellClickForPlacingShips(event) {
        const cellID = event.srcElement.id;
        const gameBoardPlayerNumber = Number(cellID.split("board")[1].split("cell")[0]);
        const coordinates = translateCellIDToCoordinates(cellID);
        controller.processCellClickForPlacingShips(coordinates);
    };

    function processCellClick(event) {
        const cellID = event.srcElement.id;
        const gameBoardPlayerNumber = Number(cellID.split("board")[1].split("cell")[0]);
        const coordinates = translateCellIDToCoordinates(cellID);
        controller.processCellClick(gameBoardPlayerNumber, coordinates);
    };

    return { highlightShipCell, highlightShipCellSunk, highlightShipCellHit, highlightMissedHit, addEventListeners, addEventListenersForPlacingShips, removeEventListenersForPlacingShips };
};

const view = viewConstructor();

// Controller
const controllerConstructor = () => {

    let gameBoardPlayer1;
    let gameBoardPlayer2;
    let shipsLengths;
    let whosTurnForGameboard;

    function initiateGame() {
        assignInitialVariables();
        placePlayerShips();
    };

    function assignInitialVariables() {
        gameBoardPlayer1 = gameBoard(1);
        gameBoardPlayer2 = gameBoard(2);
        shipsLengths = [2, 3, 3, 4, 5];
        whosTurnForGameboard = gameBoardPlayer1;
    };

    function placePlayerShips() {
        console.log("Place your ships!");
        view.addEventListenersForPlacingShips();
    };

    function processCellClickForPlacingShips(coordinates) {
        const length = shipsLengths[shipsLengths.length - 1];
        shipsLengths.pop();
        const coordinatesArray = [coordinates];
        for (let i = 0; i < length - 1; i++) {
            coordinatesArray.push({ 
                y: coordinates.y, 
                x: coordinates.x++ 
            });
        };
        whosTurnForGameboard.createShip(length, coordinatesArray);
        if (whosTurnForGameboard == gameBoardPlayer1) 
            display(whosTurnForGameboard);
        if (!shipsLengths.length) {
            whosTurnForGameboard.areAllShipsPlaced = true;
            if (!gameBoardPlayer2.areAllShipsPlaced) {
                view.removeEventListenersForPlacingShips();
                placePCships();
            } else {
                startGame();
            }
        };
    };
    
    function placePCships() {
        console.log("PC is placing its ships..");
        whosTurnForGameboard = gameBoardPlayer2;
        shipsLengths = [2, 3, 3, 4, 5];
        processCellClickForPlacingShips({ y: 6, x: 2 });
        processCellClickForPlacingShips({ y: 4, x: 2 });
        processCellClickForPlacingShips({ y: 2, x: 2 });
        processCellClickForPlacingShips({ y: 0, x: 2 });
        processCellClickForPlacingShips({ y: 8, x: 2 });
    };
    
    function startGame() {
        console.log("start game");
        view.addEventListeners();
    };

    function display(gameBoard) {
        loopOverShips(gameBoard.gameBoardPlayerNumber, gameBoard.shipsArray);
        gameBoardPlayer1.missedHitsCoordinates.forEach(missedHitCoordinatesElement => {
            view.highlightMissedHit(gameBoard.gameBoardPlayerNumber, missedHitCoordinatesElement);
        })
    };
    
    function loopOverShips(gameBoardPlayerNumber, shipsArray) {
        shipsArray.forEach(shipsArrayElement => {
            shipsArrayElement.coordinates.forEach(coordinatesElement => {
                highLightShipCellSunk(shipsArrayElement.newShip, gameBoardPlayerNumber, coordinatesElement);
                highLightShipCellHit(shipsArrayElement.newShip, gameBoardPlayerNumber, coordinatesElement);
                highLightShipCell(gameBoardPlayerNumber, coordinatesElement);
            });
        });
    };

    function highLightShipCellSunk(newShip, gameBoardPlayerNumber, coordinatesElement) {
        if (newShip.isSunk()) {
            view.highlightShipCellSunk(gameBoardPlayerNumber, coordinatesElement);
        };
    };

    function highLightShipCellHit(newShip, gameBoardPlayerNumber, coordinatesElement) {
        if (newShip.hitsCoordinates) {
            newShip.hitsCoordinates.forEach(hitCoordinates => {
                if ((hitCoordinates.y == coordinatesElement.y) && (hitCoordinates.x == coordinatesElement.x)) {
                    view.highlightShipCellHit(gameBoardPlayerNumber, coordinatesElement);
                }
            });
        };
    };

    function highLightShipCell(gameBoardPlayerNumber, coordinatesElement) {
        view.highlightShipCell(gameBoardPlayerNumber, coordinatesElement);
    };




    function processCellClick(gameBoardPlayerNumber, hitCoordinates) {
        if(gameBoardPlayerNumber == 1) {
            gameBoardPlayer1.receiveHit(hitCoordinates);
            display(gameBoardPlayer1);
            if (gameBoardPlayer1.isGameOver()) 
                gameOver(gameBoardPlayerNumber);
        };
    };

    function gameOver(gameBoardPlayerNumber) {
        if (gameBoardPlayerNumber === 1)
            alert("Player 2 Won!");
        else 
            alert("Player 1 Won!");
    };

    return { display, initiateGame, processCellClick, processCellClickForPlacingShips };
};

const controller = controllerConstructor();
controller.initiateGame();



