import React from "react";
import { cleanData } from "../../Utils/utilities";
import { Card } from "@mui/material";
import BasicFlow from "../ConnectivityMap/ConnectivityMap";
import { NestButton } from "./NestButton";
import { NestCard } from "./NestCard";

export const DialogContent = (props) => {
  const nestedData = props.nestedData;
  const expandedIndex = props.expandedIndex;
  const isConnectivityMap = props.isConnectivityMap;
  const ConnectivityNodes = props.ConnectivityNodes;
  const ConnectivityLinks = props.ConnectivityLinks;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Object.keys(nestedData).map((item) => {
        if (typeof nestedData[item] === "object" && !Array.isArray(nestedData))
          return (
            <NestButton
              item={item}
              itemN={item}
              handleKeyClicked={props.handleKeyClicked}
            ></NestButton>
          );
        else if (
          typeof nestedData[item] === "object" &&
          Array.isArray(nestedData)
        ) {
          let itemN = "Not Found";
          if (nestedData[item]["id"] != undefined)
            itemN = nestedData[item]["id"];
          if (nestedData[item]["master_id"] != undefined)
            itemN = nestedData[item]["master_id"];
          if (nestedData[item]["slave_id"] != undefined)
            itemN = nestedData[item]["slave_id"];
          if (nestedData[item]["Port Offset"] != undefined)
            itemN = nestedData[item]["Port Offset"];
          return (
            <NestButton
              item={item}
              itemN={itemN}
              handleKeyClicked={props.handleKeyClicked}
            ></NestButton>
          );
        }
      })}
      <div className="display:flex;">
        {Object.keys(nestedData).map((key, value) => {
          if (typeof nestedData[key] != "object" && !isConnectivityMap) {
            return (
              <div style={{display:"inline-flex" , paddingLeft:"5px"}}>
              <NestCard
                keyV={key}
                valueV={value}
                expandedIndex={expandedIndex}
                nestedData={nestedData}
              ></NestCard>
              </div>
            );
          } else if (typeof nestedData[key] != "object" && isConnectivityMap) {
            if (
              key != nestedData[key] &&
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
