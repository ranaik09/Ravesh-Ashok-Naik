/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useRef, useState } from 'react';
import { VoxelEngine } from './services/VoxelEngine';
import { UIOverlay } from './components/UIOverlay';
import { Generators } from './utils/voxelGenerators';
import { AppState } from './types';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VoxelEngine | null>(null);
  
  const [appState, setAppState] = useState<AppState>(AppState.STABLE);
  const [currentModel, setCurrentModel] = useState<'Avatar' | 'Workstation'>('Avatar');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Engine
    const engine = new VoxelEngine(
      containerRef.current,
      (newState) => setAppState(newState),
      () => {} // Count change not needed for resume
    );

    engineRef.current = engine;

    // Initial Model Load - The Ravesh Avatar
    engine.loadInitialModel(Generators.RaveshAvatar());

    // Resize Listener
    const handleResize = () => engine.handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.cleanup();
    };
  }, []);

  // Update engine background color when theme changes
  useEffect(() => {
      if (engineRef.current) {
          engineRef.current.updateTheme(isDarkMode);
      }
  }, [isDarkMode]);

  const handleDismantle = () => {
    // "Debug Mode"
    engineRef.current?.dismantle();
  };

  const handleRebuild = () => {
    // "Compile Mode"
    if (engineRef.current) {
        // Toggle model just for fun or keep same
        engineRef.current.rebuild(Generators.RaveshAvatar());
    }
  };

  const handleSwitchModel = (model: 'Avatar' | 'Workstation') => {
      if (!engineRef.current) return;
      setCurrentModel(model);
      if (model === 'Avatar') {
          engineRef.current.rebuild(Generators.RaveshAvatar());
      } else {
          engineRef.current.rebuild(Generators.Workstation());
      }
  };
  
  const handleToggleRotation = () => {
      const newState = !isAutoRotate;
      setIsAutoRotate(newState);
      if (engineRef.current) {
          engineRef.current.setAutoRotate(newState);
      }
  }

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>
      {/* 3D Container - Background */}
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-80" />
      
      {/* UI Overlay - Resume Content */}
      <UIOverlay 
        appState={appState}
        isAutoRotate={isAutoRotate}
        currentModel={currentModel}
        onDismantle={handleDismantle}
        onRebuild={handleRebuild}
        onToggleRotation={handleToggleRotation}
        onSwitchModel={handleSwitchModel}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default App;