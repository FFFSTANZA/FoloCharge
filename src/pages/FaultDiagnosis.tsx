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
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Fault Details</CardTitle>
              <CardDescription className="text-base">
                Complete list of detected faults with resolution guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-semibold text-foreground py-4 px-6">Timestamp</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Fault Type</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Connector</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Severity</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Description</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Root Cause</TableHead>
                      <TableHead className="font-semibold text-foreground py-4 px-6">Resolution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {globalParsedLogsData.map((fault, index) => (
                      <TableRow 
                        key={fault.id}
                        className="hover:bg-muted/30 transition-colors border-b border-border/50"
                      >
                        <TableCell className="font-mono text-sm py-6 px-6 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-foreground">
                              {new Date(fault.timestamp).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(fault.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span className="font-semibold text-foreground">{fault.faultType}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top">
                          <Badge variant="outline" className="font-mono">
                            {fault.connectorId}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top">
                          {getSeverityBadge(fault.severity)}
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top max-w-xs">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground leading-relaxed">
                              {fault.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top max-w-xs">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {fault.rootCause}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6 align-top max-w-md">
                          <div className="space-y-2">
                            <p className="text-sm text-foreground leading-relaxed">
                              {fault.resolution}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {globalParsedLogsData.length === 0 && (
                <div className="text-center py-12 px-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Faults Detected</h3>
                  <p className="text-muted-foreground">
                    No faults were found in the uploaded logs. Your chargers are operating normally.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
