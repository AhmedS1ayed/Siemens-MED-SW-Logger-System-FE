import React from 'react';
import { getBezierPath, EdgeLabelRenderer } from 'reactflow';

function EdgeLabel({ transform, label }) {
  return (
    <div
      style={{
        position: 'absolute',
        background: 'transparent',
        padding: 10,
        color: '#ff5050',
        fontSize: 12,
        fontWeight: 700,
        transform,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path id={id} className="react-flow__edge-path" d={edgePath}  style={{ strokeWidth: 2 , stroke:"black" }}/>
      <EdgeLabelRenderer>
        {(
          <EdgeLabel
            transform={'translate(-50%, 0%) translate(' + sourceX + 'px,' + sourceY + 'px)'}
            label='Tx'
          />
        )}
        {(
          <EdgeLabel
            transform={'translate(-50%, -100%) translate(' + targetX + 'px,' + targetY + 'px)'}
            label="Rx"
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;