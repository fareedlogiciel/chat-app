/* eslint-disable react/prop-types */
import { Button as DevExButton } from "devextreme-react";
import styles from "./styles.module.css";

const Button = ({
  children = "",
  text = "",
  stylingMode = "contained",
  className = "",
  style = {},
}) => {
  return (
    <DevExButton
      style={style}
      type="success"
      text={children || text || ""}
      stylingMode={stylingMode}
      className={className}
      onClick={() => {}}
    />
  );
};

export default Button;
