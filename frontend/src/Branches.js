import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Branches = ({parentById, counter, branchesById, getBranchCid, getBranchId}) => {
  const [branchId, setBranchId] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [branchNumber, setBranchNumber] = useState(undefined);
  const [showBranchNumber, setShowBranchNumber] = useState(undefined);
  const [branches, setBranches] = useState(undefined);
  const [childBranches, setChildBranches] = useState(undefined);
  const [NFTId, setNFTId] = useState(undefined);
  const [showNFTId, setShowNFTId] = useState(undefined);
  const [childId, setChildId] = useState(undefined);
  const [parentId, setParentId] = useState(0);

  const updateBranchNumber = (e) => {
    let branchNum = e.target.value;
    setBranchNumber(parseInt(branchNum));
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value;
    setNFTId(parseInt(NFTId));
  }

  const getNFT = async (e) => {
    e.preventDefault();
    if(0 < NFTId && NFTId <= counter && branchNumber > 0) {
      await getPrompt(NFTId, branchNumber);
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

  const getPrompt = async (promptId, branchNumberPlus) => {
    const branchNumber = branchNumberPlus - 1;
    const cid = await getBranchCid(promptId, branchNumber);
    const branchId = await getBranchId(promptId, branchNumber);
    setBranchId(branchId);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setText(blob.data);
    const branches = await branchesById(promptId);
    setBranches(branches);
    const childBranches = await branchesById(branchId);
    setChildBranches(childBranches);
    setShowNFTId(promptId);
    const showBranchNumber = branchNumber + 1;
    setShowBranchNumber(showBranchNumber);
  }

  const next = async () => {
    if(branchNumber + 1 <= branches) {
      const c = branchNumber + 1;
      setBranchNumber(c);
      await getPrompt(NFTId, c);
    }
  }

  const prev = async () => {
    if(branchNumber > 1) {
      const c = branchNumber - 1;
      setBranchNumber(c);
      await getPrompt(NFTId, c);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
        <Button variant="dark" onClick={() => prev()} className="font-weight-bold" style={{color: "silver"}}><i>Previous Branch</i></Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <Button variant="dark" onClick={() => next()} className="font-weight-bold" style={{color: "silver"}}><i>Next Branch</i></Button>
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
          <p style={{color: "lightgray"}}>{`BRANCH: ${showBranchNumber}/${branches}`}</p>
          </Col>
          </Row>
          <h5 style={{color: "lightgray"}}>{`PROMPT ID: ${branchId}`}</h5>
        </Card.Title>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        <br/>
        <p style={{color: "lightgray"}}>{`BRANCHES: ${childBranches}`}</p>
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
              placeholder="Branch Number : )"
              type="number"
              value={branchNumber}
              onChange={e => updateBranchNumber(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Specific Branch</i></Button>
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
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Parent Prompt Id</i></Button>
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

export default Branches;
