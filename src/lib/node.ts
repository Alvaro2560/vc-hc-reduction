/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 07, 2024
 * @description Contains the definition of a graph node.
 * @exports Node
 */

/**
 * @description Graph class to represent a graph node.
 * @property {string} ID - The node's identifier.
 * @property {Node[]} SUCCESSORS - The node's successors.
 */
export class Node {
  /**
   * @description Creates an instance of a node.
   * @param {string} ID - The node's identifier.
   */
  constructor(private readonly ID: string, private readonly SUCCESSORS: Node[] = []) {}

  /**
   * @description Adds a successor to the node.
   * @param {Node} node - The node to add as a successor.
   * @throws {Error} If the node is already a successor.
   */
  public addSuccessor(node: Node): void {
    if (this.SUCCESSORS.includes(node)) {
      throw new Error(`Node with id ${node.getId()} already exists as a successor of node with id ${this.ID}.`);
    }
    this.SUCCESSORS.push(node);
  }

  /**
   * @description Returns the node's identifier.
   * @returns {string} The node's identifier.
   */
  public getId(): string {
    return this.ID;
  }

  /**
   * @description Returns the node's successors.
   * @returns {readonly Node[]} The node's successors.
   */
  public getSuccessors(): readonly Node[] {
    return this.SUCCESSORS;
  }
}