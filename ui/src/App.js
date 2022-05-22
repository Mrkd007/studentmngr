import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Home from './components/Home';
import rootReducer from './redux/reducers/index';
import createSagaMiddleware from 'redux-saga';
import uiSaga from './redux/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(uiSaga);

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>  
  );
}

export default App;
