// Mock for boxen module
module.exports = function boxen(text, options) {
  return `[BOXEN MOCK] ${text}`;
};

// Export chalk mock as well if needed
module.exports.chalk = {
  red: (text) => `[RED] ${text}`,
  green: (text) => `[GREEN] ${text}`,
  yellow: (text) => `[YELLOW] ${text}`,
  blue: (text) => `[BLUE] ${text}`,
  bold: (text) => `[BOLD] ${text}`
}; 