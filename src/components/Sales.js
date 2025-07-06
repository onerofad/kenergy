import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Custombar from "./CustomBar"
import CustomNav from "./CustomNav"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getInventory, getItems, getSales } from "../API"

const Sales = () => {

    const currentDate = new Date()

    const year = currentDate.getFullYear()

    const month = currentDate.getMonth() + 1

    const day = currentDate.getDate()

    const [inventories, setInventories] = useState([])
    const [items, setItems] = useState([])

    const [item, setItem] = useState("")
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState("")

    const [modalText, setmodalText] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [modalText1, setmodalText1] = useState("")
    const [show1, setShow1] = useState(false)
    const handleClose1 = () => {
        //printContent()
        setShow1(false)
        setItem("")
        setPrice("")
        setQty(0)
        setTotal(0)
    }

    const [sales, setSales] = useState([])

    let total_kg = 0

    let total_kg_sales = 0

    useEffect(() => {
        getAllInventories()
        getAllItems()
        getAllSales()
    },[])

    const getAllInventories = () => {
        getInventory().get("/").then(response => setInventories(response.data))
    }

    const getAllItems = () => {
        getItems().get("/").then(response => setItems(response.data))
    }

    const getAllSales = () => {
        getSales().get("/").then(response => setSales(response.data))
        .catch(error => console.log("An error has occurred" + error))
    }

    const makeSale = () => {
        if(item === ""){
            setmodalText("Select a service")
            setShow(true)
        }else if(qty === 0){
            setmodalText("Qty must be greater than 0")
            setShow(true)
        }else if(price === 0){
            setmodalText("Price must be greater than 0")
            setShow(true)
        }else if(total === 0){
            setmodalText("Total must be greater than 0")
            setShow(true)
        }else{
            setLoading("border")
            let payload = {item, qty, price, total}
            getSales().post("/", payload)
            .then(() => {
                setLoading("")
                getAllSales()
                setmodalText1("Sales Complete")
                setShow1(true)
                
            })

        }
    }

    function printContent() {
        var contentToPrint = document.querySelector('.print-content');
        var printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(contentToPrint.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    return(
        <>
        <Custombar link={'/'} link_name="Log out" />
        <Row style={{width: '98%'}}>
            <Col md={2}> 
                <CustomNav />
            </Col>
            <Col md={10}>
                <div style={{paddingTop: 100}}>
                    <h4>
                        Sales Report
                        <span style={{float: 'right'}}>
                            {
                                inventories.map(m => {
                                    total_kg += m.qty
                                })
                            }
                            {
                                sales.map(s => {
                                    total_kg_sales += s.qty
                                })
                            }
                            Total Left (Kg): {total_kg - total_kg_sales}
                        </span>
                    </h4>
                    <hr/>
                </div> 
                <div style={{paddingTop: 20}}>
                    <Row className="justify-content-center">
                        <Col md={1}>
                            <Spinner
                                size="lg"
                                as="span"
                                animation={loading}
                            />
                        </Col>
                    </Row>
                    <Form>
                        <Row className="mb-3 justify-content-center">  
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Service Name</Form.Label>
                                <Form.Select
                                    type="text"
                                    onChange={(e) => setItem(e.target.value)}
                                    value={item}
                                    style={{
                                        backgroundColor: 'black', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}

                                >
                                    <option>Select Service</option>
                                    {
                                        items.map(m => (
                                            <option>{m.itemname}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Qty (Kg)</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={(e) => setQty(e.target.value)}
                                    value={qty}
                                     style={{
                                        backgroundColor: 'green', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}

                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 justify-content-center">  
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Price Per Kg (&#8358;)</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    onBlur={() => setTotal(qty * price)}
                                    style={{
                                        backgroundColor: 'blue', 
                                        borderRadius: 10, 
                                        height: 50,
                                        color: 'white'
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={4}>
                                <Form.Label as="h6">Total Amount (&#8358;)</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    onChange={(e) => setTotal(e.target.value)}
                                    value={total}
                                    style={{borderRadius: 10, height: 50}}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-center"> 
                            <Col md={3}>
                                <Button
                                    onClick={makeSale}
                                    size="lg"
                                    className="mt-4"
                                    style={{
                                        backgroundColor: 'red', 
                                        borderRadius: 10, 
                                        height: 50,
                                        width: 200,
                                        color: 'white'
                                    }}
                                >
                                    <Spinner
                                        size="sm"
                                        animation={''}
                                        as='span'
                                    />
                                        Make Sales
                                    </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        size="sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                System Message
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalText}
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={show1}
                        onHide={handleClose1}
                        size="sm"
                    >
                        {/*<div class="print-content">*/}
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Sales Receipt
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5 className="text-center">
                                KENERGY LIMITED
                            </h5>
                            <p className="text-center">
                                11 Sapele Toad, Benin-city,
                                Edo State, Nigeria.
                            </p>
                            <p className="text-center">
                                +234 91 0000 0000
                            </p>
                            <hr/>
                            <Row className="mb-2">
                                <Col md={6}>
                                    <h6>Item Name:</h6> 
                                </Col>
                                <Col md={6}>
                                    {item}
                                </Col>
                            </Row>
                             <Row className="mb-2">
                                <Col md={6}>
                                    <h6>Qty:</h6> 
                                </Col>
                                <Col md={6}>
                                    {qty} Kg
                                </Col>
                            </Row>
                             <Row className="mb-2">
                                <Col md={6}>
                                    <h6>Price:</h6> 
                                </Col>
                                <Col md={6}>
                                    &#8358; {Intl.NumberFormat().format(price,2)}
                                </Col>
                            </Row>
                            <Row className="mb-2 justify-content-center">
                                <Col md={6}>
                                    <h6>Total:</h6>
                                </Col>
                                <Col md={6}>
                                    &#8358; {Intl.NumberFormat().format(total,2)}
                                </Col>
                            </Row>
                            <Row className="mb-2 justify-content-center">
                                <Col md={6}>
                                    <h6>Date:</h6>
                                </Col>
                                <Col md={6}>
                                    <span>{year}/{month}/{day}</span>
                                </Col>
                            </Row>
                            <hr/>
                            <p className="text-center">
                                Thanks For Your Patronage
                            </p>
                        </Modal.Body>
                        {/*</div> */}
                    </Modal>
                    
                </div>
            </Col>
        </Row>
        </>
    )
}
export default Sales