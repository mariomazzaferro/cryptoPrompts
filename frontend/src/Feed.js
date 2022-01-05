import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Feed = ({promptById, counter, branchesById, branchify, updateCounter, accounts, collectionList, validPrice, buy}) => {
  const [text, setText] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [writer, setWriter] = useState(undefined);
  const [root, setRoot] = useState(undefined);
  const [branches, setBranches] = useState(undefined);
  const [NFTId, setNFTId] = useState(undefined);
  const [showId, setShowId] = useState(undefined);
  const [branchText, setBranchText] = useState(undefined);
  const [branchTitle, setBranchTitle] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [collWriter, setCollWriter] = useState(false);
  const [list, setList] = useState(false);
  const [price, setPrice] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setNFTId(parseInt(counter)+1);
    setTitle(undefined);
    setWriter(undefined);
    setRoot(undefined);
    setBranches(undefined);
    setShowId(undefined);
    setText('The highest is the youngest.\nNot all of them are branches.\nNot all of them are roots.\nRoots have growing branches.\nSome branches become roots.');
    setSpinner(true);
  }, [counter]);

  const updateBranch = (e) => {
    const branchText = e.target.value;
    setBranchText(branchText);
  }

  const updateBranchTitle = (e) => {
    const branchTitle = e.target.value;
    setBranchTitle(branchTitle);
  }

  const submitBranch = async (e) => {
    e.preventDefault();
    if(branchText && text && branchTitle && NFTId <= counter) {
      setLoading(true);
      let res;
      try {
        res = await branchify(branchTitle, branchText, text, NFTId);
      } catch(err) {
        console.log(err.message);  
      }
      setBranchText(undefined);
      formRef.current.reset();
      setLoading(false);
      if(res) {
        if(res.status) {
          const newId = res.events.Transfer.returnValues[2];
          alert(`Prompt Id ${newId} minted successfully`);
          await updateCounter();
        } else {
          alert("Branching failed");
        }
      } else {
        alert("Branching failed");
      }
    } else {
      alert("Branching failed. Make sure your Prompt has a title and a body.");
    }
  }

  const updateCollWriter = (e) => {
    const collWriter = e.target.value;
    setCollWriter(collWriter);
    setList(undefined);
  }

  const getCollection = async (e) => {
    e.preventDefault();
    let list;
    try {
      list = await collectionList(collWriter);
    } catch(err) {
      console.log(err.message);  
    }
    setList(list);
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
    setText(undefined);
    setRoot(undefined);
    const cid = await promptById(id);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setTitle(blob.data.title);
    setWriter(blob.data.writer);
    if(blob.data.root) {
      setRoot(blob.data.root);
    }
    const branches = await branchesById(id);
    const price = await validPrice(id);
    setBranches(branches);
    setPrice(price);
    setShowId(id);
    setText(blob.data.body);
  }

  const next = async () => {
    if(1 < NFTId) {
      const c = NFTId - 1;
      setNFTId(c);
      await getPrompt(c);
    } else {
      setNFTId(counter);
      await getPrompt(counter);
    }
  }

  const prev = async () => {
    if(NFTId < counter) {
      const c = NFTId + 1;
      setNFTId(c);
      await getPrompt(c);
    } else {
      setNFTId(1);
      await getPrompt(1);
    }
  }

  const buyPrompt = async () => {
    if(price && showId) {
      setLoading2(true);
      let resStatus;
      try {
        resStatus = await buy(showId, price);
      } catch(err) {
        console.log(err);
      }
      if(resStatus) {
        setLoading2(false);
        setPrice(undefined);
        alert("Successful Purchase");
      } else {
        setLoading2(false);
        alert("Purchase Failed");
      }
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
        text && title ? 
        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5 style={{color: "lightgray"}}>{`PROMPT ID: ${showId}`}</h5>
          <br/>
          <h4>{`${title}`}</h4>
        </Card.Title>
        <Card.Text>
        <br/>
        <h5 style={{whiteSpace: "pre-wrap"}}>{text && `${text}`}</h5>
        <br/>
        <p style={{color: "lightgray"}}>{`by ${writer}`}</p>
        { root && 
          <p style={{color: "lightgray"}}>{`ROOT PROMPT ID: ${root}`}</p>
        }
        <p style={{color: "lightgray"}}>{`BRANCHES: ${branches}`}</p>
        { price && 
          <p style={{color: "goldenrod"}}><b><i>{`PRICE: ${price} MATIC`}</i></b></p>
        }
        { (accounts.length !== 0 && showId !== undefined && price) && 
          <div>
          <Button onClick={() => buyPrompt()} variant="dark" className="font-weight-bold" style={{color: "silver"}}><i>Buy $$</i></Button>
          {loading2 && <div><br/><div class="spinner-border"></div></div>}
          <br/>
          <br/>
          </div>
        }
        { (accounts.length !== 0 && showId !== undefined) &&
        <Form ref={formRef} onSubmit={(e) => submitBranch(e)}>
        <Form.Group>
        <br/>
        <Form.Control
          style={{ textAlign: 'center' }}
          as="textarea" rows="1"  placeholder='Title : )'
          onChange={e => updateBranchTitle(e)}
        ></Form.Control>
        <br/>
        <Form.Control
          style={{ textAlign: 'center' }}
          as="textarea" rows="13"  placeholder='Write your Branch Prompt... : )'
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
      <Row>
      <Card className="shadow-lg p-3 mb-5 ml-3 mr-5 bg-white rounded" style={{ width: 'auto' }}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getCollection(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Writer's address : )"
              type="string"
              onChange={e => updateCollWriter(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Writer's Collection</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          <Card.Text>
            <h5>{
              list &&
              `Collection: ${list}`
            }</h5>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-lg p-3 mb-5 ml-3 bg-white rounded" style={{ width: 'auto', maxWidth: '25rem', maxHeight: '7.7rem' }}>
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
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>View Prompt</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Feed;