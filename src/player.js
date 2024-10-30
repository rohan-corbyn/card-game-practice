import { card } from "./card";

const player = (function () {
    const deck = [];
    const deckSize = 12;

    const build = () => {
        for (let i = 0; i < deckSize; i++) {
            deck.push(card.createCard("player"));
        }
        console.log(deck)
    }
    const getStatus = () => {
        return { deckTopCard: deck[0] }
    };

    const getNextCard = () => {
        return deck.pop();
    }


    return { build, getStatus, getNextCard };
})();

export { player };