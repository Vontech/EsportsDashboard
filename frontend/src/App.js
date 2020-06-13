import React, { Component } from "react";
import { GlobalHotKeys } from "react-hotkeys";

import Colors from "./colors";
import { message } from 'antd';

import '../node_modules/antd/dist/antd.css';

import LoginPanel from "./components/LoginPanel.js"
import DrawerPanel from "./components/DrawerPanel.js"

import EsportsDashboardApi from './utils/api';

import { configure } from 'react-hotkeys';

configure({
  /**
   * The level of logging of its own behaviour React HotKeys should perform.
   */
  logLevel: 'none',

});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appState: 'unknown',
      preferences: {}
    }
    this.api = new EsportsDashboardApi();
    console.log(this.api.isLoggedIn())
    if (this.api.isLoggedIn()) {
      this.state.appState = 'logged-in'
    } else {
      this.state.appState = 'logged-out'
    }
  }

  getAppContext() {
    return {
      api: this.api,
      updatePrefs: this.udpdatePreferences.bind(this),
      preferences: this.state.preferences
    }
  }

  componentDidMount() {

    this.api.getPreferences()
      .then((result) => console.log(result))
      .catch((result) => console.log(result))

    this.api.getPreferences()
      .then((res) => {
        this.udpdatePreferences(res.data)
      })

  }

  udpdatePreferences(newPreferences) {
    this.setState({preferences: newPreferences});
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };

  hideDrawer = () => {
    this.setState({
      drawerVisible: false,
    });
  }

  handleLogout = () => {
    this.api.logout()
      .then(() => this.showLogin())
  }

  showLogin = () => {
    this.setState({ appState: 'logged-out' });
  }

  showMainPanel = () => {
    this.setState({ appState: 'logged-in' })
  }

  attemptLogin = (loginValues) => {
    this.api.login(loginValues.username, loginValues.password)
      .then(() => { this.showMainPanel() })
      .catch((err) => { console.log(err) })
  }

  getLoginPane() {
    return (
      <div style={{ height: "100%" }}>
        <LoginPanel context={this.getAppContext()} finish={this.showMainPanel.bind(this)} />
      </div>
    )
  }

  getRegistrationPane() {
    return (
      <div>
        Register
      </div>
    )
  }

  getDrawer() {
    return (
      <DrawerPanel
        context={this.getAppContext()}
        handleLogout={this.handleLogout}  />
    )
  }

  getMainPanel() {
    return (
      <div>
        <div>Main content here!</div>
        {this.getDrawer()}
      </div>
    )
  }

  render() {
    return (
      <div id="primary-panel">
        {/*BezierCurve(200, 200, "0 0", "20 50", "20 150", "200 200", "red" )*/}
        {this.state.appState === 'unknown' && <div />}
        {this.state.appState === 'logged-out' && this.getLoginPane()}
        {this.state.appState === 'registering' && this.getRegistrationPane()}
        {this.state.appState === 'logged-in' && this.getMainPanel()}
      </div>
    );
  }
}

export default App;
