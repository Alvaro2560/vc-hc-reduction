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
import { Node } from '@/lib/node';

/**
 * @description Props for the GraphVisualization component.
 * @typedef GraphVisualizationProps
 * @property {any} graph - The graph to visualize.
 * @property {function} [onNodeClick] - The function to call when a node is clicked.
 * @property {string[]} [selectedNodes] - The list of selected nodes.
 */
interface GraphVisualizationProps {
  graph: any
  colorfulComponents?: boolean
  onNodeClick?: (nodeId: string) => void
  selectedNodes?: string[]
}

/**
 * @description Renders a graph visualization using ForceGraph2D.
 * @param {GraphVisualizationProps} props - The component's properties.
 * @returns The GraphVisualization component.
 */
export default function GraphVisualization({ graph, colorfulComponents, onNodeClick, selectedNodes = [] }: GraphVisualizationProps) {
  const graphRef = useRef<any>();

  useEffect(() => {
    if (graphRef.current) {
      if (graph.isVC()) {
        graphRef.current.d3Force('charge').strength(-10);
        graphRef.current.d3Force('link').distance(50);
      } else {
        graphRef.current.d3Force('charge').strength(-100);
        graphRef.current.d3Force('link').distance(50);
      }
    }
  }, []);

  const nodes = graph.getAllNodes().map((node: Node) => ({
    id: node.getId(),
    name: node.getId(),
    isOrigin: node.isOrigin()
  }));

  const links = graph.getAllNodes().flatMap((node: Node) =>
    node.getSuccessors().map((successor: Node) => ({
      source: node.getId(),
      target: successor.getId(),
    }))
  );

  const getNodeColor = (node: any) => {
    if (selectedNodes.includes(node.id)) {
      return '#ef4444';
    } else if (node.id.startsWith('a')) {
      return '#f59e0b';
    } else if (colorfulComponents) {
      if (nodes.find((n: any) => n.id === node.id)?.isOrigin) {
        return '#10b981';
      } else {
        return '#c9351e';
      }
    } else if (/^\d+$/.test(node.id)) {
      return '#4338ca';
    }
    return '#9ca3af';
  }

  return (
    <ForceGraph2D
      ref={graphRef}
      graphData={{ nodes, links }}
      nodeLabel="name"
      nodeColor={(node: any) => getNodeColor(node)}
      linkColor={() => 'black'}
      linkWidth={1}
      width={800}
      height={420}
      backgroundColor='#ffffff'
      onNodeClick={(node: any) => onNodeClick && onNodeClick(node.id)}
    />
  );
}
