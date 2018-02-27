import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Form } from '../../../../api/FormCollection';

class FormSelect extends React.Component {
  handleRemove(e){
    e.preventDefault();
    if(e.target.id.value){
      Meteor.call('form.remove', e.target.id.value);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if(e.target.title.value && e.target.value.value){
      Meteor.call('form.insert', e.target.title.value, e.target.value.value, (err)=>{
        if(err){
          Materialize.toast(err.reason, 4000);
        }else{
          Materialize.toast("Correctly send !", 4000);
        }
      });
      e.target.reset();
    }else{
      Materialize.toast("Complete de form correctly !", 4000);
    }
  }

  renderSelect(){
    return(
      this.props.form.map((select) => {
        return (
          <li key={select._id} style={styles.li}>
            <div className="select" style={styles.select}>{select.title} {select.value} </div>
            <form onSubmit={this.handleRemove.bind(this)} style={styles.form}>
              <input type="hidden" name="id" value={select._id}/>
              <button className="btn red">Delete</button>
            </form>  
          </li>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderSelect()}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
              <div className="input-field col s6">
                  <i className="material-icons prefix">supervisor_account</i>
                  <input id="title" type="text" className="validate" name="title"/>
                  <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s6">
                  <i className="material-icons prefix">supervisor_account</i>
                  <input id="value" type="text" className="validate" name="value"/>
                  <label htmlFor="value">Value</label>
              </div>
              <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTracker(props => {
    Meteor.subscribe('form');
    return {
        form: Form.find().fetch()
    };
})(FormSelect);

const styles = {
  li:{
    height: '70px',
    background: 'white',
    boxShadow: '0 10px 16px 0 rgba(0,0,0,.05), 0 6px 20px 0 rgba(0,0,0,.096)',
    listStyleType: "none",
    marginTop: "10px",
    marginBottom: "10px",
    overflow: "hidden",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  form:{
    width: "20%",
    height: "100%",
    lineHeight: "70px",
    float: "right",
  },
  select:{
    float: "left",
    height: "100%",
    lineHeight: "70px",
    marginRight: "20px",
  },
  submit:{
    float: "right",
    marginRight: "5px",
    width: "109px",
  },
  button:{
    float: "right",
    marginRight: "5px",
    marginTop: "5px",
    width: "109px",
  }
}