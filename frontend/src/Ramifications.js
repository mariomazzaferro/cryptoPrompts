import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Ramifications = ({parentById, counter, ramificationsById, getRamificationCid, getRamificationId}) => {
  const [ramiId, setRamiId] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [ramNumber, setRamNumber] = useState(undefined);
  const [showRamNumber, setShowRamNumber] = useState(undefined);
  const [ramifications, setRamifications] = useState(undefined);
  const [childRams, setChildRams] = useState(undefined);
  const [NFTId, setNFTId] = useState(undefined);
  const [showNFTId, setShowNFTId] = useState(undefined);
  const [childId, setChildId] = useState(undefined);
  const [parentId, setParentId] = useState(0);

  const updateRamNumber = (e) => {
    let ramNum = e.target.value;
    setRamNumber(parseInt(ramNum));
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value;
    setNFTId(parseInt(NFTId));
  }

  const getNFT = async (e) => {
    e.preventDefault();
    if(0 < NFTId && NFTId <= counter && ramNumber > 0) {
      await getPrompt(NFTId, ramNumber);
    }
  }

  const updateChildId = (e) => {
    const childId = e.target.value;
    setChildId(parseInt(childId));
  }

  const getParent = async (e) => {
    e.preventDefault();
    let parentId;
    try {
      parentId = await parentById(childId);
      setParentId(parentId);
    } catch(err) {
      console.log(err.message);  
    }
  }

  const getPrompt = async (promptId, ramifiNumber) => {
    const ramificationNumber = ramifiNumber - 1;
    const cid = await getRamificationCid(promptId, ramificationNumber);
    const ramiId = await getRamificationId(promptId, ramificationNumber);
    setRamiId(ramiId);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setText(blob.data);
    const rams = await ramificationsById(promptId);
    setRamifications(rams);
    const childRams = await ramificationsById(ramiId);
    setChildRams(childRams);
    setShowNFTId(promptId);
    const showRamificationNumber = ramificationNumber + 1;
    setShowRamNumber(showRamificationNumber);
  }

  const next = async () => {
    if(ramNumber + 1 <= ramifications) {
      const c = ramNumber + 1;
      setRamNumber(c);
      await getPrompt(NFTId, c);
    }
  }

  const prev = async () => {
    if(ramNumber > 1) {
      const c = ramNumber - 1;
      setRamNumber(c);
      await getPrompt(NFTId, c);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
        <Button variant="dark" onClick={() => prev()} className="font-weight-bold" style={{color: "silver"}}>Previous Ramification</Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <Button variant="dark" onClick={() => next()} className="font-weight-bold" style={{color: "silver"}}>Next Ramification</Button>
        </Col>
      </Row>
      <br/>
      {
        text && 
        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <Row>
          <Col>
          <p style={{color: "lightgray"}}>{`PARENT PROMPT ID: ${showNFTId}`}</p>
          </Col>
          <Col>
          <p style={{color: "lightgray"}}>{`RAMIFICATION: ${showRamNumber}/${ramifications}`}</p>
          </Col>
          </Row>
          <h5 style={{color: "lightgray"}}>{`PROMPT ID: ${ramiId}`}</h5>
        </Card.Title>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        <br/>
        <p style={{color: "lightgray"}}>{`RAMIFICATIONS: ${childRams}`}</p>
        </Card.Text>
        </Card.Body>
      </Card>
      }

      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto', maxWidth: '64rem' }}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getNFT(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Parent Prompt Id : )"
              type="number"
              value={NFTId}
              onChange={e => updateNFTId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Form.Control
              placeholder="Ramification Number : )"
              type="number"
              value={ramNumber}
              onChange={e => updateRamNumber(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}>Get Ramification</Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
            </Card.Title>
            </Card.Body>
          </Card>

        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto', maxWidth: '32rem' }}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getParent(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Prompt Id : )"
              type="number"
              value={childId}
              onChange={e => updateChildId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}>Get Parent Prompt Id</Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
            </Card.Title>
            <Card.Text>
            <h5>{
              parentId != 0 &&
              `Parent Id: ${parentId}`
            }</h5>
            </Card.Text>
            </Card.Body>
          </Card>
    </Container>
  );
}

export default Ramifications;
