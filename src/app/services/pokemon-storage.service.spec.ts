import { TestBed } from '@angular/core/testing';

import { PokemonStorageService } from './pokemon-storage.service';

describe('PokemonStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonStorageService = TestBed.get(PokemonStorageService);
    expect(service).toBeTruthy();
  });
});
