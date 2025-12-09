import type { FaultAnalysis } from '@/types/fault';

interface HealthData {
  chargerId: string;
  healthScore: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  patterns: string[];
  faultCount: number;
  lastFaultDate: string;
  estimatedLoss: number;
}

export function calculateHealthData(faults: FaultAnalysis[]): HealthData[] {
  // Group faults by charger/connector
  const chargerFaults = new Map<string, FaultAnalysis[]>();
  
  faults.forEach(fault => {
    const key = fault.connectorId || 'Unknown';
    if (!chargerFaults.has(key)) {
      chargerFaults.set(key, []);
    }
    chargerFaults.get(key)!.push(fault);
  });

  const healthDataList: HealthData[] = [];

  chargerFaults.forEach((chargerFaultList, chargerId) => {
    const faultCount = chargerFaultList.length;
    const highSeverityCount = chargerFaultList.filter(f => f.severity === 'High').length;
    const mediumSeverityCount = chargerFaultList.filter(f => f.severity === 'Medium').length;
    
    // Calculate health score (0-100)
    let healthScore = 100;
    healthScore -= highSeverityCount * 15;
    healthScore -= mediumSeverityCount * 8;
    healthScore -= (faultCount - highSeverityCount - mediumSeverityCount) * 3;
    healthScore = Math.max(0, Math.min(100, healthScore));

    // Determine risk level
    let riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    if (healthScore < 30 || highSeverityCount >= 3) {
      riskLevel = 'Critical';
    } else if (healthScore < 50 || highSeverityCount >= 2) {
      riskLevel = 'High';
    } else if (healthScore < 70 || mediumSeverityCount >= 3) {
      riskLevel = 'Medium';
    } else {
      riskLevel = 'Low';
    }

    // Detect patterns
    const patterns: string[] = [];
    const faultTypes = chargerFaultList.map(f => f.faultType);
    const faultTypeCounts = new Map<string, number>();
    
    faultTypes.forEach(type => {
      faultTypeCounts.set(type, (faultTypeCounts.get(type) || 0) + 1);
    });

    faultTypeCounts.forEach((count, type) => {
      if (count >= 3) {
        patterns.push(`Recurring ${type} (${count}x)`);
      }
    });

    // Check for overheating pattern
    if (chargerFaultList.some(f => f.faultType === 'Overheating')) {
      patterns.push('Temperature issues detected');
    }

    // Check for network issues
    if (chargerFaultList.some(f => f.faultType === 'OCPP network disconnect')) {
      patterns.push('Network connectivity problems');
    }

    // Check for power issues
    if (chargerFaultList.some(f => 
      f.faultType === 'Overvoltage' || 
      f.faultType === 'Low grid voltage' ||
      f.faultType === 'Power module failure'
    )) {
      patterns.push('Power supply instability');
    }

    // Get last fault date
    const sortedFaults = [...chargerFaultList].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const lastFaultDate = sortedFaults[0]?.timestamp || new Date().toISOString();

    // Estimate loss (₹120 per fault hour on average)
    const totalDowntime = chargerFaultList.reduce((sum, f) => sum + f.downtime, 0);
    const estimatedLoss = totalDowntime * 120 * 14 / 24; // avg sessions per day * avg ticket

    healthDataList.push({
      chargerId,
      healthScore: Math.round(healthScore),
      riskLevel,
      patterns: patterns.length > 0 ? patterns : ['No significant patterns detected'],
      faultCount,
      lastFaultDate,
      estimatedLoss: Math.round(estimatedLoss),
    });
  });

  // Sort by health score (worst first)
  return healthDataList.sort((a, b) => a.healthScore - b.healthScore);
}
