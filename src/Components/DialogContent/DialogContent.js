import React from 'react';
import { cleanData } from '../../Utils/utilities';
import { Card } from '@mui/material';
import BasicFlow from '../ConnectivityMap/ConnectivityMap';

  
  export const DialogContent = (props) =>{
    // const [nestedData,setNestedData] =useState(props.nestedData);
    // const [expandedIndex,setExpanded] = useState(props.expandedIndex);
    // const [isConnectivityMap,setIsConnectivityMap] = useState(props.isConnectivityMap);
    // const [ConnectivityNodes,setConnectivityNode] = useState(props.ConnectivityNodes);
    // const [ConnectivityLinks,setConnectivityLinks] = useState(props.ConnectivityLinks);

    const nestedData = props.nestedData;
    const expandedIndex = props.expandedIndex;
    const isConnectivityMap = props.isConnectivityMap;
    const ConnectivityNodes = props.ConnectivityNodes;
    const ConnectivityLinks = props.ConnectivityLinks;

    return(
        <div style={{ display:"flex" , alignItems:"center" ,justifyContent: "center"}} > 
                
                  {/* {Object.keys(nestedData).map((item) =>{
                    if(typeof nestedData[item] === "object" && !Array.isArray(nestedData))
                    return(
                    <div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{props.handleKeyClicked(item)}}   >{cleanData(item)}</button>
                    </div>)
                    else if( typeof nestedData[item] === "object" && Array.isArray(nestedData))
                    {
                      return (<div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{props.handleKeyClicked(item)}}   >{nestedData[item]['id']}</button>
                      </div>);
                    }              
                  })} */}
                  {Object.keys(nestedData).map((item) =>{
                if(typeof nestedData[item] === "object" && !Array.isArray(nestedData))
                return(
                <div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{props.handleKeyClicked(item)}}   >{cleanData(item)}</button>
                </div>)
                else if( typeof nestedData[item] === "object" && Array.isArray(nestedData))
                {
                  let itemN='Not Found';
                  if(nestedData[item]["id"] != undefined) itemN = nestedData[item]["id"];
                  if(nestedData[item]["master_id"] != undefined) itemN = nestedData[item]["master_id"];
                  if(nestedData[item]["slave_id"] != undefined) itemN = nestedData[item]["slave_id"];
                  if(nestedData[item]["Port Offset"] != undefined) itemN = nestedData[item]["Port Offset"];
                  return (<div className="display: inline"><button className="results_btn" style={{margin:"10px"}} key={item} label={item} onClick = {() =>{props.handleKeyClicked(item)}}   >{itemN}</button>
                  </div>);
                }         
              })}
                  <div  className="display:flex;"  >
                    {Object.keys(nestedData).map((key,value) =>{
                      if(typeof nestedData[key] != "object" && !isConnectivityMap){
                      return(
                        // TODO: the card should expand and show the value of the key
                      <Card className="card" style={{border_raduis:"10px"}}>
                         <div className="header">{cleanData(key)}</div>
                         <div className={`header_detail ${expandedIndex === value ? "expanded" : ""}`}>
                              <div className="header_detail2">{nestedData[key]}</div>
                            </div>
                      </Card> 
                      )}
                      else if (typeof nestedData[key] != "object" && isConnectivityMap)
                      {
                      
                        // ? show all nodes or just the ones that are connected ? 
                        // and check if it is not already in the connectivity nodes
                        if(key != nestedData[key] && ConnectivityNodes.filter((item) => item.id === key).length === 0 ){
                          console.log(">>>>>> key != nestedData[key] ",key,nestedData[key]);
                        ConnectivityNodes.push({id: key , position: { x: 20+60 * ConnectivityNodes.length  , y:50+ 100 * ConnectivityNodes.length   },data: {label: key } });
                        ConnectivityLinks.push({id:'e_'+key,source: key, target: nestedData[key],  type: 'start-end' ,animated: true, });
                        }
                  
                      }
                      })}
                    </div>
                
                  {isConnectivityMap ? <BasicFlow nodes={ConnectivityNodes} links={ConnectivityLinks} /> : <></>}
                </div>  
    )
  }