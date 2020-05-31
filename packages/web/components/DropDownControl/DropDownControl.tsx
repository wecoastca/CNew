import * as React from "react";
import "./DropDownControl.css";

import { Dropdown, Menu, Button } from "antd";
import { ClickParam } from "antd/lib/menu";

type Props = {
  handleChange: (event: React.ChangeEvent | ClickParam) => void;
  FLOWERS_LIST: Array<string>;
};

const DropDownControl = (props: Props) => {
  const { FLOWERS_LIST } = props;

  const list = (
    <Menu onClick={props.handleChange}>
      {FLOWERS_LIST &&
        FLOWERS_LIST.map((flower) => (
          <Menu.Item key={flower}>{flower}</Menu.Item>
        ))}
    </Menu>
  );
  return (
    <Dropdown className="dropdown-control" overlay={list} trigger={["click"]}>
      <Button onClick={(e) => e.preventDefault()}>Выберете тип цветка</Button>
    </Dropdown>
  );
};

export default DropDownControl;
