import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {Board} from 'react-trello';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

var refreshIntervalIdOn, refreshIntervalIdOff;

class OneProjectOrganisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openFirstModal: false
        };
    }

    componentDidMount(){
        let left = document.getElementsByClassName('leftOrga')[0];
        let right = document.getElementsByClassName('rightOrga')[0];
        if(left && right){
            left.addEventListener('mouseover', ()=>{this.leftSwipeOn()})
            left.addEventListener('mouseleave', ()=>{this.leftSwipeOff()})
            right.addEventListener('mouseover', ()=>{this.rightSwipeOn()})
            right.addEventListener('mouseleave', ()=>{this.rightSwipeOff()})
        }
    }

    leftSwipeOn(){
        let test = document.querySelector('.kRlMFD');
        refreshIntervalIdOn = setInterval(()=>{test.scrollLeft = test.scrollLeft - 3}, 10)
    }
    
    leftSwipeOff(){
        clearInterval(refreshIntervalIdOn);
    }

    rightSwipeOn(){
        let test = document.querySelector('.kRlMFD');
        refreshIntervalIdOff = setInterval(()=>{test.scrollLeft = test.scrollLeft + 3}, 10)
    }
    
    rightSwipeOff(){
        clearInterval(refreshIntervalIdOff);
    }

    setEventBus(eventBus){
        this.setState({eventBus});
    }

    onOpenFirstModal(){
        this.DragItem();
        this.setState({ openFirstModal: true });
    };
    
      onCloseFirstModal(){
        this.setState({ openFirstModal: false });
    };

    shouldReceiveNewData(nextData){
        Meteor.call('project.lanes',
            nextData,
            this.props.projectId,
            (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                }; 
            }
        );
    };

    DragItem(){
        if(this.props.lanes){
            let drag = []
            for(title in this.props.lanes.lanes){
                drag.push({title: this.props.lanes.lanes[title].title, id: this.props.lanes.lanes[title].id});
            };
            this.setState({items: drag})
        };
    };

    addCate(e){
        e.preventDefault();
        if(e.target.cate.value && e.target.label.value){
            Meteor.call('project.addCate',
                this.props.projectId,
                Date.now().toString(),
                1, 
                e.target.label.value ? e.target.label.value : "",
                {width: 280},
                e.target.cate.value,
                [],
                (err)=>{
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast("Correctly add", 4000);
                    };
                }
            );
            this.onCloseFirstModal();
        }else{
            Materialize.toast("Complet the form correctly", 4000);
        };
    };

    onSortEnd({oldIndex, newIndex}){ 
        const {items} = this.state;
        this.setState({
          items: arrayMove(items, oldIndex, newIndex),
        });
    };

    SortableList(e){
        e.preventDefault();
        let newOrga = [];
        this.state.items.map((item) => {
            let result = this.props.lanes.lanes.filter(lane => lane.id == item.id);
            newOrga.push(result[0]);
        })
        let category = {lanes:  newOrga};
        Meteor.call('project.lanes',
            category,
            this.props.projectId,
            (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                };   
            }
        );
        this.onCloseFirstModal();
    };

    removeList({items}){
        if(items && items.length > 0){
            return (
                <div>
                    <ul id="dragul">
                        <h5 style={{height: "60px"}}>Delete category</h5>
                        <form>
                            {this.props.lanes.lanes.map((value, index) => (
                                <li id="dragli" key={index}>
                                    <input type="checkbox" className="deleteList" id={value.id} style={{marginRight: 5}} value="on"/>
                                    <label htmlFor={value.id}>{value.title}</label>
                                </li>
                            ))}
                        </form>
                    </ul>
                    <button onClick={this.DeleteList.bind(this)} className="col s12 waves-effect waves-light btn btn-block red">Delete</button>
                </div>
            );
        };
    };

    DeleteList(e){
        e.preventDefault();
        let table = [];
        let list = document.querySelectorAll(".deleteList");
        for(let i =0;list.length > i; i++){
            if(list[i].checked == true){
                table.push(list[i].id);
            }
        }
        if(table.length > 0){
            for(id in table){
                Meteor.call('project.removeCate',
                    table[id],
                    this.props.projectId,
                    (err)=>{
                        if(err){
                            Materialize.toast(err.reason, 4000);
                        };   
                    }
                );
            };
        };
        this.onCloseFirstModal();
    };

    Board(){
        if(this.props.lanes.lanes){
            if(this.props.lanes.lanes.length > 0){
                return(
                    <div className="App-intro">
                        <div className="leftOrga"></div>
                        <Board
                            editable
                            data={this.props.lanes}
                            draggable
                            onDataChange={this.shouldReceiveNewData.bind(this)}
                            eventBusHandle={this.setEventBus.bind(this)}
                        />
                        <div className="rightOrga"></div>
                    </div>
                )
            }else{
                return(
                    <div className="App-intro">
                        <div className="sc-bdVaJa kRlMFD">
                            <span className="nocate">No category</span>
                        </div>
                    </div>
                )
            };
        };
    };

    Modal({items}){
        return(
            <Modal open={this.state.openFirstModal} onClose={this.onCloseFirstModal.bind(this)} little>
                <form onSubmit={this.addCate.bind(this)} className="row">
                    <h5>Create category</h5>
                    <div className="input-field col m6 s12">
                        <i className="material-icons prefix">supervisor_account</i>
                        <input id="cate" type="text" className="validate" name="cate"/>
                        <label htmlFor="cate">Name</label>
                    </div>
                    <div className="input-field col m6 s12">
                        <i className="material-icons prefix">supervisor_account</i>
                        <input id="label" type="text" className="validate" name="label"/>
                        <label htmlFor="label">Label</label>
                    </div>
                    <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                </form>
                <div className="row">
                    <div className="col s12 m6">
                        <SortableList items={items} onSortEnd={this.onSortEnd.bind(this)} useDragHandle={true} />
                        {this.state.items > 0 ? <button onClick={this.SortableList.bind(this)} className="col s12 waves-effect waves-light btn btn-block">Change Order</button> : ""}
                    </div>
                    <div className="col s12 m6">
                        {this.removeList({items})}
                    </div>
                </div>
            </Modal>
        )
    }

    render() {
        if(this.props.lanes){
            const {items} = this.state;
            return (
                <div className="App" style={{marginTop: "50px"}} >
                    {this.Modal({items})}
                    <h5>Organisation</h5>
                    {this.Board()}
                    <div className="App-header">
                        <button onClick={this.onOpenFirstModal.bind(this)} className="col s12 waves-effect waves-light btn btn-block">Manage category</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )
        }
    }
}

export default OneProjectOrganisation;

const DragHandle = SortableHandle(() => <span id="dragspan">::</span>); // This can be any component you want

const SortableItem = SortableElement(({value}) => {
  return (
    <li id="dragli">
      <DragHandle />
      {value.title}
    </li>
  );
});

const SortableList = SortableContainer(({items}) => {
    if(items.length > 0){
        return (
            <ul id="dragul">
                <h5 style={{height: "60px"}}>Change order of category</h5>
                <form>
                    {items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={value} />
                    ))}
                </form>
            </ul>
        );
    }else{
        return(
            <div></div>
        )
    }
});