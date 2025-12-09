import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics[]>([]);
  const [chargerMetrics, setChargerMetrics] = useState<ChargerMetrics[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const { toast } = useToast();

  // Determine active tab based on route
  const getActiveTab = () => {
    if (location.pathname === '/charger-analytics') return 'chargers';
    return 'sites'; // default for /site-analytics
  };

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

  // Page title based on route
  const getPageTitle = () => {
    if (location.pathname === '/charger-analytics') return 'Charger Analytics';
    return 'Site Analytics';
  };

  const getPageDescription = () => {
    if (location.pathname === '/charger-analytics') return 'Individual charger performance and classification';
    return 'Multi-site revenue and utilization analysis';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{getPageTitle()}</h1>
        <p className="text-muted-foreground mt-2">{getPageDescription()}</p>
      </div>

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
          <section className="animate-slide-up">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <AnalyticsSummaryCards summary={summary} />
          </section>

          <Tabs value={getActiveTab()} className="w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sites">Site Analytics</TabsTrigger>
              <TabsTrigger value="chargers">Charger Analytics</TabsTrigger>
              <TabsTrigger value="recommendations">
                Recommendations
                {recommendations.length > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {recommendations.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sites" className="mt-6 animate-slide-up">
              <SiteAnalyticsTable sites={siteMetrics} />
            </TabsContent>

            <TabsContent value="chargers" className="mt-6 animate-slide-up">
              <ChargerAnalyticsTable chargers={chargerMetrics} />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6 animate-slide-up">
              <RecommendationsList recommendations={recommendations} />
            </TabsContent>
          </Tabs>
        </>
      )}

      {!isProcessing && !summary && (
        <div className="text-center py-12 animate-slide-up">
          <p className="text-muted-foreground">
            Upload session data to begin analysis
          </p>
        </div>
      )}
    </div>
  );
}
