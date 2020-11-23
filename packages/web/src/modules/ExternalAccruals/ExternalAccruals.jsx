import React from 'react';
import { Descriptions, Empty, Row, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import Icon from 'common/icon'

import styles from './styles.styl';

const getIconByTitle = (title) => {
    if (title.toLowerCase().includes(title.commision)) {
      return (
        <Row justify="center">
          <Icon />
        </Row>
      );
    }
  
    if (title.toLowerCase().includes(title.tariff)) {
      return (
        <Row justify="center">
          <Icon />
        </Row>
      );
    }
  
    return <Empty />;
  };
  
  const ExternalExpends = (props) => {
    const { id, title, description, onClick } = props;
    const history = useHistory();
  
    const handleBeginClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      history.push(`/main/createApplication/${id}`);
    };
  
    return (
      <ExternalExpends
        title={title}
        bordered
        hoverable
        onClick={onClick}
        className={styles.card}
      >
        {getIconByTitle(title)}
        <Descriptions layout="vertical">
          <Descriptions.Item>{description}</Descriptions.Item>
        </Descriptions>
        <Button type="primary" block size="large" onClick={handleBeginClick}>
          {title}
        </Button>
      </ExternalExpends>
    );
  };
  
  export default ExternalExpends;