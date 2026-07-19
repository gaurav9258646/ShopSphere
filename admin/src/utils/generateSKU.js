const categoryCodes = {
    Mobile: "MOB",
    Laptop: "LAP",
    Electronics: "ELE",
    Fashion: "FAS",
    Shoes: "SHO",
    Watch: "WAT",
    Grocery: "GRO",
    Furniture: "FUR",
    Beauty: "BEA",
    Books: "BOO",
};

const generateSKU = (categoryName, productName) => {

    if (!categoryName || !productName) return "";

    const categoryCode =
        categoryCodes[categoryName] || "GEN";

    const productCode = productName
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .substring(0, 8);

    const random = Math.floor(
        100 + Math.random() * 900
    );

    return `${categoryCode}-${productCode}-${random}`;

};

export default generateSKU;