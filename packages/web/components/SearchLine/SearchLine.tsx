import * as React from "react";
import { Input } from "antd";

import "./SearchLine.css";

const { Search } = Input;

export const SearchLine = () => {
  return (
    <>
      <Search
        placeholder="введите название цветка"
        onSearch={(value) => {
          console.log(value);
        }}
        enterButton
      />
    </>
  );
};
