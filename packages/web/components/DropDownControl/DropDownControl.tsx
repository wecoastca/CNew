import * as React from "react";
import "./DropDownControl.css";

type Props = {
  handleChange: (event: React.ChangeEvent) => void;
  FLOWERS_LIST: Array<string>;
};

const DropDownControl = (props: Props) => {
  const { FLOWERS_LIST } = props;

  return (
    <div className="dropdown-control">
      <select
        className="dropdown-control_select"
        onChange={props.handleChange}
      >
        {FLOWERS_LIST &&
          FLOWERS_LIST.map((flower) => (
            <option key={flower} value={flower}>
              {flower}
            </option>
          ))}
      </select>
    </div>
  );
};

export default DropDownControl;
