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
export class InputControl extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    getTypeOfInputElement = () => {
        const { type } = this.props;

        const dropdownMarkup = (
            FLOWERS_LIST.map((flower) => {
                return (<option key={flower.id.toString()} value={flower.id.toString()}>{flower.Name}</option>);
            })
        );

        switch (type) {
            case 'DROPDOWN':
                return (
                    <React.Fragment>
                        <select className="input-control_select">
                            {dropdownMarkup}
                        </select>
                    </React.Fragment>
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