import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';
import './asset/materialize';
import './asset/jquery';
import './asset/font.css';
import './asset/main.css';
import './asset/style.css';

import MainLayout from '../../ui/containers/MainLayout.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <MainLayout />,
    document.getElementById('app')
  );
});
