import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { QRCodeSVG } from 'qrcode.react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      base_string: 'https://www.covalenthq.com/platform/#/auth/register',
      group_name: '',
      date_of_meetup: '',
      data: 'Form Not Filled Yet'
    };

  }

  handleChange(event) {
    event.preventDefault();


  }

  handleSubmit = (event) => {
    const base_string = `${this.state.base_string}`;
    const sourceaddition = `?utm_source=${this.state.group_name}+${this.state.date_of_meetup}`;
    const medium = '&utm_medium=meetup';
    const dataString = base_string + sourceaddition + medium;

    this.setState({
      data: dataString
    })
    // alert(dataString);

    // document.getElementById('qr-code').innerHTML = '<QRCode bgColor="#FFFFFF" fgColor="#000000" level="Q" style={{ width: 256 }} value="Nothing to show" />';
    event.preventDefault();

  }

  handlegroupChange = (event) => {
    this.setState({
      group_name: event.target.value
    })
  }
  handledateChange = (event) => {
    this.setState({
      date_of_meetup: event.target.value
    })
  }

  printDocument() {

    const input = document.getElementById('qr-code');
    console.log(input);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log(imgData);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 50, 50);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
      ;
  }

  render() {
    return (
      <div className="App">

        <Container>
        <div className='logo'>
        <img src='https://cdn.sanity.io/images/51n36hrp/facade/abb8930f5dd1892cc5b6311b697b3a81641a46f1-3637x875.png' alt='Covalent Logo' height={70} width={150}  />
        </div>
          <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Col>
              <br />
              <p>
                Hi There To Generate QR Code fill in the below form.
              </p>
              <h3>Meetup Information</h3>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name">Alchemist Name</Label>
                  <Input type="text" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                  <Label for="class">Group Name</Label>
                  <Input type="text" id="class" placeholder="Enter Community Name" ref="class" value={this.state.group_name} onChange={this.handlegroupChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="section">Date of Meetup</Label>
                  <Input type="date" id="section" placeholder="Enter Meetup Date " ref="section" value={this.state.section} onChange={this.handledateChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="school">Venue</Label>
                  <Input type="text" id="school" placeholder="Enter Venue Name" />
                </FormGroup>
                <Button type="submit">
                  Generate QR Code
                </Button>
              </Form>
            </Col>
            <Col>
              <div id="print-this" >
                <br />
                <div id="qr-code">
                  <QRCodeSVG
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="L"
                    style={{ width: 200, height: 200 }}
                    value={this.state.data}
                  />
                </div>
                <br />
                <Button onClick={this.printDocument}>You can Save Now</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default App;