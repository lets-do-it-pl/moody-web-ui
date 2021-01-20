import React, { Component } from 'react';
import {Ref } from "semantic-ui-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import {Table, 
        TableBody, 
        TableCell, 
        TableHead, 
        TableRow, 
        IconButton,
        Avatar} from '@material-ui/core';
import ImageModal from '../common/ImageModal';
import UpdateCategoryDetailsForm from './UpdateCategoryDetailsForm';
import DeleteCategoryDetailsForm from './DeleteCategoryDetailsForm';
import CreateCategoryDetailsForm from './CreateCategoryDetailsForm';

class CategoryDetailsTable extends Component {

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

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  onDragEnd = result => {

    if(!result.destination) return;
    
  }

  render() {
    const {selectedImage} = this.state;
    return (
      <div style={{ padding: "30px" }}>
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <p>Category {this.props.categoryName} 
        <CreateCategoryDetailsForm categoryId = {this.props.categoryId}/> </p>
      <Table size = "small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="category">
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <TableBody {...provided.droppableProps}>
                    {this.props.categoryDetails.map((entity, index) => (
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
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                              <Avatar alt="" src={"data:image/png;base64," + 
                              entity.image} 
                                  onClick = {(e) => this.setState({
                                    selectedImage : e.target.src
                                  })} />
                              </TableCell>
                              <TableCell>
                                <IconButton>
                                  <UpdateCategoryDetailsForm categoryId = {this.props.categoryId}
                                                             id = {entity.id}
                                                             image = {entity.image}/>
                                </IconButton>
                                <IconButton>
                                  <DeleteCategoryDetailsForm categoryId = {this.props.categoryId}
                                                             id = {entity.id}/>
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

export default CategoryDetailsTable;