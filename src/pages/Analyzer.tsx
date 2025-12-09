import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { SessionUpload } from '@/components/analytics/SessionUpload';
import { AnalyticsSummaryCards } from '@/components/analytics/AnalyticsSummaryCards';
import { SiteAnalyticsTable } from '@/components/analytics/SiteAnalyticsTable';
import { ChargerAnalyticsTable } from '@/components/analytics/ChargerAnalyticsTable';
import { RecommendationsList } from '@/components/analytics/RecommendationsList';
import { parseSessionFile } from '@/utils/sessionParser';
import { 
  calculateSiteMetrics, 
  calculateChargerMetrics,
  calculateAnalyticsSummary 
} from '@/utils/analyticsEngine';
import { generateRecommendations } from '@/utils/recommendationEngine';
import { 
  SessionData, 
  SiteMetrics, 
  ChargerMetrics, 
  Recommendation,
  AnalyticsSummary 
} from '@/types/analytics';

export default function Analyzer() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics[]>([]);
  const [chargerMetrics, setChargerMetrics] = useState<ChargerMetrics[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);

    try {
      const sessionData = await parseSessionFile(file);
      
      if (sessionData.length === 0) {
        throw new Error('No valid session data found');
      }

      const sites = calculateSiteMetrics(sessionData);
      const chargers = calculateChargerMetrics(sessionData);
      const recs = generateRecommendations(sessionData, sites, chargers);
      const summaryData = calculateAnalyticsSummary(sessionData, sites, chargers);

      setSessions(sessionData);
      setSiteMetrics(sites);
      setChargerMetrics(chargers);
      setRecommendations(recs);
      setSummary(summaryData);

      toast({
        title: 'Analysis Complete',
        description: `Processed ${sessionData.length} sessions from ${sites.length} sites`,
      });
    } catch (error) {
      toast({
        title: 'Processing Failed',
        description: error instanceof Error ? error.message : 'Failed to process file',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">FoloCharge Analyzer</h1>
              <p className="text-muted-foreground mt-1">
                Multi-Site Revenue & Utilization Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Upload Session Data</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload your charging session logs to analyze site performance and get recommendations
                </p>
              </div>
            </div>
            <SessionUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </section>

          {summary && (
            <>
              <section>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <AnalyticsSummaryCards summary={summary} />
              </section>

              <Tabs defaultValue="sites" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="sites">Site Analytics</TabsTrigger>
                  <TabsTrigger value="chargers">Charger Analytics</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="sites" className="mt-6">
                  <SiteAnalyticsTable sites={siteMetrics} />
                </TabsContent>

                <TabsContent value="chargers" className="mt-6">
                  <ChargerAnalyticsTable chargers={chargerMetrics} />
                </TabsContent>

                <TabsContent value="recommendations" className="mt-6">
                  <RecommendationsList recommendations={recommendations} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
