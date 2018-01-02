//no need to specify relative path, it assumes to check in node modules, no need to import it to any variable
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //to allow child nested components to access parent store
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
//Action creators are used to initiate change and modify state in redux applications
import App from './components/App';
import reducers from './reducers';
//1st - reducer, 2nd for server rendering pls provide initial state, 3rd applyMiddleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  //use JSX tag coz reactDom expects a component instance which we generate by using jsx tag
  //2nd argument is a reference to an existing Dom node in our app
  //hooked up redux store through provider at the top level of the application by passing it as a prop and keeping the App component as its child
  //Provider is a react component that knows how to read changes from the redux store any time redux store gets new state produced inside of it,
  //the Provider will inform all of its children components essentially all of App's children too, and will update/rerender all of those components with the new state
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
); //takes 2 arguments, root (our App which has the routing logic) argument and where we are going to render our component to the DOM
