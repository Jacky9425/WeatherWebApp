import React from "react";
import { Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

function InfoContainer(props) {
  const { condition_loading } = props;

  return condition_loading ? (
    <div style={styles.loadingContainer}>
      <LoadingOutlined />
      <Text style={{ marginLeft: 10 }}>Loading...</Text>
    </div>
  ) : null;
}

export default InfoContainer;

const styles = {
  loadingContainer: {
    position: "absolute",
    display: "flex",
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
};
