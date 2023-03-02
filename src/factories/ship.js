export { ship };

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
};