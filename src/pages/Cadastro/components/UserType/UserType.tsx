import { Col, Form } from "react-bootstrap";
import {MdPersonOutline,MdWorkOutline} from "react-icons/md";

import "./style.scss";

export default function UserType(props : any) {
    const setField = (field : any, value : any)=>{
        props.setFormData({
            ...props.formData, [field]: value
        })
    }

    return (
        <Col className="container-type d-flex align-items-center justify-content-center gap-3">
            <Form.Group className="col-lg-6">
                <Form.Check type="radio" className="radio-group">
                    <Form.Check.Input id="costumer" type="radio" name="type" value="costumer" onChange={(e)=> setField("type", e.target.value)} required/>
                    <Form.Check.Label htmlFor="costumer" className="w-100">
                        <Col lg={12} className="container-type w-100 d-flex justify-content-center align-items-center flex-column">
                            <h1 className="category">Cliente</h1>
                            <MdPersonOutline size={"2rem"} fill="#274C77"/>
                        </Col>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>
            <Form.Group className="col-lg-6">
                <Form.Check type="radio" className="radio-group">
                    <Form.Check.Input id="freelancer" type="radio" name="type" value="freelancer" onChange={(e) => setField("type", e.target.value)} required/>
                    <Form.Check.Label htmlFor="freelancer" className="w-100">
                        <Col lg={12} className="container-type w-100 d-flex justify-content-center align-items-center flex-column">
                            <h1 className="category">Autônomo</h1>
                            <MdWorkOutline size={"2rem"} fill="#274C77"/>
                        </Col>
                    </Form.Check.Label>
                </Form.Check>
            </Form.Group>
        </Col>
    )
}
