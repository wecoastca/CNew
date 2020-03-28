import * as React from 'react';
import './DropDownControl.css';

type Props = {
    handleChange : (event: React.ChangeEvent) => void,
    FLOWERS_LIST: Array<string>
}
export default class DropDownControl extends React.Component<Props> {
 
  constructor(props:Props) {
    super(props);
  }

  render() {
    const { FLOWERS_LIST } = this.props;

    if(!FLOWERS_LIST){
      return (<div>fdsfs </div>)
    }

    return (
      <div className="dropdown-control">
        <select
          className="dropdown-control_select"
          onChange={this.props.handleChange}
        >
          {FLOWERS_LIST && FLOWERS_LIST.map((flower) => (
       <option key={flower} value={flower}>
         {flower}
       </option>
       ))}
        </select>
      </div>
    );
  }
}
