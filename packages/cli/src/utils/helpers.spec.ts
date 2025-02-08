import { traverseJson } from './helpers.js';

const baseJson = {
  tstt_plot_stronkest: {
    classType: 'dmPlotThread',
    plotStateLookup: {
      unstarted: 0,
      duell_accepted: 100,
      duell_won: 200,
      completed: 300,
    },
    dialogHooks: [
      {
        stateEquals: 'unstarted',
        dialogOptions: [
          {
            message: 'I bet my axe I am stronker than you.',
            responseScript: '@ref_tstt_pscr_stronkest_duell_accepted',
          },
        ],
        targetArc: '@ref_tstt_npc_orkleader',
      },
      {
        stateEquals: 'duell_won',
        dialogOptions: [
          {
            message: 'ME ARE STRONKER.',
            responseScript: '@ref_tstt_pscr_stronkest_completed',
          },
        ],
        targetArc: '@ref_tstt_npc_orkleader',
      },
    ],
  },
};
const baseJsonWithStrippedRefPrefixes = {
  tstt_plot_stronkest: {
    classType: 'dmPlotThread',
    plotStateLookup: {
      unstarted: 0,
      duell_accepted: 100,
      duell_won: 200,
      completed: 300,
    },
    dialogHooks: [
      {
        stateEquals: 'unstarted',
        dialogOptions: [
          {
            message: 'I bet my axe I am stronker than you.',
            responseScript: 'tstt_pscr_stronkest_duell_accepted',
          },
        ],
        targetArc: 'tstt_npc_orkleader',
      },
      {
        stateEquals: 'duell_won',
        dialogOptions: [
          {
            message: 'ME ARE STRONKER.',
            responseScript: 'tstt_pscr_stronkest_completed',
          },
        ],
        targetArc: 'tstt_npc_orkleader',
      },
    ],
  },
};

let inputJson: Record<string, unknown>;

beforeEach(() => {
  inputJson = structuredClone(baseJson);
});

describe('traverseJson(..)', () => {
  it('visits each key with primitive value including nested', () => {
    const keys: string[] = [];

    traverseJson(inputJson, (obj, key, val) => {
      keys.push(key);
    });

    expect(keys).toEqual([
      'classType',

      'unstarted',
      'duell_accepted',
      'duell_won',
      'completed',

      'stateEquals',
      'message',
      'responseScript',
      'targetArc',

      'stateEquals',
      'message',
      'responseScript',
      'targetArc',
    ]);
  });

  it('visits each key value pair with primitive value including nested', () => {
    const keyValuePairs: { key: string; val: unknown }[] = [];

    traverseJson(inputJson, (obj, key, val) => {
      keyValuePairs.push({ key, val });
    });

    expect(keyValuePairs).toEqual([
      { key: 'classType', val: 'dmPlotThread' },
      { key: 'unstarted', val: 0 },
      { key: 'duell_accepted', val: 100 },
      { key: 'duell_won', val: 200 },
      { key: 'completed', val: 300 },

      { key: 'stateEquals', val: 'unstarted' },
      { key: 'message', val: 'I bet my axe I am stronker than you.' },
      { key: 'responseScript', val: '@ref_tstt_pscr_stronkest_duell_accepted' },
      { key: 'targetArc', val: '@ref_tstt_npc_orkleader' },

      { key: 'stateEquals', val: 'duell_won' },
      { key: 'message', val: 'ME ARE STRONKER.' },
      { key: 'responseScript', val: '@ref_tstt_pscr_stronkest_completed' },
      { key: 'targetArc', val: '@ref_tstt_npc_orkleader' },
    ]);
  });

  it('handles empty arrays well', () => {
    const keys: string[] = [];

    traverseJson({ arrayProp: [] }, (obj, key, val) => {
      keys.push(key);
    });

    // there are no leaf property values of primitive datatypes in an the object including empty array. Hence there are no calls
    expect(keys).toEqual([]);
  });

  it('handles empty object well', () => {
    const keys: string[] = [];

    traverseJson({}, (obj, key, val) => {
      keys.push(key);
    });

    // there are no leaf property values of primitive datatypes in an the object. Hence there are no calls
    expect(keys).toEqual([]);
  });

  it('traverses each key', () => {
    const prefix = '@ref_';
    traverseJson(inputJson, (obj, key, val) => {
      // strip prefix from keys
      if (key.startsWith(prefix)) {
        obj[key] = key.replace(prefix, '');
      }
      // strip prefix from values
      if (typeof val === 'string' && val.startsWith(prefix)) {
        obj[key] = val.replace(prefix, '');
      }
    });

    expect(inputJson).toEqual(baseJsonWithStrippedRefPrefixes);
  });
});
