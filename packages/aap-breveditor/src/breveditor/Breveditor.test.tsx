import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Breveditor } from './Breveditor';
import { render, screen } from '@testing-library/react';

describe('Breveditor', () => {
  const setContentMock = vi.fn();

  test('tegner breveditoren', async () => {
    render(<Breveditor brukEditor={true} setContent={setContentMock} readOnly={false} />);
    const editor = await screen.findByTestId('breveditor');
    expect(editor).toBeInTheDocument();
  });

  test('skal vise editor ikon dersom det ikke er readonly', async () => {
    render(<Breveditor brukEditor={true} setContent={setContentMock} readOnly={false} />);
    const ikon = screen.getByRole('img', {
      name: /rediger tekst/i,
    });

    expect(ikon).toBeInTheDocument();
  });

  test('skal ikke vise editor ikon dersom det er readonly', async () => {
    render(<Breveditor brukEditor={true} setContent={setContentMock} readOnly={true} />);
    const ikon = screen.queryByRole('img', {
      name: /rediger tekst/i,
    });

    expect(ikon).not.toBeInTheDocument();
  });
});
