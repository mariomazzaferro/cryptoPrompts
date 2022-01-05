import React, { useState, useRef } from 'react';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';

const Sales = ({ownerOf, balanceOf, transfer, approve, accounts, addSale, removeSale}) => {
  const [NFTId, setNFTId] = useState(undefined);
  const [ownerById, setOwnerById] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);
  const [tokenId, setTokenId] = useState(undefined);
  const [approveTo, setApproveTo] = useState(undefined);
  const [approveId, setApproveId] = useState(undefined);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [addId, setAddId] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [removeId, setRemoveId] = useState(undefined);
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const formRef4 = useRef(null);

  const updateFrom = (e) => {
    const from = e.target.value;
    setFrom(from);
  }

  const updateTo = (e) => {
    const to = e.target.value;
    setTo(to);
  }

  const updateTokenId = (e) => {
    const tokenId = e.target.value;
    setTokenId(tokenId);
  }

  const transferToken = async (e) => {
    e.preventDefault();
    if(from && to && tokenId) {
      setLoading1(true);
      try {
        const resStatus = await transfer(from, to, tokenId);
        if(resStatus) {
          alert("Token transfer successful");
          setFrom(undefined);
          setTo(undefined);
          setTokenId(undefined);
          formRef1.current.reset();
        } else {
          alert("Token transfer failed");
        }
      } catch(err){
        console.log(err.message);
      }
      setLoading1(false);
    }
  }

  const updateApproveTo = (e) => {
    const to = e.target.value;
    setApproveTo(to);
  }

  const updateApproveId = (e) => {
    const tokenId = e.target.value;
    setApproveId(tokenId);
  }

  const approveAddress = async (e) => {
    e.preventDefault();
    if(approveTo && approveId) {
      setLoading2(true);
      try {
        const resStatus = await approve(approveTo, approveId);
        if(resStatus) {
          alert("Address approved successfully");
          setApproveTo(undefined);
          setApproveId(undefined);
          formRef2.current.reset();
        } else {
          alert("Address approve failed");
        }
      } catch(err){
        console.log(err.message);
      }
      setLoading2(false);
    }
  }

  const updateOwner = (e) => {
    const owner = e.target.value;
    setOwner(owner);
    setBalance(undefined);
  }

  const getBalance = async (e) => {
    e.preventDefault();
    try {
      let balance = await balanceOf(owner);
      setBalance(balance);
    } catch(err){}
  }

  const updateNFTId = (e) => {
    const NFTId = e.target.value;
    setNFTId(NFTId);
    setOwnerById(undefined);
  }

  const getOwner = async (e) => {
    e.preventDefault();
    if(NFTId) {
      let ownerById = await ownerOf(NFTId);
      setOwnerById(ownerById);
    }
  }

  const updateAddId = (e) => {
    const addId = e.target.value;
    setAddId(addId);
  }

  const updatePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  }

  const putForSale = async (e) => {
    e.preventDefault();
    if(addId && price) {
      setLoading3(true);
      try {
        const resStatus = await addSale(addId, price);
        if(resStatus) {
          alert("Sale added successfully");
          setAddId(undefined);
          setPrice(undefined);
          formRef3.current.reset();
        } else {
          alert("Sale update failed");
        }
      } catch(err){
        console.log(err.message);
      }
      setLoading3(false);
    }
  }

  const updateRemoveId = (e) => {
    const removeId = e.target.value;
    setRemoveId(removeId);
  }

  const removeFromSale = async (e) => {
    e.preventDefault();
    if(removeId) {
      setLoading4(true);
      try {
        const resStatus = await removeSale(removeId);
        if(resStatus) {
          alert("Sale removed successfully");
          setRemoveId(undefined);
          formRef4.current.reset();
        } else {
          alert("Sale update failed");
        }
      } catch(err){
        console.log(err.message);
      }
      setLoading4(false);
    }
  }

  return (
    <Container>
      { accounts.length !== 0 &&
      <div>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem'}}>
        <Card.Body>
            <Form inline ref={formRef3} onSubmit={(e) => putForSale(e)}>
              <Form.Group>
              <Row>
              <Col>
              <Form.Control
                placeholder="Prompt Id : )"
                type="number"
                onChange={e => updateAddId(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Form.Control
                placeholder="Sale Price (MATIC) : )"
                type="string"
                onChange={e => updatePrice(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Put up for Sale $</i></Button>
              {loading3 && <div class="spinner-border"></div>}
              </Col>
              </Row>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem' }}>
        <Card.Body>
          <Form inline ref={formRef4} onSubmit={(e) => removeFromSale(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Prompt Id : )"
              type="number"
              onChange={e => updateRemoveId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Remove from Sale $</i></Button>
            {loading4 && <div class="spinner-border"></div>}
            </Col>
            </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      </div>
      }

      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem' }}>
        <Card.Body>
          <Card.Title>
          <Form inline onSubmit={(e) => getOwner(e)}>
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
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Owner's Address</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          <Card.Text>
            <h5>{
              (NFTId && ownerById) &&
              `Owner: ${ownerById}`
            }</h5>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem'}}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => getBalance(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Address : )"
              type="string"
              onChange={e => updateOwner(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Prompt Balance</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
            </Card.Title>
            <Card.Text>
            <h5>{
              (owner && balance) &&
              `Prompt Balance: ${balance}`
            }</h5>
            </Card.Text>
            </Card.Body>
          </Card>
      
      { accounts.length !== 0 &&
      <div>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem'}}>
        <Card.Body>
          <Card.Title>
            <Form inline ref={formRef1} onSubmit={(e) => transferToken(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Address From : ("
              type="string"
              onChange={e => updateFrom(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Form.Control
              placeholder="Address To : )"
              type="string"
              onChange={e => updateTo(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Form.Control
              placeholder="Prompt Id : )"
              type="number"
              onChange={e => updateTokenId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Transfer Prompt $</i></Button>
            {loading1 && <div class="spinner-border"></div>}
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto', maxWidth: '57rem'}}>
        <Card.Body>
          <Card.Title>
            <Form inline ref={formRef2} onSubmit={(e) => approveAddress(e)}>
              <Form.Group>
              <Row>
              <Col>
              <Form.Control
                placeholder="Address To : )"
                type="string"
                onChange={e => updateApproveTo(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Form.Control
                placeholder="Prompt Id : )"
                type="number"
                onChange={e => updateApproveId(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Approve to Transfer $</i></Button>
              {loading2 && <div class="spinner-border"></div>}
              </Col>
              </Row>
              </Form.Group>
            </Form>
            </Card.Title>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      }
    </Container>
  );
}

export default Sales;