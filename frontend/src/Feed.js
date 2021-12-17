import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Feed = ({promptById, counter, branchesById, branchify, updateCounter, accounts}) => {
  const [text, setText] = useState(undefined);
  const [branches, setBranches] = useState(undefined);
  const [NFTId, setNFTId] = useState(undefined);
  const [showId, setShowId] = useState(undefined);
  const [branchText, setBranchText] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setNFTId(parseInt(counter)+1);
    setText('0x...The next one is the youngest, then they get older.');
    setBranches(0);
    setShowId(0);
  }, [counter]);

  const updateBranch = (e) => {
    const branchText = e.target.value;
    setBranchText(branchText);
  }

  const submitBranch = async (e) => {
    e.preventDefault();
    let resStatus;
    if(branchText && text && NFTId <= counter) {
      setLoading(true);
      resStatus = await branchify(branchText, text, NFTId);
    }
    setBranchText(undefined);
    formRef.current.reset();
    setLoading(false);
    if(resStatus) {
      alert("Branch Prompt minted successfully");
      await updateCounter();
    } else {
      alert("Branch failed");
    }
    const branches = await branchesById(NFTId);
    setBranches(branches);
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value;
    setNFTId(parseInt(NFTId));
  }

  const getNFT = async (e) => {
    e.preventDefault();
    if(NFTId && 0 < NFTId && NFTId <= parseInt(counter)) {
      getPrompt(NFTId);
    }
  }

  const getPrompt = async (id) => {
    const cid = await promptById(id);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setText(blob.data);
    const branches = await branchesById(id);
    setBranches(branches);
    setShowId(id);
  }

  const next = async () => {
    if(1 < NFTId) {
      const c = NFTId - 1;
      setNFTId(c);
      await getPrompt(c);
    }
  }

  const prev = async () => {
    if(NFTId < counter) {
      const c = NFTId + 1;
      setNFTId(c);
      getPrompt(c);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
        <Button variant="dark" onClick={() => prev()} className="font-weight-bold" style={{color: "silver"}}><i>Previous Prompt</i></Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <Button variant="dark" onClick={() => next()} className="font-weight-bold" style={{color: "silver"}}><i>Next Prompt</i></Button>
        </Col>
      </Row>
      <br/>
      {
        text && 
        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5 style={{color: "lightgray"}}>{`PROMPT ID: ${showId}`}</h5>
        </Card.Title>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        <br/>
        <p style={{color: "lightgray"}}>{`BRANCHES: ${branches}`}</p>
        <br/>
        { (accounts.length !== 0 && showId !== 0) &&
        <Form ref={formRef} onSubmit={(e) => submitBranch(e)}>
        <Form.Group>
        <Form.Control
          as="textarea" rows="13"  placeholder='Write your branch...    once minted, it will become a NFT prompt, anyone will be able to create new prompts by branching yours. Every prompt automatically starts with the "0x..." standard : )'
          onChange={e => updateBranch(e)}
        ></Form.Control>
        <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Mint Prompt $</i></Button>
        {loading && <div><br/><div class="spinner-border"></div></div>}
        </Form.Group>
        </Form>
        }
        </Card.Text>
        </Card.Body>
      </Card>
      }

      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '30rem' }}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getNFT(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Prompt Id : )"
              type="number"
              onChange={e => updateNFTId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Prompt by Id</i></Button>
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

export default Feed;