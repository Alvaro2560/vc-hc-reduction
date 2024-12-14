/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 07, 2024
 * @description Contains the definition of a HC graph built from a VC graph. This graph contains a hamiltonian cycle only
 *              if a vertex cover of size K exists in the VC graph exists. Conversely, if no K vertex cover exists, then
 *              the HC graph will not contain a hamiltonian cycle.
 * @exports HCGraph
 */

import { Graph } from './graph';
import { Node } from './node';

// Type to represent a cover testing component.
export type CoverTestingComponent = Node[];

/**
 * @description Graph class to represent a hamiltonian cycle graph.
 * @extends Graph
 * @property {Node[]} SELECTOR_NODES - The list of selector nodes.
 * @property {Node[][]} COVER_TESTING_COMPONENTS - The list of cover testing components.
 */
export class HCGraph extends Graph {
  private readonly SELECTOR_NODES: Node[] = [];
  private readonly COVER_TESTING_COMPONENTS: Map<string, CoverTestingComponent> = new Map<string, CoverTestingComponent>();

  /**
   * @description Creates an instance of a HC graph.
   */
  constructor() {
    super();
  }

  /**
   * @description Adds a selector node to the graph.
   * @param {Node} node - The selector node to add.
   */
  public addSelectorNode(node: Node): void {
    super.addNode(node);
    this.SELECTOR_NODES.push(node);
  }

  /**
   * @description Adds a cover testing component to the graph.
   * @param {Node[]} component - The cover testing component to add.
   * @param {string} node1Id - The id of the first node in the component.
   * @param {string} node2Id - The id of the second node in the component.
   * @throws {Error} If the component id already exists.
   */
  public addCoverTestingComponent(component: CoverTestingComponent, node1Id: string, node2Id: string): void {
    for (let node of component) {
      super.addNode(node);
    }
    if (this.componentExists(node1Id, node2Id)) {
      throw new Error(`Cover testing component involving nodes ${node1Id} and ${node2Id} already exists.`);
    }
    this.COVER_TESTING_COMPONENTS.set(`${node1Id}${node2Id}`, component);
  }

  /**
   * @description Returns the list of selector nodes.
   * @returns {readonly Node[]} The list of selector nodes.
   */
  public getSelectorNodes(): readonly Node[] {
    return this.SELECTOR_NODES;
  }

  /**
   * @description Returns a cover testing component given the ids of the nodes representing it (in any order).
   * @param {string} node1Id - The id of the first node in the component.
   * @param {string} node2Id - The id of the second node in the component.
   * @returns {CoverTestingComponent} The cover testing component.
   * @throws {Error} If the cover testing component is not found.
   */
  public getCoverTestingComponent(node1Id: string, node2Id: string): CoverTestingComponent {
    if (!this.componentExists(node1Id, node2Id)) {
      throw new Error(`Cover testing component involving nodes ${node1Id} and ${node2Id} not found.`);
    }
    const COMPONENT = this.COVER_TESTING_COMPONENTS.get(`${node1Id}${node2Id}`) || this.COVER_TESTING_COMPONENTS.get(`${node2Id}${node1Id}`)!;
    return COMPONENT;
  }

  /**
   * @description Checks if a cover testing component exists given the ids of the nodes representing it (in any order).
   * @param {string} node1Id - The id of the first node in the component.
   * @param {string} node2Id - The id of the second node in the component.
   * @returns {boolean} Whether the cover testing component exists or not.
   */
  public componentExists(node1Id: string, node2Id: string): boolean {
    return this.COVER_TESTING_COMPONENTS.has(`${node1Id}${node2Id}`) || this.COVER_TESTING_COMPONENTS.has(`${node2Id}${node1Id}`);
  }

  /**
   * @description Returns the list of all cover testing components.
   * @returns {readonly Node[][]} The list of cover testing components.
   */
  public getAllCoverTestingComponents(): readonly CoverTestingComponent[] {
    return [...this.COVER_TESTING_COMPONENTS.values()];
  }
}