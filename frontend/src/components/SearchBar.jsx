import { useState } from "react";
import { Search, MapPin, Calendar, Globe, Menu } from "lucide-react";
import { cn } from "../lib/utils";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  // Advanced params state
  const [dataType, setDataType] = useState("TIMESERIES");
  const [geo, setGeo] = useState("");
  const [date, setDate] = useState("today 12-m");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    onSearch({ q: query, data_type: dataType, geo, date });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative group z-20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-32 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl text-lg shadow-sm hover:shadow-md focus:shadow-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none"
          placeholder="Explore what the world is searching for..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="ml-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Search
          </button>
        </div>

        {/* Advanced Filters Dropdown */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 origin-top z-10",
            isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <Globe className="h-3 w-3" /> Type
            </label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full p-2 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-primary outline-none transition-colors"
            >
              <option value="TIMESERIES">Interest over time</option>
              <option value="GEO_MAP">Interest by region</option>
              <option value="RELATED_TOPICS">Related topics</option>
              <option value="RELATED_QUERIES">Related queries</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <MapPin className="h-3 w-3" /> Region
            </label>
            <input
              type="text"
              placeholder="e.g. US, IN, GB"
              value={geo}
              onChange={(e) => setGeo(e.target.value)}
              className="w-full p-2 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-primary outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <Calendar className="h-3 w-3" /> Date
            </label>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-primary outline-none transition-colors"
            >
              <option value="now 1-H">Past hour</option>
              <option value="now 1-d">Past day</option>
              <option value="today 7-d">Past 7 days</option>
              <option value="today 1-m">Past 30 days</option>
              <option value="today 12-m">Past 12 months</option>
              <option value="today 5-y">Past 5 years</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
