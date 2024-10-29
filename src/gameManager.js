import { battleGrid } from "./battlegrid.js";
import { cardGenerator } from "./cardGenerator.js";
import { playerMenu } from "./playerMenu.js";

const gameManager = (function () {

    const player = "player";
    const computer = "computer";

    const playableCardId = "playable-card";
    let currentTurn = player;

    const initGame = () => {
        battleGrid.build();
        playerMenu.build();
    }

    const playGame = () => {
        const gameOver = false;
        initPlayerEvents();
    }

    const initPlayerEvents = () => {

        const playableCard = document.getElementById(playableCardId);
        const cardSpaces = document.querySelectorAll(".card-space");

        playableCard.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
            console.log(event.target);
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
                console.log(cardSpace.hasChildNodes)
                if (!cardSpace.hasChildNodes()) {
                    handlePlayerTurn(event, cardSpace);
                }
            });
        })

        const handlePlayerTurn = (event, cardSpace) => {
            const draggedCardId = event.dataTransfer.getData("text");
            const draggedCard = document.getElementById(draggedCardId);
            cardSpace.appendChild(draggedCard);
            draggedCard.removeAttribute("id");
            draggedCard.removeAttribute("draggable");
            cardSpace.classList.remove("hovered");
            const deck = document.getElementById("deck");
            deck.insertBefore(cardGenerator.createCard("archer"), deck.firstChild);
            handleComputerTurn();
        }

        const handleComputerTurn = () => {
            let choiceMade = false;
            let row = randomIntFromInterval(0, 3)
            let col = randomIntFromInterval(3, 6)


            while (!choiceMade) {
                row = randomIntFromInterval(0, 3)
                col = randomIntFromInterval(4, 6)
                if (!battleGrid.getCardSpaceAtPosition(row, col).hasChildNodes()) {
                    choiceMade = true;
                    break;
                }
            }

            battleGrid.getCardSpaceAtPosition(row, col).appendChild(cardGenerator.createCard("archer", computer));
            currentTurn = player;
            const deck = document.getElementById("deck");
            deck.firstChild.setAttribute("draggable", true);
            deck.firstChild.id = playableCardId;
            deck.firstChild.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", event.target.id);
                console.log(event.target);
            });
        }

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

    }

    return { initGame, playGame }
})();

export { gameManager };

