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
        const cellsArray = document.querySelectorAll(".cell.player2");
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

    function removeAllEventListeners() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.removeEventListener("click", processCellClick);
        });
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

    return { highlightShipCell, highlightShipCellSunk, highlightShipCellHit, highlightMissedHit, addEventListeners, addEventListenersForPlacingShips, removeEventListenersForPlacingShips, removeAllEventListeners };
};

const view = viewConstructor();

// Controller
const controllerConstructor = () => {

    let gameBoardPlayer1;
    let gameBoardPlayer2;
    let shipsLengths;
    let whosTurnForGameboard;
    let whichPlayersMove = 1;

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

        for (let i = 0; i < 5; i++) {
            let coordinates = {};
            do {
                let y = getRandomNumber(10);
                let x = getRandomNumber(9 - shipsLengths[shipsLengths.length - 1] + 2);
                coordinates = { y, x };
            } while (!gameBoardPlayer2.checkIfCoordinatesAvailable(2, coordinates));
            processCellClickForPlacingShips(coordinates);
        };
    };

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    };

    function startGame() {
        display(gameBoardPlayer1);
        console.log("start game");
        view.addEventListeners();
    };

    function display(gameBoard) {
        loopOverShipsToHighlight(gameBoard.gameBoardPlayerNumber, gameBoard.shipsArray);
        loopOverMissedHitsToHighlight(gameBoard);
    };
    
    function loopOverShipsToHighlight(gameBoardPlayerNumber, shipsArray) {
        shipsArray.forEach(shipsArrayElement => {
            shipsArrayElement.coordinates.forEach(coordinatesElement => {
                highLightShipCellSunk(shipsArrayElement.newShip, gameBoardPlayerNumber, coordinatesElement);
                highLightShipCellHit(shipsArrayElement.newShip, gameBoardPlayerNumber, coordinatesElement);
                if (gameBoardPlayerNumber == 1) {
                    highLightShipCell(gameBoardPlayerNumber, coordinatesElement);
                };
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

    function loopOverMissedHitsToHighlight(gameBoard) {
        gameBoard.missedHitsCoordinates.forEach(missedHitCoordinatesElement => {
            view.highlightMissedHit(gameBoard.gameBoardPlayerNumber, missedHitCoordinatesElement);
        });
    };

    function processCellClick(gameBoardPlayerNumber, hitCoordinates) {
        if(gameBoardPlayerNumber == 1) {
            gameBoardPlayer1.receiveHit(hitCoordinates);
            display(gameBoardPlayer1);
        } else {
            gameBoardPlayer2.receiveHit(hitCoordinates);
            makePChit();
            display(gameBoardPlayer2);
        };
        isGameOver();
    };

    function isGameOver() {
        if (gameBoardPlayer1.isGameOver()) 
            gameOver(gameBoardPlayer1);
        else if (gameBoardPlayer2.isGameOver())
            gameOver(gameBoardPlayer2);
    };

    function gameOver(gameBoard) {
        if (gameBoard.gameBoardPlayerNumber === 1)
            alert("Player 2 Won!");
        else 
            alert("Player 1 Won!");
        view.removeAllEventListeners();
    };

    function makePChit() {
        let y = getRandomNumber(10);
        let x = getRandomNumber(10);
        const hitCoordinates = { y, x };
        processCellClick(1, hitCoordinates)
    };

    return { display, initiateGame, processCellClick, processCellClickForPlacingShips };
};

const controller = controllerConstructor();
controller.initiateGame();



