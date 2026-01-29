import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Map, List } from "lucide-react";

export default function TrendsResults({ data, loading, error, params }) {
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-center">
        <p className="font-semibold">Failed to load trends data.</p>
        <p className="text-sm opacity-80 mt-2">{error.message}</p>
      </div>
    );
  }

  if (!data) return null;

  const results = data.results;
  const metadata = data.metadata || {};

  // Helper to format date for XAxis depending on granularity
  // This helps when SerpApi returns timestamps or strings
  const formatXAxis = (tickItem) => {
    // Basic heuristic, can be improved based on actual data shape
    return tickItem;
  };

  const renderContent = () => {
    const type = params.data_type || "TIMESERIES";

    if (type === "TIMESERIES" && Array.isArray(results)) {
      // SerpApi structure for interest_over_time usually has 'timeline_data'
      // But the controller returns data.interest_over_time directly
      // Let's assume 'results' IS the array of timeline points
      
      // Need to normalize data. Sometimes SerpApi returns slightly different structures.
      // If results.timeline_data exists, use that.
      const chartData = results.timeline_data || results;

      if (!Array.isArray(chartData)) {
         return <div className="text-center p-10 text-muted-foreground">No time series data available</div>
      }

      return (
        <div className="h-[500px] w-full bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Interest over time
            </h3>
            <span className="text-sm text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {params.q}
            </span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    borderRadius: '12px', 
                    border: '1px solid hsl(var(--border))',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="values[0].value" 
                name="Interest"
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (type === "GEO_MAP") {
       // Geo map data usually returns a list of regions
       const geoData = results.geo_map_data || results;
       
       if (!Array.isArray(geoData)) {
         // Fallback for raw display if structure is unexpected
         return (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(results, null, 2)}</pre>
            </div>
         )
       }

       return (
         <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
             <Map className="h-5 w-5 text-primary" />
             Interest by Region
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {geoData.slice(0, 12).map((item, idx) => ( // limit to 12
               <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors">
                 <span className="font-medium text-sm">{item.geo_name || item.topic?.title}</span>
                 <span className="font-bold text-primary">{item.value || item.extracted_value}%</span>
               </div>
             ))}
           </div>
         </div>
       );
    }
    
    // Default fallback for other types (RELATED_QUERIES, etc.)
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
             <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
             <List className="h-5 w-5 text-primary" />
             Results
           </h3>
             <pre className="text-xs overflow-auto max-h-96 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl">{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {metadata.status === "Success" && (
        <p className="text-center text-xs text-muted-foreground mb-4">
          Data source: Google Trends via SerpApi • {metadata.id}
        </p>
      )}
      {renderContent()}
    </div>
  );
}
