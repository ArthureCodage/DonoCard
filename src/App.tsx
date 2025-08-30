import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Spade, Layers } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [deckCount, setDeckCount] = useState(6);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => {
    setCount(0);
  };

  // Fonctions pour les cartes spécifiques selon le système Hi-Lo
  const handleLowCards = () => setCount(prev => prev + 1); // 2-6
  const handleMidCards = () => setCount(prev => prev); // 7-9 (neutre)
  const handleHighCards = () => setCount(prev => prev - 1); // 10-A

  const getCountColor = () => {
    if (count > 0) return 'text-emerald-400';
    if (count < 0) return 'text-red-400';
    return 'text-gray-300';
  };

  const getCountSign = () => {
    if (count > 0) return '+';
    return '';
  };

  // Calcul du True Count (décompte réel)
  const getTrueCount = () => {
    if (deckCount === 0) return 0;
    return Math.round((count / deckCount) * 10) / 10;
  };

  const getTrueCountColor = () => {
    const trueCount = getTrueCount();
    if (trueCount > 1) return 'text-emerald-400';
    if (trueCount < -1) return 'text-red-400';
    return 'text-gray-300';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Spade className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Dono Card</h1>
            <Spade className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-400 text-sm">Système Hi-Lo</p>
        </div>

        {/* Sélecteur de nombre de decks */}
        <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-600">
          <div className="flex items-center justify-center gap-4">
            <Layers className="w-5 h-5 text-gray-400" />
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">NOMBRE DE DECKS</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeckCount(prev => Math.max(1, prev - 1))}
                  className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <div className="text-xl font-bold text-white w-12 text-center">
                  {deckCount}
                </div>
                <button
                  onClick={() => setDeckCount(prev => Math.min(8, prev + 1))}
                  className="bg-gray-700 hover:bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Compteur principal */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-600">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={decrement}
              className="bg-red-600 hover:bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className={`text-5xl font-bold ${getCountColor()} transition-colors duration-300`}>
                {getCountSign()}{count}
              </div>
              <div className="text-xs text-gray-500 mt-1">RUNNING COUNT</div>
            </div>
            
            <button
              onClick={increment}
              className="bg-emerald-600 hover:bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* True Count */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">TRUE COUNT</div>
              <div className={`text-2xl font-bold ${getTrueCountColor()} transition-colors duration-300`}>
                {getTrueCount() > 0 ? '+' : ''}{getTrueCount()}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons par type de carte */}
        <div className="space-y-3 mb-6">
          <div className="text-center text-gray-400 text-xs mb-3">CARTES</div>
          
          <button
            onClick={handleLowCards}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 shadow-md"
          >
            <div className="font-semibold">2, 3, 4, 5, 6</div>
            <div className="text-xs text-emerald-200">+1 chaque</div>
          </button>
          
          <button
            onClick={handleMidCards}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 shadow-md"
          >
            <div className="font-semibold">7, 8, 9</div>
            <div className="text-xs text-gray-400">Neutre (0)</div>
          </button>
          
          <button
            onClick={handleHighCards}
            className="w-full bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 shadow-md"
          >
            <div className="font-semibold">10, J, Q, K, A</div>
            <div className="text-xs text-red-200">-1 chaque</div>
          </button>
        </div>

        {/* Bouton Reset */}
        <button
          onClick={reset}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        {/* Indication du décompte */}
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500 mb-1">AVANTAGE</div>
          <div className="text-sm font-medium">
            {getTrueCount() > 1 && <span className="text-emerald-400">Favorable (+)</span>}
            {getTrueCount() < -1 && <span className="text-red-400">Défavorable (-)</span>}
            {getTrueCount() >= -1 && getTrueCount() <= 1 && <span className="text-gray-400">Neutre</span>}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            Made by DonoCoding<span className="text-emerald-400 ml-1">✓</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;