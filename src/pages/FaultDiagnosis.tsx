import { useGlobalData } from '@/context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, FileDown, Zap } from 'lucide-react';
import { exportFaultsToPDF, exportFaultsToCSV } from '@/utils/exportUtils';

export default function FaultDiagnosis() {
  const { globalParsedLogsData, isProcessed } = useGlobalData();

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      case 'Low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const highSeverityCount = globalParsedLogsData.filter(f => f.severity === 'High').length;
  const mediumSeverityCount = globalParsedLogsData.filter(f => f.severity === 'Medium').length;
  const lowSeverityCount = globalParsedLogsData.filter(f => f.severity === 'Low').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Fault Diagnosis</h1>
          <p className="text-muted-foreground mt-2">
            Detailed fault analysis and resolution guidance
          </p>
        </div>
        {isProcessed && globalParsedLogsData.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={() => exportFaultsToPDF(globalParsedLogsData)} variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export PDF
            </Button>
            <Button onClick={() => exportFaultsToCSV(globalParsedLogsData)} variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        )}
      </div>

      {!isProcessed ? (
        <Card className="shadow-premium">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground">
                Upload charger logs from the Dashboard Home to view fault diagnosis
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="shadow-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Faults</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{globalParsedLogsData.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Detected issues
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Severity</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{highSeverityCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Immediate attention required
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medium Severity</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{mediumSeverityCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Monitor closely
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Severity</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{lowSeverityCount}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Routine maintenance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fault Details Table */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle>Fault Details</CardTitle>
              <CardDescription>
                Complete list of detected faults with resolution guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Fault Type</TableHead>
                      <TableHead>Connector</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Root Cause</TableHead>
                      <TableHead>Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {globalParsedLogsData.map((fault) => (
                      <TableRow key={fault.id}>
                        <TableCell className="font-mono text-sm">
                          {new Date(fault.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-medium">{fault.faultType}</TableCell>
                        <TableCell>{fault.connectorId}</TableCell>
                        <TableCell>{getSeverityBadge(fault.severity)}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm">{fault.description}</p>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-muted-foreground">{fault.rootCause}</p>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm">{fault.resolution}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {globalParsedLogsData.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No faults detected in the uploaded logs</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
