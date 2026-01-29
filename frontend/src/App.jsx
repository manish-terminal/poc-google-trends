import { useState } from "react";
import SearchBar from "./components/SearchBar";
import TrendsResults from "./components/TrendsResults";
import { fetchTrends } from "./services/api";
import { Sparkles, Zap, Activity } from "lucide-react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({});

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setParams(searchParams);
    
    // Clear previous results slightly for better UX if changing query
    if (searchParams.q !== params.q) setData(null);

    try {
      const result = await fetchTrends(searchParams);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-primary/20">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-primary/5 mb-4 group hover:scale-105 transition-transform duration-300">
             <Activity className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Trend<span className="text-primary">Scope</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Unlock real-time insights from billions of searches. Visualized instantly.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm font-semibold text-muted-foreground mt-4">
             <span className="flex items-center gap-1"><Sparkles className="h-4 w-4 text-yellow-500" /> Premium Insights</span>
             <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-blue-500" /> Real-time Data</span>
          </div>
        </header>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Results */}
        <main className="w-full max-w-6xl mt-8 pb-20">
           {!data && !loading && !error && (
             <div className="text-center py-20 opacity-50 animate-pulse">
                <p className="text-xl font-medium">Start by entering a keyword above</p>
             </div>
           )}
           <TrendsResults data={data} loading={loading} error={error} params={params} />
        </main>

    
      </div>
    </div>
  );
}
