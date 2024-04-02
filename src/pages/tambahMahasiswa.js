import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TambahMahasiswa() {
    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");
    const [semester, setSemester] = useState("");
    const navigate = useNavigate();


    const addMahasiswa = async(event)=>{
        event.preventDefault();
        try {
            await axios.post("/mahasiswa",{
                nama,
                jurusan,
                semester
            });
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col style={{ display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <Form className="col-6" onSubmit={addMahasiswa}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" value={nama} onChange={(event)=> setNama(event.target.value)} placeholder="Masukkan Nama" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Control type="text" value={jurusan} onChange={(event)=> setJurusan(event.target.value)} placeholder="Masukkan Jurusan" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control type="text" value={semester} onChange={(event)=> setSemester(event.target.value)} placeholder="Masukkan Semester" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default TambahMahasiswa;