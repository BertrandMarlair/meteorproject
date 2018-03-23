import React from 'react';
import classNames from 'classnames';

export default class Home extends React.Component {
  render(){  
    return (
      <div className={classNames('Home', 'foo', 'bar')} >
        <div className="homePage">
          <h3>Becode profile manager</h3>

          <div>
            <h5>Jb's Rules for Success</h5>
            <ul>
              <li>Let go of the old, make the most of the future</li>
              <li>Always tell the truth, we want to hearthe bad news sonner than later</li>
              <li>The highest level of integrity is expected, when in doubt, ask</li>
              <li>Learn to be a good businessperson, or just a good salesperson</li>
              <li>Everyone sweeps the floor</li>
              <li>Be professional in your style, speech and follow-up</li>
              <li>Listen to the customer, they almost always get it</li>
              <li>Create win/win relationships with our partners</li>
              <li>Look out for each orther, sharing information is a good thing</li>
              <li>Don't take yourself too serioulsly</li>
              <li>Have fun, ortherwise it's not worth it</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
