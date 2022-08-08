import React from "react";

import spinner from "../../assets/spinner.png";
import "./styles.scss";

export default function LoadingSpinner() {
  return (
    <div className="spinner--container">
      <img src={spinner} alt="loading.." />
    </div>
  );
}
