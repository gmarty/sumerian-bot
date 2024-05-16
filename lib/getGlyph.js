import corpus from './corpus.js';

const getGlyph = (day = 0) => corpus[day % corpus.length];

export default getGlyph;
