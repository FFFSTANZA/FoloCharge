import { useState } from 'react';
import { FileUpload } from '@/components/fault/FileUpload';
import { FaultSummary } from '@/components/fault/FaultSummary';
import { FaultTable } from '@/components/fault/FaultTable';
import { CostAnalysis } from '@/components/fault/CostAnalysis';
import { ExportButtons } from '@/components/fault/ExportButtons';
import { useToast } from '@/hooks/use-toast';
import { parseLogFile } from '@/utils/logParser';
import { classifyFaults } from '@/utils/faultClassifier';
import { calculateCostAnalysis } from '@/utils/costCalculator';
import type { FaultAnalysis, CostParameters, CostAnalysis as CostAnalysisType } from '@/types/fault';

export default function Dashboard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [faults, setFaults] = useState<FaultAnalysis[]>([]);
  const [costParams, setCostParams] = useState<CostParameters>({
    avgSessionValue: 120,
    avgSessionsPerDay: 14
  });
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysisType>({
    revenueToday: 0,
    revenueThisMonth: 0,
    topCostliestFaults: []
  });

  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);

    try {
      const logEntries = await parseLogFile(file);

      if (logEntries.length === 0) {
        toast({
          title: 'No Faults Detected',
          description: 'The log file does not contain any recognizable fault entries.',
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }

      const detectedFaults = classifyFaults(logEntries);

      if (detectedFaults.length === 0) {
        toast({
          title: 'No Faults Classified',
          description: 'No faults could be classified from the log entries.',
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }

      const analysis = calculateCostAnalysis(detectedFaults, costParams);

      setFaults(detectedFaults);
      setCostAnalysis(analysis);

      toast({
        title: 'Analysis Complete',
        description: `Successfully analyzed ${detectedFaults.length} fault${detectedFaults.length !== 1 ? 's' : ''} from ${file.name}`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: 'Processing Error',
        description: 'Failed to process the log file. Please check the file format.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCostParamsChange = (newParams: CostParameters) => {
    setCostParams(newParams);
    if (faults.length > 0) {
      const analysis = calculateCostAnalysis(faults, newParams);
      setCostAnalysis(analysis);
    }
  };

  const highSeverityCount = faults.filter(f => f.severity === 'High').length;
  const mediumSeverityCount = faults.filter(f => f.severity === 'Medium').length;
  const lowSeverityCount = faults.filter(f => f.severity === 'Low').length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Fault Diagnoser</h1>
            <p className="text-muted-foreground mt-1">
              Analyze charger failures and calculate revenue impact
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Upload Log File</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by uploading your charger logs or try our sample data
                </p>
              </div>
            </div>
            <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </section>

          {faults.length > 0 && (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Fault Summary</h2>
                <FaultSummary
                  totalFaults={faults.length}
                  highSeverity={highSeverityCount}
                  mediumSeverity={mediumSeverityCount}
                  lowSeverity={lowSeverityCount}
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
                <CostAnalysis
                  costAnalysis={costAnalysis}
                  costParams={costParams}
                  onCostParamsChange={handleCostParamsChange}
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
                <FaultTable faults={faults} />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Export</h2>
                <ExportButtons
                  faults={faults}
                  costAnalysis={costAnalysis}
                  costParams={costParams}
                />
              </section>
            </>
          )}

          {!isProcessing && faults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Upload a log file to begin fault analysis
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          2025 FoloCharge
        </div>
      </footer>
    </div>
  );
}
