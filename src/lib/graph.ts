/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 07, 2024
 * @description Contains the definition of a generic graph.
 * @exports Graph
 */

import { Node } from './node';

/**
 * @description Graph class to represent a generic graph.
 * @property {Map<string, Node>} NODES - The map of all nodes.
 * @abstract
 */
export abstract class Graph {
  private readonly NODES: Map<string, Node> = new Map<string, Node>();
  protected isVCGraph: boolean = false;

  /**
   * @description Adds a node to the graph.
   * @param {Node | string} node - The node to add.
   * @throws {Error} If the node is already in the graph.
   */
  public addNode(node: Node | string): void {
    let nodeId: string = '';
    if (node instanceof Node) {
      nodeId = node.getId();
    } else {
      nodeId = node;
      node = new Node(node);
    }
    try {
      this.getNode(nodeId);
      throw new Error(`Node with id ${nodeId} already exists.`);
    } catch {
      this.NODES.set(nodeId, node);
    }
  }

  /**
   * @description Returns the node with the given id.
   * @param {string} id - The node's identifier.
   * @returns {Node} The node with the given id.
   * @throws {Error} If the node with the given id is not found.
   */
  public getNode(id: string): Node {
    const node = this.NODES.get(id);
    if (!node) {
      throw new Error(`Node with id ${id} not found.`);
    }
    return node;
  }

  /**
   * @description Links two nodes.
   * @param {Node | string} node1 - The first node to link.
   * @param {Node | string} node2 - The second node to link.
   * @param {boolean} directed - Whether the link is directed or not.
   * @throws {Error} If any of the nodes is not found.
   */
  public linkNodes(node1: Node | string, node2: Node | string, directed: boolean = false): void {
    if (typeof node1 === 'string') {
      node1 = this.getNode(node1);
    }
    if (typeof node2 === 'string') {
      node2 = this.getNode(node2);
    }
    node1.addSuccessor(node2);
    if (!directed) {
      node2.addSuccessor(node1);
    }
  }

  /**
   * @description Returns a copy of the graph's nodes.
   * @returns {Node[]} The graph's nodes.
   */
  public getAllNodes(): Node[] {
    return [...this.NODES.values()];
  }
}