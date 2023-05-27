import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './style.scss';
import { IoMdCloudUpload } from 'react-icons/io';


function Backoffice() {
    return (
        <Container className="backoffice-container">
        <Row>
          <Col>
            <h1 className='h1-backoffice f-42'>Adicionar subcategorias : </h1>
          </Col>
        </Row>
        <Row>
        <Col className='d-flex align-items-center'>
      <Form.Control className='input-backoffice' />
      <IoMdCloudUpload size={70} className='icon'/>
    </Col>
        </Row>
        <Row>
          <Col>
            <Button className='primary-standart f-inter' > upload </Button>   
          </Col>
          
        </Row>
      </Container>
      
    );
    
  }

export default Backoffice;