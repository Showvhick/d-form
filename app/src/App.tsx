import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  const persistor = persistStore(store);

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
