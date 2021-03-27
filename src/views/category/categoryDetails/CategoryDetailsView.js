import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Ref } from 'semantic-ui-react';
import { withSnackbar } from 'notistack';
import ImageModal from '../common/ImageModal';
import { showAlert } from '../../../_helpers';
import { withStyles } from '@material-ui/styles';
import { StatusType, AlertType } from 'src/_types';
import { confirmAlert } from 'react-confirm-alert';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateCategoryDetailsForm from './UpdateCategoryDetailsForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { categoryDetailsService } from '../../../_services/category.details.service';


const styles = () => ({
  update: {
    color: 'orange'
  },
  table: {
    width: '100%'
  },
  delete: {
    color: 'red'
  }
});

class CategoryDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null
    };
  }

  closeImage = () => {
    this.setState({
      selectedImage: null
    })
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && 'lightblue',
    ...draggableStyle
  });

  onDragEnd = async result => {
    if (!result.destination) {
      return;
    }

    const updatedOrder = this.props.categoryDetails[result.destination.index];
    const updatedOrderTop = this.props.categoryDetails[result.destination.index - 1];
    const updatedOrderBottom = this.props.categoryDetails[
      result.destination.index + 1
    ];

    var orderResult;

    if (result.source.index > result.destination.index) {
      const values =
        result.destination.index === 0
          ? { NextId: updatedOrder.id }
          : { PreviousId: updatedOrder.id, NextId: updatedOrderTop.id };

      orderResult = await categoryDetailsService.updateOrder(
        Number(result.draggableId),
        values
      );
    } else if (result.source.index < result.destination.index) {
      const values =
        result.destination.index === this.props.categoryDetails.length - 1
          ? { PreviousId: updatedOrder.id }
          : { PreviousId: updatedOrder.id, NextId: updatedOrderBottom.id };

      orderResult = await categoryDetailsService.updateOrder(
        Number(result.draggableId),
        values
      );
    }

    if (orderResult.status === StatusType.Success) {
      showAlert(this.props, 'The order has been changed', AlertType.Success);
      return;
    }

    showAlert(this.props, orderResult.message, AlertType.Error);
  };

  deleteCategoryDetail = async id => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to delete this category detail?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            var result = await categoryDetailsService.deleteCategoryDetail(this.props.categoryId, id);

            if (result.status === StatusType.Success) {
              showAlert(this.props, 'Category Detail is deleted.', AlertType.Success);
              return;
            }

            showAlert(this.props, result.message, AlertType.Error);
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedImage } = this.state;

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="30">#</TableCell>
                <TableCell align="center" width="100">Image</TableCell>
                <TableCell align="center" width="130">Actions</TableCell>
              </TableRow>
            </TableHead>
            <Droppable droppableId="category">
              {provided => (
              <Ref innerRef={provided.innerRef}>
                <TableBody {...provided.droppableProps}>
                  {this.props.categoryDetails.map((entity, index) => {
                    return(
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
                              <Avatar alt="" src={"data:image/png;base64," +
                                entity.image}
                                onClick={(e) => this.setState({
                                  selectedImage: e.target.src
                                })} />
                            </TableCell>

                            <TableCell
                              align="center"
                              width="170"
                              variant="body"
                            >
                              <IconButton size="small">
                                <UpdateCategoryDetailsForm 
                                  categoryId={this.props.categoryId}
                                  id={entity.id}
                                  image={entity.image} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  this.deleteCategoryDetail(entity.id)
                                }
                              >
                                <DeleteIcon className={classes.delete} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </Ref>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </TableBody>
              </Ref>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
        {selectedImage && 
          <ImageModal 
            selectedImage={selectedImage} 
            closeImage={this.closeImage}
          />}
      </div>
    );
  }
}

CategoryDetailsView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(CategoryDetailsView));