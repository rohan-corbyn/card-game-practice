const card = (function () {

    const cardTypes = {
        infantry: {
            name: "infantry",
            hp: 1
        },
        archer: {
            name: "archer",
            hp: 1
        },
        trebuchet: {
            name: "trebuchet",
            hp: 1
        }
    };

    const cardTypeKeys = Object.keys(cardTypes);

    const createCard = (player, type) => {
        const cardType = type === undefined ? cardTypes[cardTypeKeys[cardTypeKeys.length * Math.random() << 0]] : cardTypes[type];
        return { owner: player, type: cardType };
    }


    return { createCard }
})();

export { card };