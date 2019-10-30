import { randomInt, randomOf } from '@reverse/random';
import { format } from '@reverse/string';

import { state } from '..';
import { RandomEventAction } from '../state';

/** The two different outcomes of a random event. */
type RandomEventOutcome = 'good' | 'bad';
/** A collection of titles for random events. */
type RandomEventTitles = { [K in RandomEventOutcome]: string[] };
/** A collection of format templated for events. */
interface RandomEventEvents {
  good: { [type: string]: string[] };
  bad: { [type: string]: string[] };
}

/** Provides the sentance and actions for a random event. */
interface RandomEventDetails {
  /** The sentance to be displayed along with the random event. */
  setance: string;
  /** The actions that could be taken. */
  actions: RandomEventAction[];
}

const RANDOM_EVENT_OUTCOMES: RandomEventOutcome[] = ['good', 'bad'];
const RANDOM_EVENT_TITLES: RandomEventTitles = {
  good: ['Yay!', 'Oh yeah!', 'It\'s your lucky day!', 'Aw man...'],
  bad: ['Uh oh!', 'Aw snap.', 'Darn...', 'Oh well...']
};
const randomEventEvents: string[] = ['PAY_RAISE', 'FOUND', 'PAY_CUT', 'BROKE'];
const RANDOM_EVENT_EVENTS: RandomEventEvents = {
  good: {
    PAY_RAISE: [],
    FOUND: []
  },
  bad:  {
    PAY_CUT: [],
    BROKE: []
  }
};

/** Returns a setance anc actions for a random event. */
function buildEventDetails(outcome: RandomEventOutcome): RandomEventDetails {
  const eventDetails = {
    setance: '',
    actions: []
  };
  const randomEventEvent = randomOf(randomEventEvents);

  // TODO: Generate sentance.
  eventDetails.setance = format(randomOf(RANDOM_EVENT_EVENTS[outcome][randomEventEvent]));

  // TODO: Generate actions.

  // Return the details.
  return eventDetails;
}

/** Creates a random event. */
export function createRandomEvent() {
  // Choose whether the event is good or bad.
  const outcome = randomOf(RANDOM_EVENT_OUTCOMES);

  // Get the setance and actions for the event.
  const eventDetails = buildEventDetails(outcome);

  // Create the random event.
  state.randomEvent = {
    title: randomOf(RANDOM_EVENT_TITLES[outcome]),
    sentance: eventDetails.setance,
    actions: eventDetails.actions
  };
}

/** Trigger a random event 10% of the time. */
export function checkRandomEvent() {
  // Trigger a new event 10% of the time.
  if(randomInt(0, 10) === 0) {
    createRandomEvent();
  }
}
