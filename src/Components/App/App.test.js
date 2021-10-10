import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'Components/App/App';

test('renders app with "Interactive Map" text', () => {
    render(<App />);
    const linkElement = screen.getByText(/Interactive Map/i);
    expect(linkElement).toBeInTheDocument();
});
