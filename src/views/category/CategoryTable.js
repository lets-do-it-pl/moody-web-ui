import React, { Component } from 'react';
import { Ref } from "semantic-ui-react";
import PropTypes from 'prop-types';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { withStyles } from '@material-ui/styles';
import DetailsIcon from '@material-ui/icons/Details';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar
} from '@material-ui/core';
import ImageModal from './common/ImageModal';
import UpdateCategoryForm from './UpdateCategoryForm';
import DeleteCategoryForm from './DeleteCategoryForm';
import { categoryService } from '../../_services/category.service';
import { StatusType } from 'src/_types';

const styles = () => ({
  update: {
    color: "orange"
  },
  details: {
    color: "purple"
  },
  table: {
    width: '100%',
  }
});

class CategoryTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      categories: []
    }
  }

  async componentDidMount() {
    await this.loadCategories();
  }

  loadCategories = async () => {
    var result = await categoryService.getCategories();

    if (result.status === StatusType.Fail) {
      console.log(result.data);
      return;
    }

    this.setState({
      categories: result.data
    });
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

  onDragEnd = async result => {

    if (!result.destination) {
      return;
    }

    const updatedOrder = this.state.categories[result.destination.index];
    const updatedOrderTop = this.state.categories[result.destination.index - 1];
    const updatedOrderBottom = this.state.categories[result.destination.index + 1];

    if (result.source.index > result.destination.index) {
      const values = result.destination.index === 0 ?
        { NextId: updatedOrder.id } :
        { PreviousId: updatedOrder.id, NextId: updatedOrderTop.id };

      await categoryService.updateOrder(Number(result.draggableId), values);
    }
    else if (result.source.index < result.destination.index) {
      const values = result.destination.index === this.state.categories.length - 1 ?
        { PreviousId: updatedOrder.id } :
        { PreviousId: updatedOrder.id, NextId: updatedOrderBottom.id };

      await categoryService.updateOrder(Number(result.draggableId), values);
    }
    return;
  }

  render() {
    const { classes } = this.props;
    const { selectedImage, categories } = this.state;
    return (
      <div>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  width="30">
                  #
                </TableCell>
                <TableCell
                  align="center"
                  width="100">
                  Image
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell
                  align="center"
                  width="130">
                  Actions
                </TableCell>
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
                              )}>
                              <TableCell
                                align="center"
                                width="30"
                                variant="body">
                                {index + 1}
                              </TableCell>
                              <TableCell
                                align="center"
                                width="100"
                                variant="body">
                                <Avatar
                                  alt=""
                                  src={"data:image/png;base64," + entity.image}
                                  onClick={(e) => this.setState({ selectedImage: e.target.src })} />
                              </TableCell>
                              <TableCell>{entity.name}</TableCell>
                              <TableCell
                                align="center"
                                width="130"
                                variant="body">
                                <IconButton size="small" onClick={() => this.props.getCategoryId(entity.id, entity.name)}>
                                  <DetailsIcon className={classes.details} />
                                </IconButton>
                                <IconButton size="small" >
                                  <UpdateCategoryForm
                                    id={entity.id}
                                    name={entity.name}
                                    image={entity.image}
                                  />
                                </IconButton>
                                <IconButton size="small" >
                                  <DeleteCategoryForm id={entity.id} />
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
        { selectedImage && <ImageModal selectedImage={selectedImage} closeImage={this.closeImage} />}
      </div >
    );
  }
}

CategoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryTable);