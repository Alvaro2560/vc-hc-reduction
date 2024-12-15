/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 07, 2024
 * @description Contains the definition of a VC graph. A VC graph is a graph with a vertex cover number which is the minimum
 *              number of vertices that can cover all edges.
 * @exports VCGraph
 */

import { Graph } from './graph';
import { HCGraph } from './hcGraph';
import { Node } from './node';

/**
 * @description Graph class to represent a vertex cover graph.
 * @extends Graph
 * @property {number} K - The vertex cover number.
 */
export class VCGraph extends Graph {
  /**
   * @description Creates an instance of a VC graph.
   * @param {number} K - The vertex cover number.
   */
  constructor(private readonly K: number, nodes?: Node[]) {
    super();
    if (nodes) {
      for (let node of nodes) {
        this.addNode(node);
      }
    }
    this.isVCGraph = true;
  }

  /**
   * @description Returns the vertex cover number.
   * @returns {number} The vertex cover number.
   */
  public getK(): number {
    return this.K;
  }

  /**
   * @description Links two nodes in a VC graph. This method overrides the one in the parent class to prevent linking directed edges.
   * @param {Node | string} node1 - The first node to link.
   * @param {Node | string} node2 - The second node to link.
   */
  public linkNodes(node1: Node | string, node2: Node | string): void {
    super.linkNodes(node1, node2, false);
  }

  /**
   * @description Reduces the graph to a HC graph.
   * @returns {HCGraph} The HC graph.
   */
  public reduceToHC(): HCGraph {
    let hcGraph = new HCGraph();
    // Adding selector nodes.
    for (let i = 0; i < this.getK(); ++i) {
      let selectorNode = new Node(`a${i + 1}`);
      hcGraph.addSelectorNode(selectorNode);
    }
    // Adding cover testing components.
    for (let node of this.getAllNodes()) {
      for (let successor of node.getSuccessors()) {
        // If the component already exists, add it to the list and continue to the next successor.
        if (hcGraph.componentExists(node.getId(), successor.getId())) {
          continue;
        }
        let coverTestingComponent: Node[] = [];
        // Creating the origin-destiny-number nodes.
        for (let i = 0; i < 6; ++i) {
          let componentNode = new Node(`${node.getId()}${successor.getId()}${i + 1}`);
          coverTestingComponent.push(componentNode);
        }
        // Creating the destiny-origin-number nodes.
        for (let i = 0; i < 6; ++i) {
          let componentNode = new Node(`${successor.getId()}${node.getId()}${i + 1}`);
          coverTestingComponent.push(componentNode);
        }
        hcGraph.addCoverTestingComponent(coverTestingComponent, node.getId(), successor.getId());
        // Linking the origin-destiny-number nodes together.
        for (let i = 0; i < 5; ++i) {
          hcGraph.linkNodes(coverTestingComponent[i], coverTestingComponent[i + 1], true);
        }
        // Linking the destiny-origin-number nodes together.
        for (let i = 6; i < 11; ++i) {
          hcGraph.linkNodes(coverTestingComponent[i], coverTestingComponent[i + 1], true);
        }
        // Creating the cross links.
        hcGraph.linkNodes(coverTestingComponent[0], coverTestingComponent[8], true);
        hcGraph.linkNodes(coverTestingComponent[2], coverTestingComponent[6], true);
        hcGraph.linkNodes(coverTestingComponent[3], coverTestingComponent[11], true);
        hcGraph.linkNodes(coverTestingComponent[5], coverTestingComponent[9], true);
      }
      // Linking the components together and to the selector nodes.
      const TOTAL_SUCCESSORS = node.getSuccessors().length;
      for (let i = 0; i < TOTAL_SUCCESSORS - 1; ++i) {
        let sixthNodeFirstComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[i].getId()}6`);
        let firstNodeSecondComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[i + 1].getId()}1`);
        hcGraph.linkNodes(sixthNodeFirstComp, firstNodeSecondComp, true);
        if (i === 0) {
          let firstNodeFirstComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[i].getId()}1`);
          for (let selectorNode of hcGraph.getSelectorNodes()) {
            hcGraph.linkNodes(firstNodeFirstComp, selectorNode, true);
          }
        }
        if (i === TOTAL_SUCCESSORS - 2) {
          let sixthNodeSecondComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[i + 1].getId()}6`);
          for (let selectorNode of hcGraph.getSelectorNodes()) {
            hcGraph.linkNodes(sixthNodeSecondComp, selectorNode, true);
          }
        }
      }
      // In case there is only one successor.
      if (TOTAL_SUCCESSORS === 1) {
        let firstNodeFirstComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[0].getId()}1`);
        let sixthNodeFirstComp = hcGraph.getNode(`${node.getId()}${node.getSuccessors()[0].getId()}6`);
        for (let selectorNode of hcGraph.getSelectorNodes()) {
          hcGraph.linkNodes(firstNodeFirstComp, selectorNode, true);
          hcGraph.linkNodes(sixthNodeFirstComp, selectorNode, true);
        }
      }
    }
    return hcGraph;
  }
}