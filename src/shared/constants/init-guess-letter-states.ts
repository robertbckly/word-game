import type { GuessLetterStates } from '../types/types';

export const INIT_GUESS_LETTER_STATES = [
  'unused',
  'unused',
  'unused',
  'unused',
  'unused',
] as const satisfies GuessLetterStates;
