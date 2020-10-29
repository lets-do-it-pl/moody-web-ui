import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import Table from 'components/Layout/Table';
 

class CategoryPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="CategoryPage"
        title="Category"
        breadcrumbs={[{ name: 'Category', active: true }]}
      >
         <Row>
           
          <Col md="6" sm="12" xs="12">
            <Card className="mb-3">
              <CardHeader>CATEGORIES</CardHeader>
              <CardBody>
                 <Table/>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
            <Card className="mb-3">
              <CardHeader>CATEGORY DETAILS</CardHeader>
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
