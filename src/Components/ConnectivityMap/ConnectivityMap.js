import React, { useCallback } from 'react';
import ReactFlow, {  MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge }  from 'reactflow';
import 'reactflow/dist/style.css';


const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'node1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'node2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  
  const BasicFlow = (props) =>{
    const arrowEdge = {
      arrowHeadType: 'arrow',
    };
    const edgeTypes = {
        arrow: arrowEdge,
      };
      
    const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props.links);
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
        >
          <Controls />
        <MiniMap />

        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
};

export default BasicFlow;   