import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Branches = ({counter, branchesById, getBranchCid, getBranchId}) => {
  const [branchId, setBranchId] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [writer, setWriter] = useState(undefined);
  const [branchNumber, setBranchNumber] = useState(undefined);
  const [showBranchNumber, setShowBranchNumber] = useState(undefined);
  const [branches, setBranches] = useState(undefined);
  const [childBranches, setChildBranches] = useState(undefined);
  const [NFTId, setNFTId] = useState(undefined);
  const [showNFTId, setShowNFTId] = useState(undefined);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setTitle(undefined);
    setWriter(undefined);
    setBranches(undefined);
    setShowNFTId(undefined);
    setText('The highest is the youngest,\nand the first one is a Seed.\nSome of them are Branches,\nnot all of them are Roots.\nRoots have growing Branches,\nsome Branches become Roots.');
    setSpinner(true);
  }, []);

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

  const getPrompt = async (promptId, branchNumberPlus) => {
    setText(undefined);
    const branchNumber = branchNumberPlus - 1;
    const cid = await getBranchCid(promptId, branchNumber);
    const branchId = await getBranchId(promptId, branchNumber);
    setBranchId(branchId);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setTitle(blob.data.title);
    setWriter(blob.data.writer);
    const branches = await branchesById(promptId);
    setBranches(branches);
    const childBranches = await branchesById(branchId);
    setChildBranches(childBranches);
    setShowNFTId(promptId);
    const showBranchNumber = branchNumber + 1;
    setShowBranchNumber(showBranchNumber);
    setText(blob.data.body);
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
        text && title ? 
        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <Row>
          <Col>
          <p style={{color: "lightgray"}}>{`ROOT PROMPT ID: ${showNFTId}`}</p>
          </Col>
          <Col>
          <p style={{color: "lightgray"}}>{`BRΛNCH: ${showBranchNumber}/${branches}`}</p>
          </Col>
          </Row>
          <h5 style={{color: "lightgray"}}>{`PROMPT ID: ${branchId}`}</h5>
          <br/>
          <h4>{`${title}`}</h4>
        </Card.Title>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        <br/>
        <p style={{color: "lightgray"}}>{`by ${writer}`}</p>
        <br/>
        <p style={{color: "lightgray"}}>{`BRΛNCHES: ${childBranches}`}</p>
        </Card.Text>
        </Card.Body>
      </Card>
        :
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto', minHeight: '15.5rem' }}>
        <Card.Body>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        { (!text && spinner) &&  <div><br/><div class="spinner-border"></div></div>}
        <br/>
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
              placeholder="Root Prompt Id : )"
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
    </Container>
  );
}

export default Branches;
