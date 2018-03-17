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

//Badges
import Badges from '../project/badges/badges';
import BadgeCate from  '../project/badges/Component/Badge/BadgeCate';
import BadgeList from '../project/badges/Component/Badge/BadgeList';
import Form from '../project/badges/Component/Form/Form';
import Succeed from '../project/badges/Component/Form/Succeed';
import Already from '../project/badges/Component/Form/Already';
import Notfound from '../project/badges/Component/Charging/Notfound';
import Progress from '../project/badges/Component/Charging/Progress';

// UserAccounts
import Dashboard from '../pages/connected/Dashboard';
import OneProject from '../pages/connected/Dashboard/OneProject';
import UserAccounts from '../pages/connected/UserAccounts';

//admin
import AdminDashboard from '../pages/admin/AdminDashboard';

class MainLayout extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div style={{minHeight:"calc(100vh - 330px)"}}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={FormRegister} />
              <Route exact path='/login' component={FormLogin} />
              <Route exact path='/forgotpassword' component={ForgotPassword} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/dashboard/:id' component={OneProject} />
              <Route exact path='/admindashboard' component={AdminDashboard} />
              <Route exact path='/UserAccounts' component={UserAccounts} />
              <Route exact path='/verifiedEmail' component={EmailVerificationToken} />
              <Route exact path='/redux' component={ReduxStagram} />
              <Route exact path='/redux/view/:postid' component={SingleRedux} />
              <Route exact path='/badges/' component={Badges} />
              <Route exact path='/badges/:reste' component={Badges} />
              <Route exact path='/badges/:reste/:tes' component={Badges} />
              <Route exact path='/badges/:reste/:tes/:test' component={Badges} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <FooterMain />
        </div>
      </Router>
    );
  }
}

export default MainLayout;
