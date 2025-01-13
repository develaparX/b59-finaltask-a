function registerHelpers(hbs) {
  hbs.registerHelper("eq", (a, b) => a === b);
}

module.exports = { registerHelpers };
