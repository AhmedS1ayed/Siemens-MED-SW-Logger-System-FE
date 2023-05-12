import React, { useCallback } from 'react';
import ReactFlow, {   
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  MiniMap, }  from 'reactflow';
import 'reactflow/dist/style.css';
import CustomEdgeStartEnd from './CustomEdgeStartEnd';

  
  const BasicFlow = (props) =>{

    const edgeTypes = {
      'start-end': CustomEdgeStartEnd,
    };
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.links);
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
    return (
      <div style={{ width: '100%', height: '48vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
          noFooter= {true}
          // fitView= {true}  
        >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
export default BasicFlow;
