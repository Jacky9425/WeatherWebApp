import React from "react";
import { Typography, Input } from "antd";
import { useAppContext } from "../contexts/appContext";

const { Text } = Typography;

function CustomInput(props) {
  const { label } = props;
  const { mobileView } = useAppContext();

  return (
    <div style={styles.inputContainer(mobileView)}>
      <Text strong style={styles.label}>
        {label}:
      </Text>

      <Input style={styles.input(mobileView)} {...props} />
    </div>
  );
}

export default CustomInput;

const styles = {
  inputContainer: (mobileView) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: mobileView ? 10 : 0,
  }),
  label: {
    marginRight: 6,
    fontSize: 16,
  },
  input: (mobileView) => ({
    width: mobileView ? "50vw" : "20vw",
  }),
};
