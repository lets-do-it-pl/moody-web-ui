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
import * as actions from 'actions/categoryAction';
import ImageModal from './ImageModal';
import CategoryModal from './CategoryModal';
import UpdateCategoryForm from './UpdateCategoryForm';
import DeleteCategoryModal from './DeleteCategoryModal';

class CategoryTable extends Component {

  constructor(props){
    super(props);
    this.state = {
    selectedImage : null,
    category : [
      { id : 1, name: 'Alison', order : 1.0, image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=688&q=80' },
      { id : 2, name: 'Michael', order : 2.0, image: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
      { id : 3, name: 'Brook', order : 3.0, image: 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80' },
      { id : 4, name: 'Sara', order : 4.0, image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80' },
      { id : 5, name: 'Alex', order : 5.0, image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=712&q=80' },
      { id : 6, name: 'Simon', order : 6.0, image: 'https://images.unsplash.com/photo-1542973748-658653fb3d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80' },
    ]
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

    // const entities = Array.from(this.props.entities);
    // const reorderedItem = entities.splice(result.source.index, 1);
    // entities.splice(result.destination.index, 0, reorderedItem);

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
                    {//this.props.entities
                    category.map((entity, index) => (
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
                                  onClick = {this.setSelectedImage} />
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

export default connect(mapStateToProps, mapActionToProps)(CategoryTable);