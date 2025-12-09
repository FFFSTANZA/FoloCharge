import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle } from 'lucide-react';
import type { ChargerHealth } from '@/types/predictive';

interface ChargerHealthScoreProps {
  healthData: ChargerHealth[];
}

export function ChargerHealthScore({ healthData }: ChargerHealthScoreProps) {
  if (healthData.length === 0) {
    return null;
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthTextColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive" className="bg-orange-600">High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      default:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>;
    }
  };

  // Sort by health score (lowest first)
  const sortedHealth = [...healthData].sort((a, b) => a.healthScore - b.healthScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Charger Health Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedHealth.map((health, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Charger {health.chargerId}</span>
                  {getRiskBadge(health.riskLevel)}
                  {health.criticalPatterns > 0 && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {health.criticalPatterns} pattern{health.criticalPatterns !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <span className={`text-lg font-bold ${getHealthTextColor(health.healthScore)}`}>
                  {health.healthScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getHealthColor(health.healthScore)}`}
                  style={{ width: `${health.healthScore}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{health.totalFaults} total fault{health.totalFaults !== 1 ? 's' : ''}</span>
                <span>Last fault: {new Date(health.lastFaultDate).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
