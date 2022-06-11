import React, { Component } from "react";
import ReactDOM from "react-dom";
import image from "../../images/image.png";

export class FileUploadButton extends Component {
  handleFileUpload = event => {
    console.log(event.target.files[0].name);
  };

  render() {
    return (
      <React.Fragment>
        <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        <button className="button-upload" onClick={() => this.refs.fileInput.click()}>
          <img  src={image} title="Profilo" alt="company logo" />
          </button>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<FileUploadButton />, rootElement);