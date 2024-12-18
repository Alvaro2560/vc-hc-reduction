/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 08, 2024
 * @description Contains the GraphReduction component.
 * @exports GraphReduction
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { VCGraph } from '../lib/vcGraph';
import { ReductionHandler } from '../lib/reductionHandler';
import GraphVisualization from './GraphVisualization';

/**
 * @description Renders the elements to perform the Vertex Cover to Hamiltonian Circuit reduction.
 * @returns The GraphReduction component.
 */
export default function GraphReduction() {
  const [vcGraph, setVCGraph] = useState<VCGraph>(new VCGraph(0));
  const [hcGraph, setHCGraph] = useState<any | null>(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [k, setK] = useState(0);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [colorfulComponents, setColorfulComponents] = useState(false);

  const addNode = () => {
    const newNodeId = `${nodeCount + 1}`;
    vcGraph.addNode(newNodeId);
    setNodeCount(nodeCount + 1);
    setVCGraph(new VCGraph(k, vcGraph.getAllNodes()));
  }

  const selectNode = (nodeId: string) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else if (selectedNodes.length < 2) {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  }

  const createEdge = () => {
    if (selectedNodes.length === 2) {
      vcGraph.linkNodes(selectedNodes[0], selectedNodes[1]);
      setSelectedNodes([]);
      setVCGraph(new VCGraph(k, vcGraph.getAllNodes()));
    }
  }

  const performReduction = () => {
    if (k === 0) {
      alert('Please set the value of K before performing the reduction.');
      return;
    } else if (k > vcGraph.getAllNodes().length) {
      alert('The value of K cannot be greater than the number of nodes in the graph.');
      return;
    }
    const handler = new ReductionHandler(vcGraph);
    const reducedHCGraph = handler.performReduction();
    setHCGraph(reducedHCGraph);
  }

  const updateK = (newK: number) => {
    setK(newK);
    setVCGraph(new VCGraph(newK, vcGraph.getAllNodes()));
  }

  const toggleColorfulComponents = () => {
    setColorfulComponents(!colorfulComponents);
  }

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 px-4">
        <div className="flex items-center gap-9">
          <div className="flex flex-col space-y-3">
            <Label htmlFor="k">K (Vertex Cover Size)</Label>
            <Input
              id="k"
              type="number"
              value={k}
              onChange={(e) => updateK(parseInt(e.target.value))}
              className="w-36"
              min={0}
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button onClick={addNode}>Add Node</Button>
            <Button onClick={createEdge} disabled={selectedNodes.length !== 2}>Create Edge</Button>
            <Button onClick={performReduction}>Perform Reduction</Button>
            <Switch
              id="colorful-mode"
              checked={colorfulComponents}
              onCheckedChange={toggleColorfulComponents}
            />
            <Label htmlFor="colorful-mode">Colorful Components</Label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-xl font-semibold mb-2">Vertex Cover Graph</h2>
          <GraphVisualization 
            graph={vcGraph} 
            onNodeClick={selectNode}
            selectedNodes={selectedNodes}
          />
        </div>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-xl font-semibold mb-2">Hamiltonian Circuit Graph</h2>
          {hcGraph && <GraphVisualization graph={{hcGraph, colorfulComponents}} />}
        </div>
      </div>
    </div>
  );
}