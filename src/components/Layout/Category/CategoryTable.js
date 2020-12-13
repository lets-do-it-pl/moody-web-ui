import React, { Component } from 'react';
import {Ref } from "semantic-ui-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from 'actions/categoryAction';
import DeleteCategoryModal from './DeleteCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import ImageModal from './ImageModal';

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
    this.props.getCategories();
  }

  componentDidUpdate() {
    this.props.getCategories();
  }


  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  onDragEnd = result => {

    if(!result.destination) return;

    const entities = Array.from(this.props.entities);
    const reorderedItem = entities.splice(result.source.index, 1);
    entities.splice(result.destination.index, 0, reorderedItem);

    // console.log(reorderedItem);
    // console.log(result.source.index);
    // console.log(this.props.entities[result.destination.index]);

    const updatedOrder = this.props.entities[result.destination.index];
    const updatedOrderTop = this.props.entities[result.destination.index - 1];
    const updatedOrderBottom = this.props.entities[result.destination.index + 1];

    this.props.entities.map((entity) => {

      if(Number(result.draggableId) === entity.id) {

        if(result.source.index > result.destination.index) {
          if(result.destination.index === 0)
          {
            const category = {
              Name : entity.name,
              Order : updatedOrder.order - 1,
              Image : entity.image
            }
            this.props.updateCategory(Number(result.draggableId), category);
          }
          else {
            const category = {
              Name : entity.name,
              Order : (updatedOrder.order + updatedOrderTop.order) / 2,
              Image : entity.image
            }
            this.props.updateCategory(Number(result.draggableId), category);
          }
        }
    
        if(result.source.index < result.destination.index) {
          if(result.destination.index + 1 === this.props.entities.length)
          {
            const category = {
              Name : entity.name,
              Order : updatedOrder.order + 1,
              Image : entity.image
            }
            this.props.updateCategory(Number(result.draggableId), category);
          }
          else {
            const category = {
              Name : entity.name,
              Order : (updatedOrder.order + updatedOrderBottom.order) / 2,
              Image : entity.image
            }
            this.props.updateCategory(Number(result.draggableId), category);
          }
        }
      }

    });

  }

  setSelectedImage = (e) => {
    this.setState({
      selectedImage : e.target.src
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
                                <img alt = "" style = {{width: "60px", borderRadius: "50%"}}
                                  src={"data:image/png;base64," + entity.image} 
                                  onClick = {this.setSelectedImage}/>
                                  
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

export default connect(mapStateToProps, mapActionToProps)(CategoryTable);