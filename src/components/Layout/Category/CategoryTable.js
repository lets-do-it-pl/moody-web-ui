import React, { Component } from 'react';
import {Ref } from "semantic-ui-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import * as actions from 'actions/categoryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteCategoryModal from './DeleteCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import '../../../style.css';

class CategoryTable extends Component {

  constructor(props){
    super(props);
    this.state = {
    selectedImage : null,
    isOpen : false
    }
  }

  componentDidMount () {
    this.props.getCategories();
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onDragEnd = result => {
    
    const { destination, source, reason } = result;

    if (!destination || reason === 'CANCEL') {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const entities = Object.assign([],this.props.entities);
    const droppedCategory = this.props.entities[source.index]

    entities.splice(source.index, 1);
    entities.splice(destination.index, 0, droppedCategory);

  }

  setSelectedImage = (e) => {
    this.setState({
      selectedImage : e.target.src,
      isOpen : true
    });
  }

  render() {
    const {selectedImage} = this.state;
    return (
      <div style={{ padding: "30px" }}>
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="category">
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <TableBody {...provided.droppableProps}>
                    {this.props.entities.sort((a, b) => (a.order > b.order) ? 1 : -1).map((entity, index) => (
                      <Draggable
                        key={entity.id}
                        draggableId={entity.order + ''}
                        index={entity.order}
                      >
                        {(provided, snapshot) => (
                          <Ref innerRef={provided.innerRef}>
                            <TableRow 
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={this.getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <TableCell>{entity.order}</TableCell>
                              <TableCell>
                                <img alt = "" style = {{width: "60px", borderRadius: "50%"}}
                                  src={"data:image/png;base64," + entity.image} 
                                  onClick = {this.setSelectedImage}/>
                                  {this.state.isOpen && (
                                    <dialog
                                      className="dialog"
                                      style={{ position: "absolute" }}
                                      open
                                      onClick={this.handleShowDialog}
                                    >
                                      <img
                                        className="image"
                                        src={selectedImage} 
                                        onClick={this.handleShowDialog}
                                        alt=""
                                      />
                                    </dialog>
                                  )}
                              </TableCell>
                              <TableCell>{entity.id}</TableCell>
                              <TableCell>{entity.name}</TableCell>
                              <TableCell>
                                Edit
                                <IconButton>
                                  <UpdateCategoryModal 
                                    id = {entity.id}
                                    order = {entity.order}
                                    name = {entity.name}
                                    image = {entity.image}
                                    />
                                </IconButton>
                                Delete
                                <IconButton>
                                  <DeleteCategoryModal categoryId = {entity.id}/>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          </Ref>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                </Ref>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entities : state.category.list
})

const mapActionToProps = {
  getCategories : actions.getCategories
}

export default connect(mapStateToProps, mapActionToProps)(CategoryTable);