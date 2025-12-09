import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Flame, AlertOctagon, TrendingDown, Calendar, Wrench } from 'lucide-react';
import type { PredictiveAlert } from '@/types/predictive';

interface PredictiveAlertsProps {
  alerts: PredictiveAlert[];
}

export function PredictiveAlerts({ alerts }: PredictiveAlertsProps) {
  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-green-600" />
            Predictive Failure Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg font-medium text-green-600">All chargers are healthy!</p>
            <p className="mt-2">No failure patterns detected. Continue regular monitoring.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <AlertOctagon className="h-5 w-5 text-red-600" />;
      case 'high':
        return <Flame className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <Badge variant="destructive" className="gap-1">🚨 Critical — Failure Imminent</Badge>;
      case 'high':
        return <Badge variant="destructive" className="gap-1 bg-orange-600">🔥 High Failure Risk</Badge>;
      default:
        return <Badge variant="secondary" className="gap-1 bg-yellow-100 text-yellow-800">⚠️ Medium Failure Risk</Badge>;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Predictive Failure Alerts
            <Badge variant="outline" className="ml-auto">{alerts.length} Alert{alerts.length !== 1 ? 's' : ''}</Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {alerts.map((alert, index) => (
        <Card key={index} className="border-l-4" style={{
          borderLeftColor: alert.riskLevel === 'critical' ? '#dc2626' : alert.riskLevel === 'high' ? '#ea580c' : '#eab308'
        }}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getRiskIcon(alert.riskLevel)}
                <div>
                  <CardTitle className="text-lg">
                    Charger {alert.chargerId}
                    {alert.connectorId && ` - Connector ${alert.connectorId}`}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    {getRiskBadge(alert.riskLevel)}
                    <span className={`text-sm font-semibold ${getHealthColor(alert.healthScore)}`}>
                      Health: {alert.healthScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Explanation */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Issue Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{alert.explanation}</p>
            </div>

            {/* Detected Patterns */}
            <div>
              <h4 className="font-semibold text-sm mb-2">Detected Patterns</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {alert.patterns.filter(p => p.detected).map((pattern, idx) => (
                  <div key={idx} className="text-sm bg-muted p-2 rounded">
                    <span className="font-medium">{pattern.patternType}:</span>{' '}
                    <span className="text-red-600 font-semibold">{pattern.count}</span> events in {pattern.timeWindow}
                    <span className="text-muted-foreground"> (threshold: {pattern.threshold})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action */}
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Recommended Action
              </h4>
              <p className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded border border-blue-200 dark:border-blue-800">
                {alert.recommendedAction}
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Time to Failure</p>
                  <p className="text-sm font-semibold">
                    {alert.daysUntilFailure} day{alert.daysUntilFailure !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Potential Revenue Loss</p>
                  <p className="text-sm font-semibold text-red-600">
                    ₹{alert.estimatedRevenueLoss.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
