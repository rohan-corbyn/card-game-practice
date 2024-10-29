import { cardGenerator } from "./cardGenerator";

const battleGrid = (function () {

    const build = () => {

        const battleGridEle = document.getElementById("battle-grid");
        const rows = 4;
        const cols = 7;
        const numCards = rows * (cols - 1);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cardSpaceEle = Object.assign(document.createElement("div"), { id: `card-space-r${row}-c${col}`, className: "card-space", row: row, col: col });
                battleGridEle.appendChild(cardSpaceEle);
            }
        }
    }

    const getCardSpaceAtPosition = (row, col) => {
        return document.getElementById(`card-space-r${row}-c${col}`);
    }

    const addDummyGameState = () => {
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 1; col++) {
                getCardSpaceAtPosition(row, col).appendChild(cardGenerator.createCard("archer"));
            }
        }
        for (let row = 0; row < 2; row++) {
            for (let col = 1; col < 3; col++) {
                getCardSpaceAtPosition(row, col).appendChild(cardGenerator.createCard("infantry"));
            }
        }
    }

    return { build, getCardSpaceAtPosition }
})();

export { battleGrid };