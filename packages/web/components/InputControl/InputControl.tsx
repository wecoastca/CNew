import * as React from 'react';
import './InputControl.css';
import * as DATA from '../../data/flowersList.json';

type Props = {
    type: 'DROPDOWN' | 'NUMERIC',
    inputDefaultValue?: number,
    handleChange : (event: React.ChangeEvent) => void
}

type Flower = {
    [key: string]: number | string | boolean
}

type State = {
  FLOWERS_LIST: Array<Flower>
}

class InputControl extends React.Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = { FLOWERS_LIST: [] };
  }

  fetchFlowersName() {
    return fetch('http://localhost:8080/api/v1/flowers/', {
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
      .then((FLOWERS_LIST) => { this.setState({ FLOWERS_LIST }); });
  }

    getTypeOfInputElement = () => {
      const { type } = this.props;
      const { FLOWERS_LIST } = this.state;
      // TODO: Выпили отсюда этот кал. лучше всего раздели селект и инпут на два отдельных компонента, потому что нормальные люди их не соединяют
      this.fetchFlowersName();
      const dropdownMarkup = (
        FLOWERS_LIST && FLOWERS_LIST.map((flower) => (
          <option key={flower.id.toString()} value={flower.id.toString()}>
            {flower.name}
          </option>
        ))
      );

      switch (type) {
        case 'DROPDOWN':
          return (
            <>
              <select
                className="input-control_select"
                onChange={this.props.handleChange}
              >
                {dropdownMarkup}
              </select>
            </>
          );
        case 'NUMERIC':
          return (
            <input
              className="input-control_numeric"
              onChange={this.props.handleChange}
            />
          );
        default:
          break;
      }
    }

    render() {
      return (
        <div className="input-control">
          {this.getTypeOfInputElement()}
        </div>
      );
    }
}

export default InputControl;
