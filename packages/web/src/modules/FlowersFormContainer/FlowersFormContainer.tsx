import * as React from "react";
import { connect } from "react-redux";

import "./FlowersFormContainer.css";
import DropDownControl from "../DropDownControl/DropDownControl";
import InputControl from "../InputControl/InputControl";
import GenerateButton from "../GenerateButton/GenerateButton";

import { FormState } from "../../store/reducers/formReducer";

import { Input, Form, Button, Row, Space } from "antd";

type State = { FLOWERS_NAMES: Array<string> };

type StoreProps = FormState;
type StoreDispatch = {
  onFormSubmit?: (form: FormState) => void;
};

const FlowersFormContainer = (props) => {
  return (
      <Form layout="horizontal">
        <Form.Item
          label={"1. Enter number of flowers you want to see in bouquete."}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"2. Choose main type of flowers you want to see in bouquete."}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"3. Press Generate and wait for magic."}>
          <Input />
        </Form.Item>
        <Form.Item label={"Generate"}>
          <Button />
        </Form.Item>
      </Form>
  );
};

class FlowersFormCiner extends React.Component<
  StoreProps & StoreDispatch,
  State
> {
  constructor(props) {
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
      <form className="flowers-form" onSubmit={this.handleSubmit}>
        <div className="inputs-wrapper">
          <div className="flowers-number">
            <p className="suggest-text">
              1. Enter number of flowers <br />
              you want to see in bouquete.
            </p>

            <InputControl handleChange={this.handleFlowersNumber} />
          </div>
          <div className="flowers-type">
            <p className="suggest-text">
              2. Choose main type of flowers you want to see in bouquete.
            </p>
            <DropDownControl
              handleChange={this.handleFlowersType}
              FLOWERS_LIST={this.state.FLOWERS_NAMES}
            />
          </div>
          <div className="generate">
            <p className="suggest-text"></p>
            <GenerateButton />
          </div>
        </div>
      </form>
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
