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

    function highlightShipCellSunk(gameBoardPlayerNumber, coordinatesElement) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("shipSunk");
    };

    function highlightShipCellHit(gameBoardPlayerNumber, coordinatesElement) {
        const cellID = translateCoordinatesToCellID(gameBoardPlayerNumber, coordinatesElement);
        const cell = document.querySelector(`#${cellID}`);
        cell.classList.add("shipHit");
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
            cell.addEventListener("click", processCellClick)
        });
    };

    function processCellClick(event) {
        const cellID = event.srcElement.id;
        const gameBoardPlayerNumber = Number(cellID.split("board")[1].split("cell")[0]);
        const coordinates = translateCellIDToCoordinates(cellID);
        controller.processCellClick(gameBoardPlayerNumber, coordinates);
    };

    return { highlightShipCell, highlightShipCellSunk, highlightShipCellHit, addEventListeners };
};

const view = viewConstructor();

// Controller
const controllerConstructor = () => {

    const gameBoardPlayer1 = gameBoard(1);

    function initiateGame() {
        const newShip = ship(3);
        // const gameBoard2 = gameBoard();
        // const player1 = player();
        // const player2 = player();
        gameBoardPlayer1.createShip(2, [{ y: 1, x: 2 }, { y: 1, x: 3 }]);
        gameBoardPlayer1.createShip(3, [{ y: 3, x: 1 }, { y: 3, x: 2 }, { y: 3, x: 3 }]);
        // gameBoardPlayer2.createShip(3, [{ y: 6, x: 2 }, { y: 6, x: 4 }]);
        // gameBoardPlayer2.createShip(3, [{ y: 6, x: 2 }, { y: 6, x: 4 }]);
        display(gameBoardPlayer1);
        view.addEventListeners();
    };

    function display(gameBoard) {
        loopOverShips(gameBoard.gameBoardPlayerNumber, gameBoard.shipsArray);
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
        }
        display(gameBoardPlayer1);
    };

    return { display, initiateGame, processCellClick };
};

const controller = controllerConstructor();
controller.initiateGame();



