import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

test('teste app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(true).toBeTruthy();
});
