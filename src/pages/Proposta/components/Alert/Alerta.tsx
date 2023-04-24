import React, { useState } from 'react';
import { Figure } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';



function PlacementMultiExample(props: any) {
  const [position, setPosition] = useState('top-start');

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Proposta Realizada com sucesso</strong>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" fill="green" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </Toast.Header>
        <Toast.Body>Aguarde a confirmação do solicitante</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default PlacementMultiExample;