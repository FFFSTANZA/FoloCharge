import { createContext, useContext, useState, ReactNode } from 'react';
import type { FaultAnalysis } from '@/types/fault';
import type { SessionData, SiteMetrics, ChargerMetrics } from '@/types/analytics';

interface HealthData {
  chargerId: string;
  healthScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  patterns: string[];
  faultCount: number;
  lastFaultDate: string;
  estimatedLoss: number;
}

interface GlobalDataContextType {
  // Raw uploaded data
  globalParsedLogsData: FaultAnalysis[];
  globalParsedRevenueData: SessionData[];
  
  // Processed data
  siteMetrics: SiteMetrics[];
  chargerMetrics: ChargerMetrics[];
  healthData: HealthData[];
  
  // Status flags
  isLogsUploaded: boolean;
  isRevenueUploaded: boolean;
  isProcessed: boolean;
  
  // Setters
  setGlobalParsedLogsData: (data: FaultAnalysis[]) => void;
  setGlobalParsedRevenueData: (data: SessionData[]) => void;
  setSiteMetrics: (data: SiteMetrics[]) => void;
  setChargerMetrics: (data: ChargerMetrics[]) => void;
  setHealthData: (data: HealthData[]) => void;
  setIsLogsUploaded: (status: boolean) => void;
  setIsRevenueUploaded: (status: boolean) => void;
  setIsProcessed: (status: boolean) => void;
  
  // Actions
  resetAllData: () => void;
  loadSampleData: () => void;
}

const DataContext = createContext<GlobalDataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [globalParsedLogsData, setGlobalParsedLogsData] = useState<FaultAnalysis[]>([]);
  const [globalParsedRevenueData, setGlobalParsedRevenueData] = useState<SessionData[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics[]>([]);
  const [chargerMetrics, setChargerMetrics] = useState<ChargerMetrics[]>([]);
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  
  const [isLogsUploaded, setIsLogsUploaded] = useState(false);
  const [isRevenueUploaded, setIsRevenueUploaded] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const resetAllData = () => {
    setGlobalParsedLogsData([]);
    setGlobalParsedRevenueData([]);
    setSiteMetrics([]);
    setChargerMetrics([]);
    setHealthData([]);
    setIsLogsUploaded(false);
    setIsRevenueUploaded(false);
    setIsProcessed(false);
  };

  const loadSampleData = () => {
    // This will be implemented to load sample data for all modules
    console.log('Loading sample data...');
  };

  const value: GlobalDataContextType = {
    globalParsedLogsData,
    globalParsedRevenueData,
    siteMetrics,
    chargerMetrics,
    healthData,
    isLogsUploaded,
    isRevenueUploaded,
    isProcessed,
    setGlobalParsedLogsData,
    setGlobalParsedRevenueData,
    setSiteMetrics,
    setChargerMetrics,
    setHealthData,
    setIsLogsUploaded,
    setIsRevenueUploaded,
    setIsProcessed,
    resetAllData,
    loadSampleData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useGlobalData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useGlobalData must be used within a DataProvider');
  }
  return context;
}
