import { describe, expect, it } from 'vitest';
import { removeIllegalCharacters } from '../tiptapMapper';

describe('Filtrering av ugyldige teng', () => {
  it('Fjerner ugyldige tegn', () => {
    expect(removeIllegalCharacters('tekst﻿‌‍123')).toBe('tekst123')
  })
});
