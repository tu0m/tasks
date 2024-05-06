// import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';

import App from './App';

// TODO: add tests

describe('App', () => {
    it('renders App', () => {
        render(<App />);

        screen.debug();

        // check if App component renders
    });
});