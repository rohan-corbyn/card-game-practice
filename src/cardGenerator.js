const cardGenerator = (function () {

    const cardTypes = {
        infantry: {
            name: "infantry",
            hp: 1
        },
        archer: {
            name: "archer",
            hp: 1
        }
    };

    const createCard = (name) => {
        const cardType = cardTypes[name];
        const cardEle = Object.assign(document.createElement("div"), { className: "card" });
        const nameEle = Object.assign(document.createElement("h2"), { className: "card-title", innerText: cardType.name });
        const imageEle = Object.assign(document.createElement("img"), { className: "card-image " + cardType.name });
        cardEle.appendChild(nameEle);
        cardEle.appendChild(imageEle)
        return cardEle;
    }

    return { createCard }
})();

export { cardGenerator };