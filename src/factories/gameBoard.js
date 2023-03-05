export { gameBoard };
import { ship } from "./ship.js";

const gameBoard = (playerNumber) => {
    const gameBoardPlayerNumber = playerNumber;
    const gameBoardSize = 10;
    const shipsArray = [];
    const missedHitsCoordinates = [];
    let areAllShipsPlaced = false;
    function createShip(length, coordinates) {
        // if (!areCoordinatesLegit(coordinates)) 
            // return;
        // isCoordinatesFree();
        const newShip = ship(length);
        shipsArray.push({ newShip, coordinates });
    };
    function areCoordinatesLegit(coordinates) {
        if ((coordinates.x >= 0) 
            && (coordinates.x < gameBoardSize) 
            && (coordinates.y >= 0) 
            && (coordinates.y < gameBoardSize)) {
                return true
            } else return false;
    };
    function receiveHit(hitCoordinates) {
        let shipWasHit = false;
        shipsArray.forEach(shipsArrayElement => {
            shipsArrayElement.coordinates.forEach(shipCoordinates => {
                if (JSON.stringify(hitCoordinates) == JSON.stringify(shipCoordinates)) {
                    shipsArrayElement.newShip.hit(hitCoordinates);
                    shipWasHit = true;
                };
            });
        });
        if (!shipWasHit) {
            missedHitsCoordinates.push(hitCoordinates);
        };
    };
    function isGameOver() {
        let thereIsLiveShip = false;
        shipsArray.forEach(shipsArrayElement => {
            if (!shipsArrayElement.newShip.isSunk()) {
                thereIsLiveShip = true;
            }
        });
        return (thereIsLiveShip) ? false : true;
    };
    return {createShip, shipsArray, receiveHit, missedHitsCoordinates, isGameOver, gameBoardPlayerNumber, areAllShipsPlaced};
};