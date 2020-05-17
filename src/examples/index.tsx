import * as React from "react";
import { render } from "react-dom";
import Basic from "./basic/Basic";

function Example() {
  // @todo change example from select field
  return <Basic />;
}

render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
  document.querySelector("#root")
);
