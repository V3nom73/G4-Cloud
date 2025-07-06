import { useState, useEffect, useCallback } from 'react';
import { EnergyFlow } from '@/types';
import { generateMockEnergyFlow } from '@/lib/utils';

interface UseEnergyFlowOptions {
  interval?: number;
  mockData?: boolean;
}

export function useEnergyFlow(options: UseEnergyFlowOptions = {}) {
  const { interval = 3000, mockData = true } = options;
  const [energyFlow, setEnergyFlow] = useState<EnergyFlow>({
    solar: 0,
    grid: 0,
    house: 0,
    battery: 0,
    wallbox: 0
  });
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const updateEnergyFlow = useCallback(() => {
    if (mockData) {
      // Generate mock data for demo
      const newFlow = generateMockEnergyFlow();
      setEnergyFlow(newFlow);
      setLastUpdate(new Date());
      setIsConnected(true);
    } else {
      // TODO: Implement real WebSocket connection
      // This would connect to the actual backend API
    }
  }, [mockData]);

  useEffect(() => {
    // Initial update
    updateEnergyFlow();

    // Set up interval for updates
    const intervalId = setInterval(updateEnergyFlow, interval);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, updateEnergyFlow]);

  const getTotalProduction = useCallback(() => {
    return energyFlow.solar;
  }, [energyFlow.solar]);

  const getTotalConsumption = useCallback(() => {
    return energyFlow.house + energyFlow.wallbox;
  }, [energyFlow.house, energyFlow.wallbox]);

  const getSelfConsumption = useCallback(() => {
    const production = getTotalProduction();
    const consumption = getTotalConsumption();
    return Math.min(production, consumption);
  }, [getTotalProduction, getTotalConsumption]);

  const getGridStatus = useCallback(() => {
    const production = getTotalProduction();
    const consumption = getTotalConsumption();
    const difference = production - consumption;
    
    if (difference > 0.1) {
      return { status: 'exporting', value: difference };
    } else if (difference < -0.1) {
      return { status: 'importing', value: Math.abs(difference) };
    }
    return { status: 'balanced', value: 0 };
  }, [getTotalProduction, getTotalConsumption]);

  return {
    energyFlow,
    isConnected,
    lastUpdate,
    totalProduction: getTotalProduction(),
    totalConsumption: getTotalConsumption(),
    selfConsumption: getSelfConsumption(),
    gridStatus: getGridStatus()
  };
} 