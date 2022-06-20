import React from "react";
import { useAppContext } from "../contexts/appContext";
import { Typography, Button, Popconfirm } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { format } from "../constants";
import moment from "moment";

const { Text } = Typography;

// component for single history's item
function HistoryItem(props) {
  const { index, content, saveDate, onSearch, onDelete } = props;
  return (
    <div style={styles.listItem}>
      <Text>
        <Text strong>{index + 1}.</Text> {content}
      </Text>

      <div style={styles.btnContainer}>
        <Text>{moment(saveDate, format).format(format)}</Text>

        <Button
          style={styles.actionButton}
          onClick={onSearch}
          icon={<SearchOutlined />}
        />

        <Popconfirm
          title={"Are you sure to remove this item?"}
          onConfirm={onDelete}
        >
          <Button style={styles.actionButton} icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    </div>
  );
}

// History Section
function SearchHistory(props) {
  const { history, fetchWeather, deleteHistory } = useAppContext();

  return (
    <div style={styles.container}>
      <h2>Search History</h2>

      <div style={styles.divider} />

      {history.length === 0 ? (
        <div style={styles.emptyList}>
          <Text>No history found.</Text>
        </div>
      ) : (
        <div style={styles.scrollContainer}>
          {history.map((item, index) => {
            return (
              <HistoryItem
                key={index}
                index={index}
                content={`${item.city} - ${item.country}`}
                saveDate={item.dateTime}
                onSearch={() => fetchWeather(item.city, item.country)}
                onDelete={() => deleteHistory(index)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchHistory;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: "5px 0px 13px 0px",
    borderBottom: "1px solid lightgray",
    justifyContent: "space-between",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    height: "50vh",
  },
  divider: {
    height: 2,
    backgroundColor: "black",
    width: "100%",
    marginBottom: 15,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "5vw",
  },
  actionButton: {
    marginLeft: 13,
    borderRadius: 20,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
  },
  emptyList: {
    display: "flex",
    justifyContent: "center",
  },
};
