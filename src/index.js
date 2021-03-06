import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";
import {
  faSearch,
  faBell,
  faCompass,
  faUserCircle
} from "@fortawesome/fontawesome-free-solid";
import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";

/**
 * Build a library of fontawesome icons
 *
 * This keeps bundle size low as we only bundle icons
 * defined in this library.
 *
 * Icons in this library can be used by any fontawesome
 * component
 */
fontawesome.library.add(brands, faSearch, faBell, faCompass, faUserCircle);

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById("root"));
