const renderer = (function () {

    const renderGame = (battleGrid, playerStatus) => {
        document.getElementById("game-window").appendChild(renderBattleGrid(battleGrid));
        console.log(playerStatus)
        document.getElementById("game-window").appendChild(renderPlayerMenu(playerStatus));
    }

    const renderBattleGrid = (battleGrid) => {
        const battleGridEle = Object.assign(document.createElement("div"), { id: "battle-grid" });
        for (let row = 0; row < battleGrid.length; row++) {
            for (let col = 0; col < battleGrid[row].length; col++) {
                const cardSpace = battleGrid[row][col];
                const cardSpaceEle = Object.assign(document.createElement("div"), { id: `card-space-${row}-${col}`, className: "card-space " + battleGrid[row][col].owner + "-grid", row: row, col: col });
                if (cardSpace.card !== null && cardSpace.card !== undefined) {
                    cardSpaceEle.appendChild(renderCard(cardSpace.card));
                }
                battleGridEle.appendChild(cardSpaceEle);
            }
        }
        return battleGridEle;
    }

    const renderCard = (card) => {
        console.log(card)
        const cardEle = Object.assign(document.createElement("div"), { className: "card" + " " + card.owner });
        cardEle.setAttribute("card", card.type.name);
        const nameEle = Object.assign(document.createElement("h2"), { className: "card-title", innerText: card.type.name });
        const imageEle = Object.assign(document.createElement("img"), { className: "card-image", draggable: false });
        cardEle.appendChild(nameEle);
        cardEle.appendChild(imageEle)
        return cardEle;
    }

    const renderPlayerMenu = (playerStatus) => {
        const playerMenuEle = document.getElementById("player-menu");
        const deckEle = Object.assign(document.createElement("div"), { id: "deck" });
        playerMenuEle.appendChild(deckEle);
        const topCard = playerStatus.deckTopCard;
        const topCardEle = renderCard(topCard);
        topCardEle.id = "playable-card";
        topCardEle.draggable = "true";
        deckEle.appendChild(topCardEle);
        deckEle.appendChild(Object.assign(document.createElement("div"), { className: "card" }));
        deckEle.appendChild(Object.assign(document.createElement("div"), { className: "card" }));
        return playerMenuEle;
    }

    const renderPlayedCard = (cardSpace, newCard) => {
        cardSpace.appendChild(renderCard(newCard));
    }

    const renderDrawnCard = (nextCard) => {
        const deck = document.getElementById("deck");
        deck.removeChild(deck.firstChild);
        deck.insertBefore(renderCard(nextCard), deck.firstChild);
    }

    return { renderGame, renderPlayedCard, renderDrawnCard }
})()

export { renderer };
