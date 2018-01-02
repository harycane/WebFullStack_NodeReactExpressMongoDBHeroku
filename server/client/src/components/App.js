//app for view and index for redux data
import React, { Component } from 'react';
//BrowserRouter obj looks at current url and changes components at any given time
//Route obj sets up a rule between a route and set of components that will be visible
import { BrowserRouter, Route } from 'react-router-dom'; //contains helpers to navigate around the browser Dom
//connect is used for components to call action creators
import { connect } from 'react-redux';
//imported all action creators
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

//refactor it to class comp so that lifecyclemethod will get automatically called when this component is rendered to screen.
//Functional component
//BrowserRouter can allow only atmost one child
// "/" means root route like emaily.com; whenever user goes to root route showing landing component
//exact={true}/exact to ensure that path subset to url is not rendered as well
//Header will be shown always since  it is not tied to any Route configuration
//did mount will be used to make initial ajax call, willmount might get called multiple items

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//first paranthesis for map state props argument
//2nd argument is all actions; they are assigned to App as props
export default connect(null, actions)(App);
