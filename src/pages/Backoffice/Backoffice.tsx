import React, { useContext } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './style.scss';
import { IoMdCloudUpload } from 'react-icons/io';
import { Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { CategoriesAPI } from '../../api/categoriesApi';
import SnackbarContext from '../../hooks/useSnackbar';


function Backoffice() {
  const [code, setCode] = useState('');
  const { uploadTxt } = CategoriesAPI();
  const { showSnackbar } = useContext(SnackbarContext);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const formData = new FormData();

        formData.append('txt', file);
        formData.append('code', code);

        uploadTxt(formData)
          .then(() => {
            showSnackbar(false, "Categorias e Subs cadastradas com sucesso!");
          })
          .catch((err) => {
            showSnackbar(true, err.response.data);
          })
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Container className="backoffice-container">
      <Row>
        <Col>
          <h1 className='h1-backoffice f-42'>Adicionar subcategorias</h1>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex align-items-center flex-column'>
          <Typography variant="body2" className="f-16">
            Código de Autorização:
          </Typography>
          <TextField
            id="name"
            name="name"
            fullWidth
            value={code}
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => setCode(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="primary-standart f-inter text-center">
            Upload
            <Input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </Col>
      </Row>
    </Container>
  );

}

export default Backoffice;
