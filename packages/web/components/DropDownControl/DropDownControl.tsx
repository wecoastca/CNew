import * as React from 'react';
import './DropDownControl.css';

type Props = {
    handleChange : (event: React.ChangeEvent) => void
}

type Flower = {
    [key: string]: number | string | boolean
}

type State = {
  FLOWERS_LIST: Array<Flower>
}

export default class DropDownControl extends React.Component<Props, State> {
 
  constructor(props:Props) {
    super(props);
    this.state = { FLOWERS_LIST: [] };
  }
  //TODO: пофикси повторный запрос хуками или еще как-нибудь, а то периодически все равно в консоль падает 304
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
      .then((FLOWERS_LIST) => { this.setState({ FLOWERS_LIST }); });
  }

  render() {
    const { FLOWERS_LIST } = this.state;

    const dropdownMarkup = (
      FLOWERS_LIST && FLOWERS_LIST.map((flower) => (
        <option key={flower.id.toString()} value={flower.id.toString()}>
          {flower.name}
        </option>
      )));

    return (
      <div className="dropdown-control">
        <select
          className="dropdown-control_select"
          onChange={this.props.handleChange}
        >
          {dropdownMarkup}
        </select>
      </div>
    );
  }
}
