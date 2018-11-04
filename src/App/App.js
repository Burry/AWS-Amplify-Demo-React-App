import React, { Component } from "react";
import { Storage } from "aws-amplify";
import Utf8ArrayToStr from "../util/binaryToString.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      testTxt: "[Loading...]",
      getError: false,
      putError: false
    };
  }

  // Update test text on mount
  componentDidMount = () => this.updateTestTxt();

  // Get test.txt from S3, download the binary data,
  // convert the UTF8 binary data to an ASCII string,
  // and set the `testTxt` state
  updateTestTxt = () =>
    Storage.get("test.txt", { download: true })
      .then(res => {
        const testTxt = Utf8ArrayToStr(res.Body);
        console.log("S3 GET SUCCEEDED: ", res);
        this.setState({
          testTxt,
          getError: false
        });
      })
      .catch(err => {
        console.error("S3 GET FAILED: ", err);
        const testTxt =
          err.message === "The specified key does not exist."
            ? "File not found. Upload something!"
            : err.message;
        this.setState({
          testTxt,
          getError: true
        });
      });

  // Update text value on change
  handleChange = ({ target: { value: text } }) => this.setState({ text });

  // Handle form submission - PUT text.txt to S3 and GET test text
  handleSubmit = e => {
    const { text } = this.state;
    e.preventDefault();
    return Storage.put("test.txt", text, {
      contentType: "text/plain"
    })
      .then(res => {
        console.info("S3 UPLOAD SUCCESSFUL: ", res);
        this.setState({
          putError: false
        });
        return this.updateTestTxt();
      })
      .catch(err => {
        console.error("S3 UPLOAD FAILED: ", err);
        return this.setState({
          putError: true
        });
      });
  };

  render() {
    const { text, testTxt, getError, putError } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={text}
          autoFocus
          placeholder="Text to upload"
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className={putError ? "btnError" : "btn"}
        >
          {putError ? "Error!" : "Upload Text"}
        </button>
        <br />
        <code>
          <b>test.txt: </b>
          <span className={getError && "textError"}>{testTxt}</span>
        </code>
      </form>
    );
  }
}

export default App;
