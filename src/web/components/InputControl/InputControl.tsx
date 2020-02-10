import * as React from 'react';
import './InputControl.css';
import * as DATA from '../../data/flowersList.json';

type Props = {
    type: 'DROPDOWN' | 'NUMERIC',
    inputDefaultValue?: number,
}

type Flower = {
    [key: string]: number | string | boolean
}

const FLOWERS_LIST: Array<Flower> = DATA;
class InputControl extends React.Component<Props> {
    getTypeOfInputElement = () => {
      const { type } = this.props;

      const dropdownMarkup = (
        FLOWERS_LIST.map((flower) => (<option key={flower.id.toString()} value={flower.id.toString()}>{flower.Name}</option>)));

      switch (type) {
        case 'DROPDOWN':
          return (
            <>
              <select className="input-control_select">
                {dropdownMarkup}
              </select>
            </>
          );
        case 'NUMERIC':
          return (<input className="input-control_numeric" />);
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
