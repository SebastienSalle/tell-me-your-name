import { render, screen } from '@testing-library/react';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

test('renders my name', () => {
  render(
    <Provider store={store} >
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Sébastien Sallé/i);
  expect(linkElement).toBeInTheDocument();
});
