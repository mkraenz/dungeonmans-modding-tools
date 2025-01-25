import { jsToEntitydef } from './js-to-entitydef';

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
});
