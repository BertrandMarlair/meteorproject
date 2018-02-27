import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PhotoGrid from './PhotoGrid';

class ReduxStagram extends Component {
    render() { 
        return ( 
            <div>
                <h1>ReduxStagram</h1>
                <PhotoGrid/>
            </div>
         )
    }
}
 
export default ReduxStagram;