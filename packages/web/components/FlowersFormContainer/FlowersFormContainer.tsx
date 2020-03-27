import * as React from 'react';
import './FlowersFormContainer.css';
import InputControl from '../InputControl/InputControl';
import GenerateButton from '../GenerateButton/GenerateButton';

type Props = {}
type State = {numberOfFlowers: number, typeOfFlower: Array<string>}

export default class FlowersFormContainer extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      numberOfFlowers: 0,
      typeOfFlower: ['Rose', 'Chrysanthemums', 'Tulips', 'Lilies', 'Poinsettias', 'Narcissus'],
    };
  }

handleSubmit = (event) => {
  event.preventDefault();

  // let stringForRequest = [this.state.numberOfFlowers, this.state.typeOfFlower]
  // пока хз как можно передать параметр для поиска, но он должен быть после flowers
  fetch('http://localhost:8080/api/v1/flowers/', {
    method: 'GET',
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
    typeOfFlower: [],
  });
}

handleFlowersNumber = (event) => {
  this.setState({ numberOfFlowers: event.target.value });
}

handleFlowersType = (event) => {
  this.setState({ typeOfFlower: event.target.value });
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
            type="NUMERIC"
            inputDefaultValue={3}
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
          <InputControl
            type="DROPDOWN"
            handleChange={this.handleFlowersType}
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
