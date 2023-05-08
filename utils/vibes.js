const Wine = require("../models/Wine.model");

async function vibeArrays() {
  const product = await Wine.find();

  const productVibes = [
    "summer party night",
    "home alone",
    "me&some friends of mine",
    "hot girls summer",
  ];

  const summerParty = product.filter(
    (item) => item.product_vibe === "summer party night"
  );
  const homeAlone = product.filter(
    (item) => item.product_vibe === "home alone"
  );
  const meAndSomeFriends = product.filter(
    (item) => item.product_vibe === "me&some friends of mine"
  );
  const hotGirlSummer = product.filter(
    (item) => item.product_vibe === "hot girls summer"
  );

  return {
    productVibes,
    summerParty,
    homeAlone,
    meAndSomeFriends,
    hotGirlSummer,
  };
}

module.exports = {
  vibeArrays,
};
