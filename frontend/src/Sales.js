import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Sales = ({ownerOf, balanceOf, transfer, approve, accounts, addSale, removeSale, auLength, promptById, branchesById, auctionPromptId, auctionSeller, auctionMinValue, auctionIncrement, auctionTimeLeft, auctionTopBidder, auctionBids, auctionHasPrize, startAuction, placeBid, withdrawFunds, withdrawPrize, viewFunds, updateAuctionLength, promptAuctions}) => {
  const [NFTId, setNFTId] = useState(undefined);
  const [ownerById, setOwnerById] = useState(undefined);
  const [owner, setOwner] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);
  const [tokenId, setTokenId] = useState(undefined);
  const [approveTo, setApproveTo] = useState(undefined);
  const [approveId, setApproveId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [addId, setAddId] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [removeId, setRemoveId] = useState(undefined);
  const [auPromptId, setAuPromptId] = useState(undefined);
  const [auMinValue, setAuMinValue] = useState(undefined);
  const [auIncrement, setAuIncrement] = useState(undefined);
  const [auctionId, setAuctionId] = useState(undefined);
  const [viewAuctionId, setViewAuctionId] = useState(undefined);
  const [showId, setShowId] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [text, setText] = useState(undefined);
  const [branches, setBranches] = useState(undefined);
  const [root, setRoot] = useState(undefined);
  const [writer, setWriter] = useState(undefined);
  const [seller, setSeller] = useState(undefined);
  const [minValue, setMinValue] = useState(undefined);
  const [increment, setIncrement] = useState(undefined);
  const [timeLeft, setTimeLeft] = useState(undefined);
  const [topBidder, setTopBidder] = useState(undefined);
  const [bids, setBids] = useState(undefined);
  const [hasPrize, setHasPrize] = useState(undefined);
  const [bid, setBid] = useState(undefined);
  const [funds, setFunds] = useState(undefined);
  const [promptAu, setPromptAu] = useState(undefined);
  const [promptAuctionList, setPromptAuctionList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const formRef = useRef(null);
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const formRef4 = useRef(null);
  const formRef5 = useRef(null);

  useEffect(() => {
    setAuctionId(parseInt(auLength));
    setTitle(undefined);
    setWriter(undefined);
    setRoot(undefined);
    setBranches(undefined);
    setShowId(undefined);
    setText('The highest is the youngest.\nNot all of them are branches.\nNot all of them are roots.\nRoots have growing branches.\nSome branches become roots.');
    setSpinner(true);
  }, [auLength, accounts]);

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

  const getAuction = async (auctionId) => {
    setText(undefined);
    setRoot(undefined);
    setAuctionId(auctionId);
    const promptId = await auctionPromptId(auctionId);
    const seller = await auctionSeller(auctionId);
    const minValue = await auctionMinValue(auctionId);
    const increment = await auctionIncrement(auctionId);
    const timeLeft = await auctionTimeLeft(auctionId);
    const topBidder = await auctionTopBidder(auctionId);
    const bids = await auctionBids(auctionId);
    const hasPrize = await auctionHasPrize(auctionId);
    console.log(`hasPrize: ${hasPrize}`);
    let funds;
    if(accounts.length !== 0) {
      funds = await viewFunds(auctionId);
    }
    const cid = await promptById(promptId);
    const blob = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    setTitle(blob.data.title);
    setWriter(blob.data.writer);
    if(blob.data.root) {
      setRoot(blob.data.root);
    }
    const branches = await branchesById(promptId);
    setBranches(branches);
    setShowId(promptId);
    setSeller(seller);
    setMinValue(minValue);
    setIncrement(increment);
    setTimeLeft(timeLeft);
    setTopBidder(topBidder);
    setBids(bids);
    setHasPrize(hasPrize);
    setFunds(funds);
    setText(blob.data.body);
  }

  const next = async () => {
    if(auLength > 0) {
      if(0 < auctionId) {
        const c = auctionId - 1;
        setAuctionId(c);
        await getAuction(c);
      } else {
        setAuctionId(auLength-1);
        await getAuction(auLength-1);
      }
    }
  }

  const prev = async () => {
    if(auLength > 0) {
      if(auctionId < auLength-1) {
        const c = auctionId + 1;
        setAuctionId(c);
        await getAuction(c);
      } else {
        setAuctionId(0);
        await getAuction(0);
      }
    }
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

  const updateAuPromptId = (e) => {
    const auPromptId = e.target.value;
    setAuPromptId(auPromptId);
  }

  const updateAuMinValue = (e) => {
    const auMinValue = e.target.value;
    setAuMinValue(auMinValue);
  }

  const updateAuIncrement = (e) => {
    const auIncrement = e.target.value;
    setAuIncrement(auIncrement);
  }

  const newAuction = async (e) => {
    e.preventDefault();
    if(auPromptId && auMinValue && auIncrement) {
      setLoading5(true);
      try {
        const resStatus = await startAuction(auPromptId, auMinValue, auIncrement);
        if(resStatus) {
          alert("Auction started successfully");
          setAuPromptId(undefined);
          setAuMinValue(undefined);
          setAuIncrement(undefined);
          formRef5.current.reset();
        } else {
          alert("Auction failed");
        }
      } catch(err){
        console.log(err.message);
      }
      updateAuctionLength();
      setLoading5(false);
    }
  }

  const updateViewAuctionId = (e) => {
    const viewAuctionId = e.target.value;
    setViewAuctionId(viewAuctionId);
  }

  const viewAuction = async (e) => {
    e.preventDefault();
    if(viewAuctionId && viewAuctionId < auLength) {
      await getAuction(viewAuctionId);
    }
  }

  const updateBid = (e) => {
    const bid = e.target.value;
    setBid(bid);
  }

  const transferFunds = async (e) => {
    e.preventDefault();
    if(bid) {
      setLoading(true);
      try {
        const resStatus = await placeBid(auctionId, bid);
        if(resStatus) {
          alert("Funds transfered successfully");
          setBid(undefined);
          formRef.current.reset();
        } else {
          alert("Transfer failed");
        }
      } catch(err){
        console.log(err.message);
      }
      await getAuction(auctionId);
      setLoading(false);
    }
  }

  const getPrize = async () => {
    setLoading6(true);
    let resStatus;
    try {
      resStatus = await withdrawPrize(auctionId);
    } catch(err) {
      console.log(err.message);  
    }
    if(resStatus) {
      alert("Withdraw succeeded");
    } else {
      alert("Withdraw failed");
    }
    await getAuction(auctionId);
    setLoading6(false);
  }

  const getFunds = async () => {
    setLoading6(true);
    let resStatus;
    try {
      resStatus = await withdrawFunds(auctionId);
    } catch(err) {
      console.log(err.message);  
    }
    if(resStatus === true) {
      alert("Withdraw succeeded");
    } else {
      alert("Withdraw failed");
    }
    await getAuction(auctionId);
    setLoading6(false);
  }

  const updatePromptAu = (e) => {
    const promptAu = e.target.value;
    setPromptAu(promptAu);
    setPromptAuctionList([]);
  }

  const getPromptAuctions = async (e) => {
    e.preventDefault();
    if(promptAu) {
      let promptAuctionList;
      try {
        promptAuctionList = await promptAuctions(promptAu);
      } catch(err) {
        console.log(err.message);  
      }
      setPromptAuctionList(promptAuctionList);
    }
  }

  return (
    <div>
      { accounts.length !== 0 &&
      <Container>
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

      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: 'auto'}}>
        <Card.Body>
            <Form inline ref={formRef5} onSubmit={(e) => newAuction(e)}>
              <Form.Group>
              <Row>
              <Col>
              <Form.Control
                placeholder="Prompt Id : )"
                type="number"
                onChange={e => updateAuPromptId(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Form.Control
                placeholder="Minimal Value (MATIC) : )"
                type="string"
                onChange={e => updateAuMinValue(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Form.Control
                placeholder="Increment (MATIC) : )"
                type="string"
                onChange={e => updateAuIncrement(e)}
              ></Form.Control>
              </Col>
              <Col>
              <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Start Auction $</i></Button>
              {loading5 && <div class="spinner-border"></div>}
              </Col>
              </Row>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      }

    <Container>
      <Row>
        <Col>
        <Button onClick={() => prev()} variant="dark" className="font-weight-bold" style={{color: "silver"}}><i>Previous Auction</i></Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
        <Button onClick={() => next()} variant="dark" className="font-weight-bold" style={{color: "silver"}}><i>Next Auction</i></Button>
        </Col>
      </Row>
      <br/>
      {
        text && title ? 
        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ width: 'auto' }}>
        <Card.Body>
        <Card.Title>
          <h5 style={{color: "lightgray"}}>{`AUCTION ID: ${auctionId}`}</h5>
          <br/>
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
        <br/>
        <p style={{color: "lightgray"}}>{`SELLER: ${seller}`}</p>
        <p style={{color: "lightgray"}}>{`MINIMAL VALUE: ${minValue} MATIC`}</p>
        <p style={{color: "lightgray"}}>{`MINIMAL INCREMENT: ${increment} MATIC`}</p>
        <p style={{color: "lightgray"}}>{`TOP BIDDER: ${topBidder}`}</p>
        { bids.length !== 0 && 
          <p style={{color: "lightgray"}}>{`BIDS: ${bids}`}</p>
        }
        { funds && 
          <p style={{color: "lightgray"}}>{`YOUR FUNDS: ${funds} MATIC`}</p>
        }
        { timeLeft > 0 ? 
          <p style={{color: "lightgray"}}>{`TIME LEFT: ${timeLeft}`}</p>
          :
          <p style={{color: "lightgray"}}>{`TIME LEFT: 0`}</p>
        }

        { (timeLeft <= 0 && accounts.length !== 0 && showId !== undefined) && 
          <div>
          { accounts[0] === seller || accounts[0] === topBidder ?
            <div>
            { hasPrize === true &&
              <Button onClick={() => getPrize()} variant="dark" className="font-weight-bold" style={{color: "silver"}}><i>Withdraw Prize $</i></Button>
            }
            {loading6 && <div><br/><div class="spinner-border"></div></div>}
            </div>
            :
            <div>
            { funds != 0  &&
              <Button onClick={() => getFunds()} variant="dark" className="font-weight-bold" style={{color: "silver"}}><i>Withdraw Funds $</i></Button>
            }
            {loading6 && <div><br/><div class="spinner-border"></div></div>}
            </div>
          }
          </div>
        }


        { (accounts.length !== 0 && showId !== undefined && timeLeft > 0) &&
        <Form ref={formRef} onSubmit={(e) => transferFunds(e)}>
        <Form.Group>
        <br/>
        <Form.Control
          onChange={e => updateBid(e)}
          style={{ textAlign: 'center' }}
          as="textarea" rows="1"  placeholder='Bid : )'
        ></Form.Control>
        <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Bid $$</i></Button>
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
            <Form inline onSubmit={(e) => getPromptAuctions(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Prompt Id : )"
              type="number"
              onChange={e => updatePromptAu(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>Get Prompt's Auctions</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          <Card.Text>
            <h5>{
              promptAuctionList.length !== 0 &&
              `Prompt's Auction Ids: ${promptAuctionList}`
            }</h5>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="shadow-lg p-3 mb-5 ml-3 bg-white rounded" style={{ width: 'auto', maxWidth: '25rem', maxHeight: '7.7rem' }}>
        <Card.Body>
          <Card.Title>
            <Form inline onSubmit={(e) => viewAuction(e)}>
            <Form.Group>
            <Row>
            <Col>
            <Form.Control
              placeholder="Auction Id : )"
              type="number"
              onChange={e => updateViewAuctionId(e)}
            ></Form.Control>
            </Col>
            <Col>
            <Button variant="dark" type="submit" className="font-weight-bold" style={{color: "silver"}}><i>View Auction</i></Button>
            </Col>
            </Row>
            </Form.Group>
          </Form>
          </Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>

      
    <Container>
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
    </div>
  );
}

export default Sales;