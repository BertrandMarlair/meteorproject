import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import './asset/materialize';
import './asset/jquery';
import './asset/font.css';
import './asset/main.css';
import './asset/style.css';

import MainLayout from '../../ui/containers/MainLayout.jsx';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

Meteor.startup(() => {
  ReactDOM.render(
    <Main />,
    document.getElementById('app')
  );
});


    
const Main = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <MainLayout />
  </MuiThemeProvider>
);