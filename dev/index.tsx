import * as React from "react";

import { render } from "react-dom";
import App from "./App";

import { log } from "../src";

log();

render(<App />, document.getElementById("root"))