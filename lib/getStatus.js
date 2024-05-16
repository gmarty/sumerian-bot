import getGlyph from './getGlyph.js';

// Get a status for the day.
const getStatus = (day = 0) => {
  const { glyph, reading, meaning } = getGlyph(day);
  let status = `${glyph}

Reading: ${reading}`;

  if (meaning) {
    status += `
Meaning: ${meaning}`;
  }

  return status;
};

export default getStatus;
