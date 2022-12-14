import React, { useState }from 'react';
import './PortfolioForm.css';
import { Col, Button, Form, FormGroup, Label, Input, Popover, PopoverHeader, PopoverBody,} from 'reactstrap';

const PortfolioForm = ({addStockSymbol}) => {

    const [ quotes, setQuotes ] = useState("");
    const [ avgCost, setAvgCost ] = useState("");
    const [ purchaseDate, setPurchaseDate ] = useState("");
    const [ errorMsgQuote, setErrorMsgQuote ] = useState("");
    const [ errorMsgAvgCost, setErrorMsgAvgCost ] = useState("");
    const [ errorMsgPurchaseDate, setErrorMsgPurchaseDate ] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false);

    const togglePopUp = () => setPopoverOpen(!popoverOpen);

    const handleChange = ({target}) => {
        setQuotes(target.value.toUpperCase());
      }

    const handleChangeCost = ({target}) => {
        setAvgCost(target.value);
      }

    const handlePurchaseDate = ({target}) => {
      setPurchaseDate(target.value);
      }

    const validate = () => {

      if (!quotes){
        setErrorMsgQuote("Stock symbol cannot be blank");
        return false;
      }

      if (!avgCost){
        setErrorMsgAvgCost("Average cost cannot be blank");
        return false;
      }

      let regex = /^\d+(\.\d{0,2})?$/g;
      if (!regex.test(avgCost)) {
        setErrorMsgAvgCost("Average cost must be number")
        return false;
      }

      let tradeDate = new Date(purchaseDate);
      let today = new Date();
      if(tradeDate > today) {
        setErrorMsgPurchaseDate("Purchase date cannot be from future 😄")
        return false;
      }

      return true;
    }

    const handleSubmit = (event) =>  {
      event.preventDefault();
      const isValid = validate();

      if (!isValid){
        return false;
      } else {
        setErrorMsgQuote("");
        setErrorMsgAvgCost("");
      }

      addStockSymbol(quotes.toUpperCase(), avgCost, purchaseDate);
      setQuotes("");
      setAvgCost("");
    }

    return (
        <div className="text-center" style={{width: "100%"}}>
            <h1>Portfolio tracker</h1>
            <div className="popUpButton">
              <Button color="success" id="Popover1" type="button">
                <strong>?</strong>
              </Button>
              <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={togglePopUp}>
                <PopoverHeader>User Guide</PopoverHeader>
                <PopoverBody>Enter only U.S stock symbol, all fields must be filled. Current price is not live 
                </PopoverBody>
              </Popover>
            </div>
            <Form className="form-wrapper" onSubmit={handleSubmit}>
              <FormGroup row>
                <Label className="form-label" for="exampleEmail" sm={5}>Stock Symbol</Label>
                <Col sm={2}>
                  <Input type="text" name="stock-symbol" value={quotes} onChange={handleChange} placeholder="Eg: AAPL" />
                  <div style={{ fontSize: 12, color: "red" }}>{errorMsgQuote}</div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="form-label" for="examplePassword" sm={5}>Average Cost</Label>
                <Col sm={2}>
                  <Input type="text" name="avg-cost" value={avgCost} onChange={handleChangeCost} placeholder="Eg: 98.01" />
                  <div style={{ fontSize: 12, color: "red" }}>{errorMsgAvgCost}</div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="form-label" for="examplePassword" sm={5}>Purchase  Date</Label>
                <Col sm={2}>
                  <Input type="date" name="date" value={purchaseDate} onChange={handlePurchaseDate} placeholder="03/11/2020" />
                  <div style={{ fontSize: 12, color: "green" }}>{errorMsgPurchaseDate}</div>
                </Col>
              </FormGroup>
              <Button color="primary">SUBMIT</Button>
            </Form> 

  </div>
    )
}

export default PortfolioForm;
