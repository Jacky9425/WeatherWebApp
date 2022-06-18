import React from "react";
import { Typography, Input } from "antd";
import { useAppContext } from "../contexts/appContext";

const { Text } = Typography;

function CustomInput(props) {
  const { label } = props;
  const { mobileView } = useAppContext();

  return (
    <div
      style={{
        ...styles.inputContainer,
        ...(mobileView && { marginBottom: 10 }),
      }}
    >
      <Text strong style={styles.label}>
        {label}:
      </Text>

      <Input style={styles.input(mobileView)} {...props} />
    </div>
  );
}

export default CustomInput;

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  label: {
    marginRight: 6,
    fontSize: 16,
  },
  input: (mobileView) => ({
    width: mobileView ? "50vw" : "9vw",
  }),
};
