import * as React from "react";
import { connect } from "react-redux";

import "./FlowersFormContainer.css";
import DropDownControl from "../DropDownControl/DropDownControl";
import InputControl from "../InputControl/InputControl";
import GenerateButton from "../GenerateButton/GenerateButton";

import { FormState } from "../../reducers/formReducer";

import { Card, Button, Input, Form, Space } from "antd";

type Props = {};
type State = { FLOWERS_NAMES: Array<string> };

type StoreProps = FormState;
type StoreDispatch = {
  onFormSubmit?: (form: FormState) => void;
};

class FlowersFormContainer extends React.Component<
  Props & StoreProps & StoreDispatch,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      FLOWERS_NAMES: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/flowers/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((FLOWERS_LIST) => {
        const names = [];

        FLOWERS_LIST &&
          FLOWERS_LIST.map((flower) => {
            names.push(flower.name);
          });
        this.setState({ FLOWERS_NAMES: names });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit } = this.props;
    const { FLOWERS_NAMES } = this.state;
    fetch("http://localhost:8080/api/v1/flowers/name", {
      method: "POST",
      body: JSON.stringify(FLOWERS_NAMES),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        onFormSubmit({ source: data.flower.source, isSubmited: true });
      });
    });
  };

  handleReset = (event) => {
    const { onFormSubmit } = this.props;
    event.preventDefault();
    onFormSubmit({ flowNum: 0, isSubmited: false });
    this.setState({
      FLOWERS_NAMES: [],
    });
  };

  handleFlowersNumber = (event) => {
    const { onFormSubmit } = this.props;
    onFormSubmit({ flowNum: event.target.value });
  };

  handleFlowersType = (event) => {
    this.setState({ FLOWERS_NAMES: [event.target.value] });
  };

  render() {
    return (
      <Form className="flowers-form" onFinish={this.handleSubmit}>
        <Space align="center" direction="horizontal">
          <Card
            className="flowers-number"
            title="1. Enter number of flowers
              you want to see in bouquet."
          >
            <Input onChange={this.handleFlowersNumber} />
          </Card>
          <Card
            className="flowers-type"
            title="2. Choose main type of flowers you want to see in bouquete."
          >
            <DropDownControl
              handleChange={this.handleFlowersType}
              FLOWERS_LIST={this.state.FLOWERS_NAMES}
            />
          </Card>
          <Card
            className="generate"
            title=" 3. Press Generate and wait for
          magic."
          >
            <GenerateButton />
          </Card>
        </Space>
      </Form>
    );
  }
}

const mapStateToProps = (state): StoreProps => ({
  flowNum: state.flowNum,
  source: state.source,
  isSubmited: state.isSubmited,
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: (form) => dispatch({ type: "FORM/SUBMITED", value: form }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowersFormContainer);
