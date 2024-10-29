import { cardGenerator } from "./cardGenerator"; 


const playerMenu = (function () {

    const build = () => {
        const playerMenuEle = document.getElementById("player-menu");
        const deckEle = Object.assign(document.createElement("div"), {id:"deck"});
        playerMenuEle.appendChild(deckEle);
        deckEle.appendChild(cardGenerator.createCard("infantry"));
        deckEle.appendChild(Object.assign(document.createElement("div"), {className:"card"}));
        deckEle.appendChild(Object.assign(document.createElement("div"), {className:"card"}));
    }
    
    return { build }
})()



export { playerMenu };