import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { RootState } from '../types/redux/reducers/rootReducer.type';
import { AppActions } from '../types/redux/actions/root.type';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware<{}>();
const store = createStore<RootState, AppActions, any, any>(
  rootReducer,
  composeWithDevTools(
    applyMiddleware<SagaMiddleware, RootState>(sagaMiddleware)
  )
);

sagaMiddleware.run<typeof rootSaga>(rootSaga);
export default store;
