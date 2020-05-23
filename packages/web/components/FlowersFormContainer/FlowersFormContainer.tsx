import * as React from "react";
import { connect } from "react-redux";

import "./FlowersFormContainer.css";
import DropDownControl from "../DropDownControl/DropDownControl";
import InputControl from "../InputControl/InputControl";
import GenerateButton from "../GenerateButton/GenerateButton";

import { FormState } from "../../reducers/formReducer";

type Props = {};
type State = { FLOWERS_NAMES: Array<string> };

type StoreProps = FormState;
type StoreDispatch = {
  onFormSubmit?: (form: FormState) => void;
};
// type State = {numberOfFlowers: number, FLOWERS_NAMES: Array<string>}

class FlowersFormContainer extends React.Component<
  Props & StoreProps & StoreDispatch,
  State
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      //   numberOfFlowers: 0,
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
        // gatherBouquet(this.state.numberOfFlowers, data.flower.source);
      });
    });
  };

  handleReset = (event) => {
    const { onFormSubmit } = this.props;
    event.preventDefault();
    onFormSubmit({ flowNum: 0, isSubmited: false });
    this.setState({
      // numberOfFlowers: 0,
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
              2. Choose <b>main type</b> of flowers
              <br />
              you want to see in bouquete.
            </p>
            <DropDownControl
              handleChange={this.handleFlowersType}
              FLOWERS_LIST={this.state.FLOWERS_NAMES}
            />
          </div>
          <div className="generate">
            <p className="suggest-text">
              3. Press <b>Generate</b> and wait for
              <br />
              magic.
            </p>
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
