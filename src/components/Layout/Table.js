import React, { Component } from 'react';
import { Table, Ref } from "semantic-ui-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import axios from 'axios';
import Popup from 'components/Layout/Popup';
import Warning from 'components/Layout/Warning';

class CategoryTable extends Component {
  state = {
    entities: [],
    selectedRowIds: [],
    draggingRowId: null,
    showModalPopup : false,
    showModalWarning : false
  };

  componentDidMount = async () => {
    const response = await axios.get("https://letsdoit-moody-web.azurewebsites.net/list");
    console.log(response);
    this.setState({
      entities : response.data.categories
    })
  }

  popupImage(event){

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

    const entities = Object.assign([], this.state.entities);
    const quote = this.state.entities[source.index];
    entities.splice(source.index, 1);
    entities.splice(destination.index, 0, quote);

    this.setState({
      entities
    });
  }

  render() {
    let closeModalPopup = () => this.setState({showModalPopup : false});
    let closeModalWarning = () => this.setState({showModalWarning : false});
    return (
      <div style={{ padding: "30px" }}>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Droppable droppableId="tableBody">
              {(provided, snapshot) => (
                <Ref innerRef={provided.innerRef}>
                  <Table.Body {...provided.droppableProps}>
                    {this.state.entities.map((entity, index) => (
                      <Draggable
                        draggableId={"" + entity.order}
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
                              <Table.Cell>{entity.order}</Table.Cell>
                              <Table.Cell><img alt = "" onClick = {this.popupImage} style = {{width: "60px", borderRadius: "50%"}}src={"data:image/png;base64," + entity.image} /></Table.Cell>
                              <Table.Cell>{entity.id}</Table.Cell>
                              <Table.Cell>{entity.name}</Table.Cell>
                              <Table.Cell>
                                <p> 
                                    Edit <i className="far fa-edit" onClick = {() => this.setState({showModalPopup : true})}></i> 
                                    <Popup 
                                      title = "Edit Category"
                                      show = {this.state.showModalPopup}
                                      onHide = {closeModalPopup}/>
                                    Delete <i className="fas fa-trash" onClick = {() => this.setState({showModalWarning : true})}></i>
                                    <Warning 
                                      show = {this.state.showModalWarning}
                                      onHide = {closeModalWarning}/> 
                                </p>
                              </Table.Cell>
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

export default CategoryTable;