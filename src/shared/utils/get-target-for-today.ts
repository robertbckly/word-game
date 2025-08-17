import seedrandom from 'seedrandom';
import { TARGET_WORDS } from '../constants/constants';

const FALLBACK = 'apple';

// Create pseudorandom number seeded with today's date
// (for the module, not for each function call)
const today = new Date();
const random = seedrandom(today.toDateString())();

export const getTargetForToday = (): string => {
  // Note: although `.length` is used, the random index is floored, so it can't
  // possibly exceed the greatest index
  const targetWordsLength = TARGET_WORDS.length;
  const randomTargetIndex = Math.floor(random * targetWordsLength);
  return TARGET_WORDS[randomTargetIndex] || FALLBACK;
};
