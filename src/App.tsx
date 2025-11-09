import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Music, Cookie, Apple, Cake, Edit3, Check, X } from 'lucide-react';

interface AnimationState {
  isEating: boolean;
  isDancing: boolean;
  isShowingLove: boolean;
  lastFed: number;
}

interface FoodItem {
  id: string;
  type: 'cookie' | 'apple' | 'cake';
  x: number;
  y: number;
  timestamp: number;
}

function App() {
  const [owlName, setOwlName] = useState('Snowy');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [owlState, setOwlState] = useState<AnimationState>({
    isEating: false,
    isDancing: false,
    isShowingLove: false,
    lastFed: 0
  });
  const [hearts, setHearts] = useState<Array<{ id: string; x: number; y: number; timestamp: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: string; x: number; y: number; timestamp: number }>>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [owlHappiness, setOwlHappiness] = useState(50);

  const startEditingName = () => {
    setTempName(owlName);
    setIsEditingName(true);
  };

  const saveName = () => {
    if (tempName.trim()) {
      setOwlName(tempName.trim());
    }
    setIsEditingName(false);
    setTempName('');
  };

  const cancelEdit = () => {
    setIsEditingName(false);
    setTempName('');
  };

  const feedOwl = (foodType: 'cookie' | 'apple' | 'cake') => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const newFood: FoodItem = {
      id: Date.now().toString(),
      type: foodType,
      x: Math.random() * (containerWidth * 0.6) + (containerWidth * 0.2),
      y: Math.random() * 150 + 200,
      timestamp: Date.now()
    };

    setFoodItems(prev => [...prev, newFood]);

    setTimeout(() => {
      setOwlState(prev => ({ ...prev, isEating: true, lastFed: Date.now() }));
      setOwlHappiness(prev => Math.min(prev + 15, 100));

      setTimeout(() => {
        setOwlState(prev => ({ ...prev, isEating: false, isShowingLove: true }));
        showLove();

        setTimeout(() => {
          setOwlState(prev => ({ ...prev, isShowingLove: false }));
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const makeOwlDance = () => {
    setOwlState(prev => ({ ...prev, isDancing: true }));
    setOwlHappiness(prev => Math.min(prev + 10, 100));

    setTimeout(() => {
      setOwlState(prev => ({ ...prev, isDancing: false, isShowingLove: true }));
      showLove();

      setTimeout(() => {
        setOwlState(prev => ({ ...prev, isShowingLove: false }));
      }, 2000);
    }, 3000);
  };

  const showLove = () => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = {
          id: Date.now().toString() + i,
          x: Math.random() * (containerWidth * 0.8) + (containerWidth * 0.1),
          y: Math.random() * 200 + 250,
          timestamp: Date.now()
        };
        setHearts(prev => [...prev, heart]);
      }, i * 200);
    }

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = {
          id: Date.now().toString() + i + 'sparkle',
          x: Math.random() * (containerWidth * 0.9) + (containerWidth * 0.05),
          y: Math.random() * 300 + 150,
          timestamp: Date.now()
        };
        setSparkles(prev => [...prev, sparkle]);
      }, i * 150);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setHearts(prev => prev.filter(heart => now - heart.timestamp < 3000));
      setSparkles(prev => prev.filter(sparkle => now - sparkle.timestamp < 2000));
      setFoodItems(prev => prev.filter(food => now - food.timestamp < 2000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getOwlClasses = () => {
    let classes = 'owl-container transform transition-all duration-300 ';
    if (owlState.isEating) classes += 'animate-bounce ';
    if (owlState.isDancing) classes += 'animate-pulse ';
    if (owlState.isShowingLove) classes += 'scale-110 ';
    return classes;
  };

  const getFoodIcon = (type: string) => {
    switch (type) {
      case 'cookie': return <Cookie className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'apple': return <Apple className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'cake': return <Cake className="w-4 h-4 sm:w-6 sm:h-6" />;
      default: return <Cookie className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden font-sans">
      {/* Background decorations - night sky theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-8 right-4 sm:top-20 sm:right-20 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 left-4 sm:bottom-20 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 bg-blue-200 rounded-full opacity-70 animate-pulse delay-500"></div>
        <div className="absolute top-16 left-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-90 animate-pulse delay-700"></div>
        <div className="absolute top-32 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-100 rounded-full opacity-75 animate-pulse delay-300"></div>

        {/* Moon */}
        <div className="absolute top-[20%] right-1 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full opacity-90 shadow-lg">
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-3 right-3 w-1 h-1 bg-yellow-300 rounded-full opacity-40"></div>
        </div>
      </div>

      {/* Header */}
      <div className="pt-4 sm:pt-8 pb-2 sm:pb-4 relative z-10 px-4">
        <div className="flex justify-center gap-2 sm:gap-4 mb-2">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            🦉 {owlName}
          </h1>
          {!isEditingName ? (
            <button
              onClick={startEditingName}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105"
              aria-label="Edit owl name"
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red/20 backdrop-blur-sm rounded-full px-3 py-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveName()}
                className="bg-transparent text-white placeholder-white/70 border-none outline-none text-sm sm:text-base w-20 sm:w-24"
                placeholder="Name"
                maxLength={15}
                autoFocus
              />
              <button
                onClick={saveName}
                className="text-green-300 hover:text-green-200 transition-colors"
                aria-label="Save name"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={cancelEdit}
                className="text-red-300 hover:text-red-200 transition-colors"
                aria-label="Cancel edit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-xs md:text-xl text-white/90 drop-shadow-md">
          Feed me, make me dance, and I'll give you lots of love! 💕
        </p>
      </div>

      {/* Happiness meter */}
      <div className="mb-4 sm:mb-8 relative z-10 px-4">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full p-2">
          <p className="text-white font-semibold mr-2 text-sm sm:text-base">Happiness Level</p>
          <div className="w-20 sm:w-48 h-2 sm:h-4 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-pink-400 transition-all duration-500 rounded-full"
              style={{ width: `${owlHappiness}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main owl container */}
      <div className="flex justify-center items-center relative min-h-[300px] sm:min-h-[450px] px-4">
        <div className={getOwlClasses()}>
          {/* Simple Beautiful White Owl - Clean Design */}
          <div className="relative scale-75 sm:scale-100">

            {/* Main owl body - clean white design */}
            <div className="w-48 sm:w-64 h-56 sm:h-72 bg-gray-100 rounded-full relative shadow-2xl border-4 border-gray-400">

              {/* Simple white body with subtle shading */}
              <div className="absolute inset-1 bg-gray-200 rounded-full"></div>

              {/* Wings - simple and clean */}
              <div className={`absolute -left-10 sm:-left-8 top-12 sm:top-16 w-20 sm:w-28 h-36 sm:h-48 bg-gray-400 rounded-full transform rotate-12 shadow-lg transition-transform duration-300 ${owlState.isDancing ? 'animate-bounce' : ''}`}>
                <div className="absolute inset-1 bg-gray-100 rounded-full"></div>
              </div>

              <div className={`absolute -right-10 sm:-right-8 top-12 sm:top-16 w-20 sm:w-28 h-36 sm:h-48 bg-gray-400 rounded-full transform -rotate-12 shadow-lg transition-transform duration-300 ${owlState.isDancing ? 'animate-bounce delay-100' : ''}`}>
                <div className="absolute inset-1 bg-gray-100 rounded-full"></div>
              </div>

              {/* Head - large and prominent like emoji owl */}
              <div className="absolute -top-20 sm:-top-28 left-1/2 transform -translate-x-1/2 w-40 sm:w-52 h-36 sm:h-44 bg-gray-400 rounded-full shadow-xl">

                {/* Head shading */}
                <div className="absolute inset-1 bg-gray-100 rounded-full"></div>

                {/* Ear tufts - small and cute */}
                <div className="absolute -top-3 sm:-top-4 left-8 sm:left-10 w-3 sm:w-4 h-6 sm:h-8 bg-gray-400 rounded-full transform -rotate-20 shadow-md border border-gray-200"></div>
                <div className="absolute -top-3 sm:-top-4 right-8 sm:right-10 w-3 sm:w-4 h-6 sm:h-8 bg-gray-400 rounded-full transform rotate-20 shadow-md border border-gray-200"></div>

                {/* Large beautiful eyes - the focal point */}
                <div className="absolute top-8 sm:top-10 left-4 sm:left-8 w-16 sm:w-20 h-16 sm:h-20 bg-gray-400 rounded-full shadow-inner border-3 border-gray-200">
                  <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full transition-transform duration-200 ${owlState.isShowingLove ? 'scale-110' : ''}`}>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-6 h-6 sm:h-6 bg-black rounded-full">
                      <div className="absolute top-1 left-1 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-8 sm:top-10 right-4 sm:right-6 w-16 sm:w-20 h-16 sm:h-20 bg-gray-400 rounded-full shadow-inner border-3 border-gray-200">
                  <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full transition-transform duration-200 ${owlState.isShowingLove ? 'scale-110' : ''}`}>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-6 sm:w-6 h-6 sm:h-6 bg-black rounded-full">
                      <div className="absolute top-1 left-1 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>

                {/* Prominent beak - clean and visible */}
                <div className={`h-[20px] absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 transition-transform duration-200 ${owlState.isEating ? 'scale-125' : ''}`}>
                  <div className="relative w-[20px] h-[20px] border-t-[20px] border-r-[10px] border-l-[10px] border-t-orange-600 border-r-transparent border-l-transparent">

                  </div>
                </div>

                {/* Blush when showing love */}
                {owlState.isShowingLove && (
                  <>
                    <div className="absolute top-16 sm:top-20 left-2 w-6 sm:w-8 h-6 sm:h-8 bg-pink-300 rounded-full opacity-60"></div>
                    <div className="absolute top-16 sm:top-20 right-2 w-6 sm:w-8 h-6 sm:h-8 bg-pink-300 rounded-full opacity-60"></div>
                  </>
                )}
              </div>

              {!owlState.isEating && (
                <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
                  <div className="bg-pink-300 rounded-t-full p-2 shadow-md">
                    <Cake className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600" />
                  </div>
                  <div className="bg-pink-400 w-12 sm:w-16 h-3 sm:h-4 rounded-b-md shadow-sm"></div>
                  <div className="absolute -top-3 flex gap-1">
                    <div className="w-1 h-3 bg-yellow-200 rounded-full shadow-sm"></div>
                    <div className="w-1 h-3 bg-yellow-200 rounded-full shadow-sm"></div>
                    <div className="w-1 h-3 bg-yellow-200 rounded-full shadow-sm"></div>
                  </div>
                </div>
              )}

              {/* Simple feet */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-10 sm:left-16 w-12 sm:w-16 h-10 sm:h-12 bg-orange-400 rounded-t-full shadow-lg border-2 border-orange-300">
                <div className="absolute -bottom-3 left-2 w-2 h-6 bg-orange-500 rounded-full"></div>
                <div className="absolute -bottom-3 left-5 w-2 h-6 bg-orange-500 rounded-full"></div>
                <div className="absolute -bottom-3 right-2 w-2 h-6 bg-orange-500 rounded-full"></div>
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 right-10 sm:right-16 w-12 sm:w-16 h-10 sm:h-12 bg-orange-400 rounded-t-full shadow-lg border-2 border-orange-300">
                <div className="absolute -bottom-3 left-2 w-2 h-6 bg-orange-500 rounded-full"></div>
                <div className="absolute -bottom-3 left-5 w-2 h-6 bg-orange-500 rounded-full"></div>
                <div className="absolute -bottom-3 right-2 w-2 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating hearts */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-ping"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              transform: 'translateY(-50px)',
              animation: 'float-up 3s ease-out forwards'
            }}
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 fill-current" />
          </div>
        ))}

        {/* Floating sparkles */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              animation: 'sparkle 2s ease-out forwards'
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
          </div>
        ))}

        {/* Floating food items */}
        {foodItems.map(food => (
          <div
            key={food.id}
            className="absolute pointer-events-none"
            style={{
              left: `${food.x}px`,
              top: `${food.y}px`,
              animation: 'food-float 2s ease-out forwards'
            }}
          >
            <div className="text-amber-600">
              {getFoodIcon(food.type)}
            </div>
          </div>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 mt-4 sm:mt-12 pb-4 sm:pb-8 relative z-10 px-4">
        <button
          onClick={() => feedOwl('cookie')}
          className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-2 sm:py-4 px-3 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 sm:gap-3 text-xs sm:text-base"
        >
          <Cookie className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Feed Cookie</span>
          <span className="sm:hidden">Cookie</span>
        </button>

        <button
          onClick={() => feedOwl('apple')}
          className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 sm:py-4 px-3 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 sm:gap-3 text-xs sm:text-base"
        >
          <Apple className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Feed Apple</span>
          <span className="sm:hidden">Apple</span>
        </button>

        <button
          onClick={() => feedOwl('cake')}
          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-2 sm:py-4 px-3 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 sm:gap-3 text-xs sm:text-base"
        >
          <Cake className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Feed Cake</span>
          <span className="sm:hidden">Cake</span>
        </button>

        <button
          onClick={makeOwlDance}
          disabled={owlState.isDancing}
          className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 sm:py-4 px-3 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 sm:gap-3 text-xs sm:text-base"
        >
          <Music className="w-4 h-4 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Make Me Dance!</span>
          <span className="sm:hidden">Dance</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
          }
        }
        
        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
          }
        }
        
        @keyframes food-float {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-50px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
          }
        }
          @keyframes bounce-slow {
            0%, 100% {
              transform: translate(-50%, 0);
            }
            50% {
              transform: translate(-50%, -10px);
            }
          }

          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
      `}</style>
    </div>
  );
}

export default App;