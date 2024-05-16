// Get the number of days elapsed since the launch of this bot.
// Updates everyday at 12am GMT.
const launchDay = 19860; // 17 May 2024
const getDay = () => Math.round(Date.now() / 1000 / 60 / 60 / 24) - launchDay;

// Replace numbers by their subscript equivalents.
const subscripts = '₀₁₂₃₄₅₆₇₈₉'.split('');
const subscriptise = (str = '') =>
  str.replace(
    /([abdegik-npr-uzĝšḫ])([0-9]{1,2})\b/gu,
    (...args) =>
      args[1] + // Letter
      args[2] // Numbers
        .split('')
        .map((num) => subscripts[num])
        .join(''),
  );

// For reference, may be needed one day.
// The lack of accented superscripts for ĝ, š and ḫ is problematic.
const superscripts = 'ᵃᵇᵈᵉᵍᶦᵏˡᵐⁿᵖʳˢᵗᵘᶻĝšḫ';

export { getDay, subscriptise };
