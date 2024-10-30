import { battlegrid } from "./battlegrid.js";
import { card } from "./card.js";
import { player } from "./player.js";
import { renderer } from "./renderer.js"

const manager = (function () {

    const rows = 4;
    const cols = 7;
    let currentTurn = 11;
    const turns = Math.floor(cols / 2) * rows;

    const playableCardId = "playable-card";

    const initGame = () => {
        battlegrid.build(rows, cols);
        player.build();
        renderer.renderGame(battlegrid.getBattleGrid(), player.getStatus());
    }

    const playGame = () => {
        const gameOver = false;
        initPlayerEvents();
    }

    const initPlayerEvents = () => {

        const playableCard = document.getElementById(playableCardId);
        const cardSpaces = document.querySelectorAll(".card-space.player-grid");

        playableCard.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });

        cardSpaces.forEach((cardSpace) => {

            cardSpace.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            cardSpace.addEventListener("dragenter", () => {
                cardSpace.classList.add("hovered");
            });

            cardSpace.addEventListener("dragleave", () => {
                cardSpace.classList.remove("hovered");
            });

            cardSpace.addEventListener("drop", (event) => {
                event.preventDefault();
                if (!cardSpace.hasChildNodes() && currentTurn <= turns) {
                    handleGameTurn(event, cardSpace);
                }
            });
        })

        const handleGameTurn = (event, playerSpaceChoice) => {
            handlePlayerTurn(event, playerSpaceChoice);
            handleComputerTurn();
            initPlayerTurn();

            if (currentTurn === turns) {
                endGame();
            } else {
                currentTurn++;
            }
        }

        const handlePlayerTurn = (event, cardSpace) => {
            const draggedCardId = event.dataTransfer.getData("text");
            const draggedCard = document.getElementById(draggedCardId);
            const cardPosition = battlegrid.getCardSpaceElementPositionFromId(cardSpace.id);
            const newCard = card.createCard("player", draggedCard.getAttribute("card"));
            battlegrid.placeCard(cardPosition.row, cardPosition.col, newCard);
            renderer.renderPlayedCard(cardSpace, newCard);
            const nextCard = player.getNextCard();
            renderer.renderDrawnCard(nextCard);
        }

        const handleComputerTurn = () => {
            let choiceMade = false;
            let row = randomIntFromInterval(0, 3)
            let col = randomIntFromInterval(3, 6)

            while (!choiceMade) {
                row = randomIntFromInterval(0, 3)
                col = randomIntFromInterval(4, 6)
                if (!battlegrid.getCardSpaceElementAtPosition(row, col).hasChildNodes()) {
                    choiceMade = true;
                    break;
                }
            }

            const newCard = card.createCard("computer");
            battlegrid.placeCard(row, col, newCard);
            const cardSpace = battlegrid.getCardSpaceElementAtPosition(row, col);
            renderer.renderPlayedCard(cardSpace, newCard);
        }

        const initPlayerTurn = () => {
            const deck = document.getElementById("deck");
            deck.firstChild.setAttribute("draggable", true);
            deck.firstChild.id = playableCardId;
            deck.firstChild.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", event.target.id);
            });
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function endGame() {
        resolveBattle();
    }

    async function resolveBattle() {
        for (let row = 0; row < rows; row++) {
            if (row % 2 === 0) {
                for (let col = 0; col < cols; col++) {
                    await resolveTurn(row, col, 1);
                }
            } else {
                for (let col = cols - 1; col >= 0; col--) {
                    await resolveTurn(row, col, -1);
                }
            }

        }

        async function resolveTurn(row, col, direction) {


            const secondDelay = () => {
                return new Promise(resolve => setTimeout(resolve, 1000));
            };
            const resolvingSpace = battlegrid.getCardSpaceElementAtPosition(row, col);
            resolvingSpace.classList.add("resolving");
            let delayres = await secondDelay();
            const card = resolvingSpace.firstChild;
            if (card !== null && card.getAttribute("card") === "infantry") {
                resolveInfantryCard();
            }

            resolvingSpace.classList.remove("resolving");


            function resolveInfantryCard() {

                const nextSpace = battlegrid.getCardSpaceElementAtPosition(row, col + direction);
                if (nextSpace != null) {
                    if (nextSpace.firstChild === null) {
                        nextSpace.appendChild(card);
                    }
                }
            }

        }




    }
    return { initGame, playGame }
})();

export { manager };

