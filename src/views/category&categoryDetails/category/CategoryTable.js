import React, { Component } from 'react';
import {Ref } from "semantic-ui-react";
import PropTypes from 'prop-types';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { withStyles } from '@material-ui/styles';
import DetailsIcon from '@material-ui/icons/Details';
import {Table, 
        TableBody, 
        TableCell, 
        TableHead, 
        TableRow, 
        IconButton,
        Avatar} from '@material-ui/core';
import ImageModal from '../common/ImageModal';
import UpdateCategoryForm from './UpdateCategoryForm';
import DeleteCategoryForm from './DeleteCategoryForm';
import {categoryService} from '../../../_services/categoryService';

const styles = () => ({
  update: {
    color: "orange"
  },
  details: {
    color: "purple"
  }
});

class CategoryTable extends Component {

  constructor(props){
    super(props);
    this.state = {
    selectedImage : null,
    categories: []
    }
  }

  componentDidMount () {
    categoryService.listCategories().then(result => this.setState({
      categories: result.data
    }));
  }

  componentDidUpdate () {
    categoryService.listCategories().then(result => this.setState({
      categories: result.data
    }));
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

    const updatedOrder = this.state.categories[result.destination.index];
    const updatedOrderTop = this.state.categories[result.destination.index - 1];
    const updatedOrderBottom = this.state.categories[result.destination.index + 1];

      if(result.source.index > result.destination.index) {
        if(result.destination.index === 0)
        {
          const values = {
            NextId : updatedOrder.id
          }
          categoryService.updateOrder(Number(result.draggableId), values);
        }
        else {
          const values = {
            PreviousId : updatedOrder.id,
            NextId : updatedOrderTop.id
          }
          categoryService.updateOrder(Number(result.draggableId), values);
        }
      }
  
      if(result.source.index < result.destination.index) {
        if(result.destination.index === this.state.categories.length - 1)
        {
          const values = {
            PreviousId : updatedOrder.id
          }
          categoryService.updateOrder(Number(result.draggableId), values);
        }
        else {
          const values = {
            PreviousId : updatedOrder.id,
            NextId : updatedOrderBottom.id
          }
          categoryService.updateOrder(Number(result.draggableId), values);
        }
      }
      return;
  }

  render() {
    const { classes } = this.props;
    const {selectedImage, categories} = this.state;
    return (
      <div style={{ padding: "30px" }}>
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      <Table size = "small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="category">
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <TableBody {...provided.droppableProps}>
                    {categories.map((entity, index) => (
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
                              <TableCell>{index}</TableCell>
                              <TableCell>
                              <Avatar alt="" src={"data:image/png;base64," + 
                              entity.image} 
                                  onClick = {(e) => this.setState({
                                    selectedImage : e.target.src
                                  })} />
                              </TableCell>
                              <TableCell>{entity.name}</TableCell>
                              <TableCell>
                                <IconButton onClick = {() => this.props.getCategoryId(entity.id, entity.name)}>
                                  <DetailsIcon className = {classes.details}/>
                                </IconButton>
                                <IconButton>
                                  <UpdateCategoryForm
                                    id = {entity.id}
                                    name = {entity.name}
                                    image = {entity.image}
                                  />
                                </IconButton>
                                <IconButton>
                                  <DeleteCategoryForm id = {entity.id}/>
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

CategoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryTable);