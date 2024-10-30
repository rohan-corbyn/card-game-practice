import { card } from "./card";

const battlegrid = (function () {


    let battleGrid = [];

    const build = (rows, cols) => {
        const numCards = rows * (cols - 1);
        battleGrid = createBattleGrid(rows, cols);
        addDummyGameState(battleGrid);
        return battleGrid;
    }

    const createBattleGrid = (rows, cols) => {

        const battlegrid = [];
        for (let row = 0; row < rows; row++) {
            battlegrid[row] = [];
            for (let col = 0; col < cols; col++) {
                if (col < 3) {
                    battlegrid[row][col] = { owner: "player", card: null }
                } else if (col === 3) {
                    battlegrid[row][col] = { owner: "no-mans", card: null }
                } else {
                    battlegrid[row][col] = { owner: "computer", card: null }
                }
            }
        }
        return battlegrid;
    }

    const placeCard = (row, col, card) => {
        battleGrid[row][col] = card;
    }

    const getCardSpaceElementAtPosition = (row, col) => {
        return document.getElementById(`card-space-${row}-${col}`);
    }

    const getCardSpaceElementPositionFromId = (id) => {
        const split = id.split('-');
        console.log(split);
        return {row: split[2], col: split[3]};
    }

    const addDummyGameState = (battlegrid) => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                battlegrid[row][col].card = card.createCard("player");
            }
        }
        for (let col = 0; col < 1; col++) {
            battlegrid[3][col].card = card.createCard("player");
        }

        for (let row = 0; row < 3; row++) {
            for (let col = 4; col < 7; col++) {
                battlegrid[row][col].card = card.createCard("computer");
            }
        }
        for (let col = 5; col < 6; col++) {
            battlegrid[3][col].card = card.createCard("computer");
        }
    }

    const getBattleGrid = () => {return battleGrid};

    return { build, getCardSpaceElementAtPosition, getCardSpaceElementPositionFromId, getBattleGrid, placeCard}
})();

export { battlegrid };