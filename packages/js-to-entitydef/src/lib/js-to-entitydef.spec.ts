import { jsToEntitydef } from './js-to-entitydef.js';

describe('jsToEntitydef', () => {
  it('should work', () => {
    const result = jsToEntitydef('mymonster', {
      test: 1,
      hello: false,
      'asd fasdf': 'totally nice string',
    });

    expect(result).toEqual(`entityDef "mymonster"
{
    test 1
    hello false
    "asd fasdf" "totally nice string"
}
`);
  });

  it('should strip ref prefixes', () => {
    const result = jsToEntitydef(
      'mymonster',
      {
        test: 1,
        hello: false,
        shouldGetStripped: '@ref_totally nice string',
        shouldStay1: 'totally nice string_@ref_',
        shouldStay2: 'totally nice @ref_string',
        shouldStay3: '@reftotally nice _string',
        '@ref_shouldGetStrippedRefKey': 'hello',
      },
      { stripPrefix: '@ref_' }
    );

    expect(result).toEqual(`entityDef "mymonster"
{
    test 1
    hello false
    shouldGetStripped "totally nice string"
    shouldStay1 "totally nice string_@ref_"
    shouldStay2 "totally nice @ref_string"
    shouldStay3 "@reftotally nice _string"
    shouldGetStrippedRefKey "hello"
}
`);
  });
});
