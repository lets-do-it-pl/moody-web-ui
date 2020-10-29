import React, { Component } from 'react';
import { Table, Ref } from "semantic-ui-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

let filledArr = [
  {id : 1, name : "Meryem"},
  {id : 2, name : "Zeynep"}
];
class SemanticUIDnDTable extends Component {
  state = {
    entities: filledArr,
    selectedRowIds: [],
    draggingRowId: null,
  };

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

    const entities = Object.assign([], this.state.entities);
    const quote = this.state.entities[source.index];
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
          //onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Content</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Droppable droppableId="tableBody">
              {(provided, snapshot) => (
                <Ref innerRef={provided.innerRef}>
                  <Table.Body {...provided.droppableProps}>
                    {this.state.entities.map((entity, index) => (
                      <Draggable
                        draggableId={entity.id}
                        index={index}
                        key={entity.id}
                      >
                        {(provided, snapshot) => (
                          <Ref innerRef={provided.innerRef}>
                            <Table.Row
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={this.getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Table.Cell>{entity.id}</Table.Cell>
                              <Table.Cell>{entity.name}</Table.Cell>
                            </Table.Row>
                          </Ref>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Table.Body>
                </Ref>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
    );
  }
}

export default SemanticUIDnDTable;