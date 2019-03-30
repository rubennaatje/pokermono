import { Species } from './species';

describe('Species', () => {
  it('should create an instance', () => {
    expect(new Species(1,"abc","1")).toBeTruthy();
  });
});
