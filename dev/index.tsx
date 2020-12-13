import * as React from "react";

import { render } from "react-dom";
import App from "./App";

import { InjectableProvider } from "../src";
import { TestService } from "./services/TestService";
import { TitleService } from "./services/TitleService";

render(
    <InjectableProvider inject={[TestService, TitleService]}>
        <App />
    </InjectableProvider>
    , document.getElementById("root"))