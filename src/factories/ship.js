export { ship };

const ship = (le) => {
    const length = le;
    let hits = 0;
    let hitsCoordinates = [];
    function hit(coordinates) {
        this.hits++;
        this.hitsCoordinates.push(coordinates);
    };
    function isSunk() {
        return (this.hits == this.length) ? true : false;
    };
    return {length, hit, hits, isSunk, hitsCoordinates};
};