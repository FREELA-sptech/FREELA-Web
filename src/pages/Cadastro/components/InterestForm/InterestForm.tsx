import { Accordion, Col, Figure, Form, ListGroup } from "react-bootstrap";
import "./style.scss";
import { useState } from "react";
export function InterestForm(props: any) {
    const [dataCategory, setDataCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const items = [
        { id: 1, label: 'Programação' },
        { id: 2, label: 'Redação' },
        { id: 3, label: 'Tradução' },
        { id: 4, label: 'Artes' },
        { id: 5, label: 'Design' }
    ];

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    const handleCheckBoxChange = (event : any) => {
        const { value } = event.target;
        setDataCategory((dataSelected : any) => {
            if (dataSelected.includes(value)) {
                return dataSelected.filter((val : any) => val !== value);
            } else {
                return [...dataCategory, value];
            }
        });
        
    };
    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const show = ()=>{
        console.log(dataCategory);
    }
    return (
        <Col>
            <Col className="d-flex flex-column align-items-center justify-content-center gap-3">
                <Form.Control
                    type="text"
                    placeholder="Busque categorias"
                    value={searchTerm}
                    size="lg"
                    onChange={handleSearchChange}
                />

                <Form.Group className="item-checkbox w-100">
                    {filteredItems.map((item) => (
                        <Form.Check
                            className="checkbox d-flex align-items-center flex-row-reverse"
                            key={item.id}
                            type="checkbox"
                        >
                            <Form.Check.Input type="checkbox" id={`checkbox-${item.id}`} value={item.label} className="checkbox-input" checked={dataCategory.includes(item.label)} onChange={handleCheckBoxChange}/>
                            <Form.Check.Label htmlFor={`checkbox-${item.id}`} className="w-100" title={"Clique para selecionar a categoria " + item.label}>{item.label}</Form.Check.Label>
                        </Form.Check>
                    ))}
                </Form.Group>
                <p>Categorias Selecionadas: {dataCategory.join(', ')}</p>
            </Col>
        </Col >

    )
}