import { RefTransformer } from './ref.transformer.js';

it('returns the original string if there are no refs', () => {
  const str = 'hi';
  const transform = new RefTransformer(str);

  expect(transform.strippedStr).toEqual('hi');
  expect(transform.containedRefs).toEqual([]);
});

it('works when the original str is a single ref', () => {
  const str = '@ref(hi)';
  const transform = new RefTransformer(str);

  expect(transform.containedRefs).toEqual(['hi']);
  expect(transform.strippedStr).toEqual('hi');
});

it('works when the original str has two consecutive refs', () => {
  const str = '@ref(hello)@ref(world)';
  const transform = new RefTransformer(str);

  expect(transform.containedRefs).toEqual(['hello', 'world']);
  expect(transform.strippedStr).toEqual('helloworld');
});

it('works when the original str has two refs separated by comma', () => {
  const str = '@ref(hello),@ref(world)';
  const transform = new RefTransformer(str);

  expect(transform.containedRefs).toEqual(['hello', 'world']);
  expect(transform.strippedStr).toEqual('hello,world');
});

it('works when for dmans steakdata', () => {
  const str = '100,0,1,@ref(sp_so_many_bites)';
  const transform = new RefTransformer(str);

  expect(transform.containedRefs).toEqual(['sp_so_many_bites']);
  expect(transform.strippedStr).toEqual('100,0,1,sp_so_many_bites');
});
