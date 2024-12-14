/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 08, 2024
 * @description Handles the reduction from a Vertex Cover graph to a Hamiltonian Circuit graph.
 * @exports ReductionHandler
 */

import { VCGraph } from './vcGraph';
import { HCGraph } from './hcGraph';

/**
 * @description Handles the reduction from a Vertex Cover graph (VCGraph) to a Hamiltonian Circuit graph (HCGraph).
 */
export class ReductionHandler {
  private vcGraph: VCGraph;
  private hcGraph: HCGraph | null = null;

  /**
   * @description Creates an instance of the ReductionHandler.
   * @param {VCGraph} vcGraph - The Vertex Cover graph to reduce.
   */
  constructor(vcGraph: VCGraph) {
    this.vcGraph = vcGraph;
  }

  /**
   * @description Performs the reduction from VC to HC.
   * @returns {HCGraph} The Hamiltonian Circuit graph.
   */
  public performReduction(): HCGraph {
    this.hcGraph = this.vcGraph.reduceToHC();
    return this.hcGraph;
  }

  /**
   * @description Returns the original Vertex Cover graph.
   * @returns {VCGraph} The Vertex Cover graph.
   */
  public getVCGraph(): VCGraph {
    return this.vcGraph;
  }

  /**
   * @description Returns the reduced Hamiltonian Circuit graph.
   * @returns {HCGraph | null} The Hamiltonian Circuit graph, or null if the reduction hasn't been performed.
   */
  public getHCGraph(): HCGraph | null {
    return this.hcGraph;
  }

  /**
   * @description Validates the Hamiltonian Circuit graph.
   * @returns {boolean} True if the HC graph is valid; false otherwise.
   */
  public validateHCGraph(): boolean {
    if (!this.hcGraph) {
      throw new Error('Hamiltonian Circuit graph not available. Perform the reduction first.');
    }

    const selectorNodes = this.hcGraph.getSelectorNodes();
    return selectorNodes.length > 0 && selectorNodes.every((node) => node.getSuccessors().length > 0);
  }
}