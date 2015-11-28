var TodoItem = React.createClass({
    propTypes: {
        onDelete: React.PropTypes.func,
        itemID: React.PropTypes.number.isRequired,
        itemDescription: React.PropTypes.string.isRequired        
    },
    
    getDefaultProps: function () {
        return {
            itemID : 0,
            itemDescription : ""
        }
    },
    
    onDelete : function (e){
        this.props.onDelete(this.props.itemID);
    },
    
    render : function () {
        return (
            <li className="list-group-item clearfix">
                <div className="pull-left">{this.props.itemDescription}</div>
                <button type="button" onClick={this.onDelete} className="btn btn-danger pull-right btn-xs">x</button>
            </li>
        );
    }
});

var TodoList = React.createClass({
    getInitialState: function () {
        return {
            todoList : [
                { id : 1, description : "Check Facebook." },
                { id : 2, description : "Check Email." },
                { id : 3, description : "Check New Blockbuster movies list." },
            ]
        }
    },
    
    onDelete : function(itemID) {
        var todoList=this.state.todoList;
        _.remove(todoList,{ id : itemID});
        this.setState ({ todoList : todoList });
    },
    
    getNewItemID : function(){
        var newItemID=0;
        
        if (this.state.todoList.length>0){           
            newItemID=parseInt(this.state.todoList[this.state.todoList.length-1].id);
        }
        
        newItemID++;
        return newItemID;        
    },
    
    addNewToDoItem : function (){        
        var itemDescription= this.refs.new_todo_item.value.trim();
        
        //If there is no value entered in text box, 
        //then we simply ignore it.
        if (itemDescription==""){
            return;
        }
        
        var newItemID=this.getNewItemID();
        var newToDoItem = { id : newItemID, description : itemDescription };
        
        this.refs.new_todo_item.value="";   //clearing value in "textbox"
        this.setState ({ todoList : this.state.todoList.concat([newToDoItem]) });
    },
    
    render: function () {
        var todoList=this.state.todoList.map(function (item) {
            return <TodoItem itemID={item.id} itemDescription={item.description} key={item.id} onDelete={this.onDelete}/>
        }.bind(this));
        
        return (
        <div className="jumbotron">      
            <div className="container">    
                <form className="form-inline">
                    <div className="form-group">                
                        <input type="text" ref="new_todo_item" className="form-control pull-left"/>
                    </div>
                    <button type="button" onClick={this.addNewToDoItem} className="btn btn-primary pull-right">Add New</button>
                </form>   
                <ul className="list-group todo-list-container">
                    {todoList}
                </ul>
            </div>
        </div>
        );
    }
});

var toDoComponent = ReactDOM.render(
    <TodoList />,
    document.getElementById('todo')
);