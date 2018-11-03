import React, { Component } from "react";
import { Storage } from "aws-amplify";
import Utf8ArrayToStr from "../util/binaryToString.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      testTxt: "[Loading...]"
    };
  }

  // Update test text on mount
  componentDidMount = () => this.updateTestTxt();

  // Get test.txt from S3, download the binary data,
  // convert the UTF8 binary data to an ASCII string,
  // and set the `testTxt` state
  updateTestTxt = () =>
    Storage.get("test.txt", { download: true })
      .then(({ Body }) => {
        const testTxt = Utf8ArrayToStr(Body);
        console.info("S3 GET SUCCEEDED: ", testTxt);
        return this.setState({ testTxt });
      })
      .catch(err => console.error("S3 GET FAILED: ", err));

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
        console.info("S3 UPLOAD SUCCEEDED: ", res);
        return this.updateTestTxt();
      })
      .catch(err => console.error("S3 UPLOAD FAILED: ", err));
  };

  render() {
    const { text, testTxt } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={text}
            name="text"
            placeholder="Text to upload"
            onChange={this.handleChange}
          />
          <button type="submit" name="submit">
            Upload Text
          </button>
        </form>
        <br />
        <code>
          <b>test.txt: </b> {testTxt}
        </code>
      </div>
    );
  }
}

export default App;
