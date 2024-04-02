import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Table, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

function DataMahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mahasiswaPerPage] = useState(8);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        getAllMahasiswa();
    }, []);

    const deleteMahasiswa = async (mhsID) => {
        try {
            await axios.delete(`/mahasiswa/${mhsID}`);
            getAllMahasiswa();
        } catch (error) {
            console.log(error);
        }
    };

    const getAllMahasiswa = async () => {
        const respon = await axios.get("/mahasiswa");
        setMahasiswa(respon.data.data);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/mahasiswa/search/${searchQuery}`);
            setMahasiswa(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    // Logic for displaying mahasiswa
    const indexOfLastMahasiswa = currentPage * mahasiswaPerPage;
    const indexOfFirstMahasiswa = indexOfLastMahasiswa - mahasiswaPerPage;
    const currentMahasiswa = mahasiswa.slice(
        indexOfFirstMahasiswa,
        indexOfLastMahasiswa
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand>Data Mahasiswa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        ></Nav>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="col-6 mt-5">
                <Row>
                    <Col>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Jurusan</th>
                                <th>Semester</th>
                                <th colSpan={2} className="text-center">
                                    Aksi
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentMahasiswa.map((mhs, index) => (
                                <tr key={mhs.mhsID}>
                                    <td>{index + 1}</td>
                                    <td>{mhs.nama}</td>
                                    <td>{mhs.jurusan}</td>
                                    <td>{mhs.semester}</td>
                                    <td>
                                        <Link className="btn bg-primary" to={`/edit/${mhs.mhsID}`}>
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn bg-danger" onClick={() => deleteMahasiswa(mhs.mhsID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Pagination>
                        {[...Array(Math.ceil(mahasiswa.length / mahasiswaPerPage)).keys()].map((number) => (
                            <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Row>
                <Link to="/add">
                    <Button variant="primary">Tambah Data</Button>
                </Link>
            </Container>
        </div>
    );
}

export default DataMahasiswa;
