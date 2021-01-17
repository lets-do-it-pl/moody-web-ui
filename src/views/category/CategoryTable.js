import React, { Component } from 'react';
import {Ref } from "semantic-ui-react";
import {connect} from 'react-redux';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import EditIcon from '@material-ui/icons/Edit';
import {Table, 
        TableBody, 
        TableCell, 
        TableHead, 
        TableRow, 
        IconButton,
        Avatar} from '@material-ui/core';
import * as actions from '../../actions/categoryAction';
import ImageModal from './common/ImageModal';
import CategoryModal from './common/CategoryModal';
import UpdateCategoryForm from './UpdateCategoryForm';
import DeleteCategoryModal from './common/DeleteModal';
import { update } from 'lodash';

class CategoryTable extends Component {

  constructor(props){
    super(props);
    this.state = {
    selectedImage : null
    }
  }

  closeImage = () => {
    this.setState({
      selectedImage: null
    })
  }

  componentDidMount () {
    console.log(this.props.getCategories());
  }


  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  onDragEnd = result => {

    if(!result.destination) return;

    const updatedOrder = this.props.entities[result.destination.index];
    const updatedOrderTop = this.props.entities[result.destination.index - 1];
    const updatedOrderBottom = this.props.entities[result.destination.index + 1];

    this.props.entities.map((entity) => {

      if(Number(result.draggableId) === entity.id) {

        update = (order) => {
          const category = {
            Name : entity.name,
            Order : order,
            Image : entity.image
          }
          this.props.updateCategory(Number(result.draggableId), category);
        }

        if(result.source.index > result.destination.index) {
          if(result.destination.index === 0)
          {
            update(updatedOrder.order - 1);
          }
          else {
            update((updatedOrder.order + updatedOrderTop.order) / 2);
          }
        }
    
        if(result.source.index < result.destination.index) {
          if(result.destination.index + 1 === this.props.entities.length)
          {
            update(updatedOrder.order + 1);
          }
          else {
            update((updatedOrder.order + updatedOrderBottom.order) / 2);
          }
        }
      }

    });
  }

  render() {
    const {selectedImage, category} = this.state;
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
                    {this.props.entities.map((entity, index) => (
                      <Draggable
                        key={entity.id}
                        draggableId={entity.id + ''}
                        index={index}
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
                              <Avatar alt="" src={//"data:image/png;base64," + 
                              entity.image} 
                                  onClick = {(e) => this.setState({
                                    selectedImage : e.target.src
                                  })} />
                              </TableCell>
                              <TableCell>{entity.id}</TableCell>
                              <TableCell>{entity.name}</TableCell>
                              <TableCell>
                                Edit
                                <IconButton>
                                  <CategoryModal
                                    title = "Update"
                                    content = {<UpdateCategoryForm
                                      id = {entity.id}
                                      order = {entity.order}
                                      name = {entity.name}
                                      image = {entity.image}
                                    />}
                                    icon = {<EditIcon/>}
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
        {selectedImage && <ImageModal selectedImage = {selectedImage} closeImage = {this.closeImage}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entities : state.category.list
})

const mapActionToProps = {
  getCategories : actions.getCategories,
  updateCategory : actions.updateCategory
}

export default connect(mapStateToProps, mapActionToProps)(CategoryTable)