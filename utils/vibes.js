const Wine = require("../models/Wine.model");

async function vibeArrays() {
  const product = await Wine.find();

  const productVibes = [
    "Summer Party Night",
    "Home Alone",
    "Me & Some Friends of Mine",
    "Hot Girls Summer",
  ];

  const summerParty = product.filter(
    (item) => item.product_vibe === "Summer Party Night"
  );
  const homeAlone = product.filter(
    (item) => item.product_vibe.vibe === "Home Alone"
  );
  const meAndSomeFriends = product.filter(
    (item) => item.product_vibe === "Me & Some Friends of Mine"
  );
  const hotGirlSummer = product.filter(
    (item) => item.product_vibe === "Hot Girls Summer"
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
