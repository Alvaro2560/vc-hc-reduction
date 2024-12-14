/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 08, 2024
 * @description Contains the GraphVisualization component.
 * @exports GraphVisualization
 */

'use client';

import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-3d';

/**
 * @description Props for the GraphVisualization component.
 * @typedef GraphVisualizationProps
 * @property {any} graph - The graph to visualize.
 * @property {function} [onNodeClick] - The function to call when a node is clicked.
 * @property {string[]} [selectedNodes] - The list of selected nodes.
 */
interface GraphVisualizationProps {
  graph: any
  onNodeClick?: (nodeId: string) => void
  selectedNodes?: string[]
}

/**
 * @description Renders a graph visualization using ForceGraph2D.
 * @param {GraphVisualizationProps} props - The component's properties.
 * @returns The GraphVisualization component.
 */
export default function GraphVisualization({ graph, onNodeClick, selectedNodes = [] }: GraphVisualizationProps) {
  const graphRef = useRef<any>();

  useEffect(() => {
    if (graphRef.current && graph.constructor.name === 'VCGraph') {
      graphRef.current.d3Force('charge').strength(-100);
      graphRef.current.d3Force('link').distance(50);
    } else {
      graphRef.current.d3Force('charge').strength(-1);
      graphRef.current.d3Force('link').distance(50);
    }
  }, []);

  const nodes = graph.getAllNodes().map((node: any) => ({
    id: node.getId(),
    name: node.getId(),
  }));

  const links = graph.getAllNodes().flatMap((node: any) =>
    node.getSuccessors().map((successor: any) => ({
      source: node.getId(),
      target: successor.getId(),
    }))
  );

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={{ nodes, links }}
      nodeLabel="name"
      nodeColor={(node: any) => {
        if (selectedNodes.includes(node.id)) {
          return '#ef4444';
        } else if (node.id.startsWith('a')) {
          return '#10b981';
        } else if (/^\d+$/.test(node.id)) {
          return '#4338ca';
        }
        return '#9ca3af';
      }}
      linkColor={() => 'black'}
      linkWidth={1}
      width={800}
      height={420}
      backgroundColor='#ffffff'
      onNodeClick={(node: any) => onNodeClick && onNodeClick(node.id)}
    />
  );
}
