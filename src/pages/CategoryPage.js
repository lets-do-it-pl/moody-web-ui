import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import Table from 'components/Layout/Table';
import Popup from 'components/Layout/Popup';

class CategoryPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor (props){
    super(props);
    this.state = {
      showModal : false
    }
  }

  render() {
    let closeModal = () => this.setState({showModal : false});
    return (
      <Page
        className="CategoryPage"
        title="Category"
        breadcrumbs={[{ name: 'Category', active: true }]}
      >
         <Row>
           
          <Col md="6" sm="12" xs="12">
            <Card className="mb-3">
              <CardHeader>CATEGORIES <i className="fas fa-plus" onClick = {() => this.setState({showModal : true})}>
                </i> 
                <Popup show = {this.state.showModal}
                     onHide = {closeModal}/>
              </CardHeader>
              <CardBody>
                  <Table/>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
            <Card className="mb-3">
              <CardHeader>CATEGORY DETAILS <i className="fas fa-plus" ></i> </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Page>
    );
  }
}
export default CategoryPage;
