import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../src/context/LanguageContext';

const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang-display">{language}</span>
      <button onClick={() => setLanguage('en')}>Switch to EN</button>
      <button onClick={() => setLanguage('fr')}>Switch to FR</button>
    </div>
  );
};

describe('Contexte : LanguageContext', () => {
  it('should allow manually changing the language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const display = screen.getByTestId('lang-display');
    const btnEn = screen.getByText('Switch to EN');
    const btnFr = screen.getByText('Switch to FR');

    fireEvent.click(btnEn);
    expect(display.textContent).toBe('en');

    fireEvent.click(btnFr);
    expect(display.textContent).toBe('fr');
  });
});