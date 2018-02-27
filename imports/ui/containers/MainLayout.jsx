import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore } from 'redux';

import Header from '../components/Header/Header';
import FooterMain from '../components/Footer/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import FormRegister from '../pages/Accounts/FormRegister';
import FormLogin from '../pages/Accounts/FormLogin';
import ForgotPassword from '../pages/Accounts/ForgotPassword';
import NotFound from '../pages/NotFound';
import ReduxStagram from '../pages/ReduxStagram/ReduxStagram';
import PhotoGrid from '../pages/ReduxStagram/PhotoGrid';
import SingleRedux from '../pages/ReduxStagram/SingleRedux';
import EmailVerificationToken from '../pages/notConnected/EmailVerification';

// UserAccounts
import Dashboard from '../pages/connected/Dashboard';
import UserAccounts from '../pages/connected/UserAccounts';

//admin
import AdminDashboard from '../pages/admin/AdminDashboard';

class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={FormRegister} />
            <Route exact path='/login' component={FormLogin} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/admindashboard' component={AdminDashboard} />
            <Route exact path='/UserAccounts' component={UserAccounts} />
            <Route exact path='/verifiedEmail' component={EmailVerificationToken} />
            <Route exact path='/redux' component={ReduxStagram} />
            <Route exact path='/redux/view/:postid' component={SingleRedux} />
            <Route component={NotFound} />
          </Switch>
          <FooterMain />
        </div>
      </Router>
    );
  }
}

export default MainLayout;
