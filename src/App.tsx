/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @since Dec 08, 2024
 * @description Contains the App component.
 * @exports App
 */

import GraphReduction from './components/GraphReduction';

/**
 * @description Renders the main application.
 * @returns The App component.
 */
function App() {
  return (
    <main className="w-full px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Vertex Cover to Hamiltonian Circuit Reduction</h1>
      <GraphReduction />
    </main>
  );
}

export default App;