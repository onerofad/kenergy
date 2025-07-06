import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { useState } from "react"
import Custombar from "./CustomBar"
import { Container } from "react-bootstrap"
import { Link } from "react-router"
import { BiMessageError } from "react-icons/bi"

const Register = ({mobile}) => {

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")

    const [modalText, setmodalText] = useState("")

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const register = () => {
        if(username == "" || password == "" || cpassword == ""){
            setmodalText("Please enter all Fields")
            setShow(true)
        }else if(password !== cpassword){
            setmodalText("Passwords do not match")
            setShow(true)
        }else{
            
        }
    }


    return(
        <>
        <Custombar link={'/'} link_name={'Login'} />
        <Container>
        <Row style={{width: '98%'}}>
            <Col>
                <div style={{paddingTop: 100}}>  
                    <h4>
                        Welcome, KENERGY LIMITED
                    </h4>
                    <hr/>
                </div>
            </Col>
        </Row>
        <div style={{paddingTop: 30}}>
         <Form>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3 justify-content-center">
                <Form.Group as={Col} md='5'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        value={cpassword}
                        onChange={(e) => setcpassword(e.target.value)}
                
                    />
                </Form.Group>
            </Row>
            <Row className="justify-content-center"> 
                <Form.Group as={Col} md={5}>
                    <Button onClick={register}>
                        Register
                    </Button>
                    &nbsp;
                    Already Have Account?
                    &nbsp; 
                    <Link to='/'>
                        Login
                    </Link>
                </Form.Group>
            </Row>
        </Form> 
        </div>
        <Modal size="sm" onHide={handleClose} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Error Message</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{alignContent: 'center'}}>
                <BiMessageError size={40} color="red" />
                &nbsp;
                {modalText}

            </Modal.Body>
        </Modal>
    </Container>
    </>        
    )
}

export default Register