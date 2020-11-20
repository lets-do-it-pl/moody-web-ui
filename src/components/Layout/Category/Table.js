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
import Warning from './Warning';

class CategoryTable extends Component {
  state = {
    selectedRowIds: [],
    draggingRowId: null,
  };

  componentDidMount () {
    this.props.getCategories();
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })

  onDragEnd = result => {
    const { destination, source, reason } = result;

    // Not a thing to do...
    if (!destination || reason === 'CANCEL') {
      this.setState({
        draggingRowId: null,
      });
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const entities = Object.assign([], this.props.entities);
    const quote = this.props.entities[source.index];
    entities.splice(source.index, 1);
    entities.splice(destination.index, 0, quote);

    this.setState({
      entities
    });
  }

  render() {
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
            <Droppable droppableId="tableBody">
              {(provided, snapshot) => (
                <Ref innerRef={provided.innerRef}>
                  <TableBody {...provided.droppableProps}>
                    {this.props.entities.map((entity, index) => (
                      <Draggable
                        draggableId={"" + entity.order}
                        index={index}
                        key={entity.id}
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
                              <TableCell><img alt = "" style = {{width: "60px", borderRadius: "50%"}}src={"data:image/png;base64," + entity.image} /></TableCell>
                              <TableCell>{entity.id}</TableCell>
                              <TableCell>{entity.name}</TableCell>
                              <TableCell>
                                <IconButton>
                                  <Warning categoryId = {entity.id}/>
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