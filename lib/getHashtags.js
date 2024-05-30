const hashtagslanguage = ['Sumerian', 'cuneiform', 'cuneiforms']; // length = 3
const hashtagsSpecialism = ['sumerology', 'assyriology']; // length = 2
const hashtagsGeneric = [
  'language',
  'deadLanguage',
  'archeology',
  'history',
  'civilisation',
  'culture',
]; // length = 6
const hashtagsLocation = [
  'Sumer',
  'Akkad',
  'Babylon',
  'Mesopotamia',
  'MiddleEast',
]; // length = 5
const hashtagsTheme = ['learning', 'education', 'study', 'research']; // length = 4

// Get hashtags for the day.
const getHashtags = (day = 0) =>
  [
    hashtagslanguage[day % hashtagslanguage.length],
    hashtagsSpecialism[day % hashtagsSpecialism.length],
    hashtagsGeneric[day % hashtagsGeneric.length],
    hashtagsLocation[day % hashtagsLocation.length],
    hashtagsTheme[day % hashtagsTheme.length],
  ]
    .map((hashtag) => `#${hashtag}`)
    .join(' ');

export default getHashtags;
