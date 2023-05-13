import { useState } from 'react';

export const useNestedData = () =>{
    const [openDialogs, setOpenDialogs] = useState(false);
    const [idx, setClickedIdx] = useState(0);
    const [nestedData, setNestedData] = useState("None");
    const [isConnectivityMap, setConnectivityMap] = useState(false);
    const [stack, setStack] = useState(["none"]);
    const [path, setPath] = useState(["Configurations"]);
    const [expanded, setExpanded] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);

  return {
    openDialogs,
    setOpenDialogs,
    idx,
    setClickedIdx,
    nestedData,
    setNestedData,
    isConnectivityMap,
    setConnectivityMap,
    stack,
    setStack,
    path,
    setPath,
    expanded, 
    setExpanded,
    expandedIndex,
    setExpandedIndex
  };
}