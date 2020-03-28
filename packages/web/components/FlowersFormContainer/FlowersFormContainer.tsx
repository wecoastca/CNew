import * as React from 'react';
import './FlowersFormContainer.css';
import DropDownControl from '../DropDownControl/DropDownControl';
import InputControl from '../InputControl/InputControl';
import GenerateButton from '../GenerateButton/GenerateButton';

type Props = {}

type State = {numberOfFlowers: number, FLOWERS_NAMES: Array<string>}

export default class FlowersFormContainer extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      numberOfFlowers: 0,
      FLOWERS_NAMES: []
    };
  }

  componentDidMount(){
    fetch('http://localhost:8080/api/v1/flowers/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((FLOWERS_LIST) => { 
        let names = [];

        FLOWERS_LIST && FLOWERS_LIST.map((flower) => {
          names.push(flower.name)
        })
        
        this.setState({FLOWERS_NAMES: names});
      })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {FLOWERS_NAMES} = this.state;
    // это не работает если че
    fetch('http://localhost:8080/api/v1/flowers/name', {
      method: 'POST',
      body: JSON.stringify(FLOWERS_NAMES),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  }

  handleReset = (event) => {
    event.preventDefault();
    this.setState({
      numberOfFlowers: 0,
      FLOWERS_NAMES: [],
    });
  }

  handleFlowersNumber = (event) => {
    this.setState({ numberOfFlowers: event.target.value });
  }

  handleFlowersType = (event) => {
    this.setState({ FLOWERS_NAMES: event.target.value });
  }

  render() {
    return (
      <form className="flowers-form" onSubmit={this.handleSubmit}>
        <div className="inputs-wrapper">
          <div className="flowers-number">
            <p className="suggest-text">
              1. Enter number of flowers
              {' '}
              <br />
              you want to see in bouquete.
            </p>
            <InputControl
              handleChange={this.handleFlowersNumber}
            />
          </div>
          <div className="flowers-type">
            <p className="suggest-text">
              2. Choose
              {' '}
              <b>main type</b>
              {' '}
              of flowers
              <br />
              you want to see in bouquete.
            </p>
            <DropDownControl
              handleChange={this.handleFlowersType}
              FLOWERS_LIST={this.state.FLOWERS_NAMES}
            />
          </div>
          <div className="generate">
            <p className="suggest-text">
              3. Press
              {' '}
              <b>Generate</b>
              {' '}
              and wait for
              <br />
              magic.
            </p>
            <GenerateButton />
          </div>
        </div>
      </form>
    );
  }
}
