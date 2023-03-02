import './style.css';
export {ship, gameBoard};

const ship = (le) => {
    const length = le;
    let hits = 0;
    function hit() {
        this.hits++;
    }
    function isSunk() {
        return (this.hits == this.length) ? true : false;
    }
    return {length, hit, hits, isSunk};
}

const gameBoard = () => {
    const gameBoardSize = 9;
    const shipsArray = [];
    const missedHitsCoordinates = [];
    function createShip(length, coordinates) {
        // if (!areCoordinatesLegit(coordinates)) 
            // return;
        // isCoordinatesFree();
        const newShip = new ship(length);
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
                    shipsArrayElement.newShip.hit();
                    shipWasHit = true;
                }
            });
        });
        if (!shipWasHit) {
            missedHitsCoordinates.push(hitCoordinates);
        }
    };
    function isGameOver() {
        let thereIsLiveShip = false;
        shipsArray.forEach(shipsArrayElement => {
            console.log(shipsArrayElement.newShip.isSunk());
            if (!shipsArrayElement.newShip.isSunk()) {
                thereIsLiveShip = true;
            }
        });
        return (thereIsLiveShip) ? false : true;
    };

    return {createShip, shipsArray, receiveHit, missedHitsCoordinates, isGameOver};
}

// Fact class Player

// Interface

