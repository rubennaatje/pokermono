import { MockPokemon } from './mock-pokemon';

describe('MockPokemon', () => {
  it('should create an instance', () => {
    expect(new MockPokemon()).toBeTruthy();
  });
});
