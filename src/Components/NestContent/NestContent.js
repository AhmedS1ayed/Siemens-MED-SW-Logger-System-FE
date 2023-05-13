import React from "react";
import { getItemId } from "../../Utils/utilities";
import BasicFlow from "../ConnectivityMap/ConnectivityMap";
import { NestButton } from "./NestButton";
import { NestCard } from "./NestCard";

export const NestContent = (props) => {
  const nestedData = props.nestedData;
  const isConnectivityMap = props.isConnectivityMap;
  const ConnectivityNodes = props.ConnectivityNodes;
  const ConnectivityLinks = props.ConnectivityLinks;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        marginLeft: 15,
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}
      >
        {Object.keys(nestedData).map((item) => {
          if (typeof nestedData[item] === "object") {
            let itemN = getItemId(item, nestedData);
            return (
              <NestButton
                item={item}
                itemN={itemN}
                handleKeyClicked={props.handleKeyClicked}
              ></NestButton>
            );
          }
          return <></>;
        })}
      </div>
      <div>
        {Object.keys(nestedData).map((key, value) => {
          if (typeof nestedData[key] !== "object" && !isConnectivityMap) {
            return (
              <div style={{ display: "inline-flex", paddingLeft: 10 }}>
                <NestCard
                  keyV={key}
                  valueV={value}
                  nestedData={nestedData}
                ></NestCard>
              </div>
            );
          } else if (typeof nestedData[key] !== "object" && isConnectivityMap) {
            if (
              key !== nestedData[key] &&
              ConnectivityNodes.filter((item) => item.id === key).length === 0
            ) {
              ConnectivityNodes.push({
                id: key,
                position: {
                  x: 20 + 60 * ConnectivityNodes.length,
                  y: 50 + 100 * ConnectivityNodes.length,
                },
                data: { label: key },
              });
              ConnectivityLinks.push({
                id: "e_" + key,
                source: key,
                target: nestedData[key],
                type: "start-end",
                animated: true,
              });
            }
          }
          return <></>;
        })}
      </div>

      {isConnectivityMap ? (
        <BasicFlow nodes={ConnectivityNodes} links={ConnectivityLinks} />
      ) : (
        <></>
      )}
    </div>
  );
};
