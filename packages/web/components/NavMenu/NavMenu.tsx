import * as React from 'react';
import {Menu} from 'antd';

const NavMenu = () => {
  return(
    <Menu mode="horizontal">
      <Menu.Item>Примеры</Menu.Item>
      <Menu.Item>Случайный букет</Menu.Item>
      <Menu.Item>Выбор пользователей</Menu.Item>
    </Menu>
  )
}

export default NavMenu;