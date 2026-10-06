import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Building2, BookOpen, Home, Trophy, Coffee, Bus, GraduationCap, Briefcase } from 'lucide-react';
import { campusLocations } from '@/lib/demo-data';

const typeConfig: Record<string, { icon: any; color: string; label: string }> = {
  academic: { icon: Building2, color: 'bg-primary/10 text-primary', label: 'Academic' },
  library: { icon: BookOpen, color: 'bg-accent/10 text-accent', label: 'Library' },
  hostel: { icon: Home, color: 'bg-warning/10 text-warning', label: 'Hostel' },
  sports: { icon: Trophy, color: 'bg-success/10 text-success', label: 'Sports' },
  events: { icon: GraduationCap, color: 'bg-primary/10 text-primary', label: 'Events' },
  food: { icon: Coffee, color: 'bg-warning/10 text-warning', label: 'Food' },
  transport: { icon: Bus, color: 'bg-accent/10 text-accent', label: 'Transport' },
  admin: { icon: Briefcase, color: 'bg-muted text-muted-foreground', label: 'Admin' },
};

export function CampusMapPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredLocations = filter === 'all' ? campusLocations : campusLocations.filter(l => l.type === filter);
  const filters = ['all', ...Array.from(new Set(campusLocations.map(l => l.type)))];

  // Simple SVG-based campus map (no external dependency)
  const mapWidth = 600;
  const mapHeight = 400;
  const minLat = 23.256, maxLat = 23.263;
  const minLng = 77.409, maxLng = 77.416;
  const toX = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * mapWidth;
  const toY = (lat: number) => mapHeight - ((lat - minLat) / (maxLat - minLat)) * mapHeight;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Campus Map & Navigation</h1>
        <p className="text-muted-foreground text-sm mt-1">Find your way around the campus with our interactive map.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="p-4 overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
              <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="w-full h-full rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(210 40% 94%), hsl(210 40% 90%))' }}>
                {/* Roads */}
                <line x1="0" y1={mapHeight/2} x2={mapWidth} y2={mapHeight/2} stroke="white" strokeWidth="8" opacity="0.6" />
                <line x1={mapWidth/2} y1="0" x2={mapWidth/2} y2={mapHeight} stroke="white" strokeWidth="8" opacity="0.6" />
                <line x1="0" y1="0" x2={mapWidth} y2={mapHeight} stroke="white" strokeWidth="4" opacity="0.3" />

                {/* Green areas */}
                <ellipse cx={mapWidth * 0.2} cy={mapHeight * 0.3} rx="60" ry="40" fill="hsl(142 71% 45% / 0.15)" />
                <ellipse cx={mapWidth * 0.8} cy={mapHeight * 0.7} rx="70" ry="50" fill="hsl(142 71% 45% / 0.15)" />

                {/* Location markers */}
                {filteredLocations.map(loc => {
                  const config = typeConfig[loc.type] || typeConfig.academic;
                  const x = toX(loc.lng);
                  const y = toY(loc.lat);
                  const isSelected = selected === loc.id;
                  return (
                    <g key={loc.id} onClick={() => setSelected(loc.id)} style={{ cursor: 'pointer' }}>
                      {isSelected && <circle cx={x} cy={y} r="18" fill="hsl(var(--primary) / 0.2)" className="animate-pulse" />}
                      <circle cx={x} cy={y} r={isSelected ? 12 : 9} fill={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--card))'} stroke="hsl(var(--primary))" strokeWidth="2" />
                      <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fill={isSelected ? 'white' : 'hsl(var(--primary))'} fontWeight="bold">{loc.name.charAt(0)}</text>
                      {isSelected && (
                        <g>
                          <rect x={x - 60} y={y - 35} width="120" height="20" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                          <text x={x} y={y - 21} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">{loc.name}</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
              <div className="absolute bottom-2 left-2 bg-card/80 glass rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                Smart Campus • Bhopal, MP
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-sm mb-3">Filter Locations</h3>
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full transition-colors capitalize ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70'}`}>
                  {f === 'all' ? 'All' : typeConfig[f]?.label || f}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Locations ({filteredLocations.length})</h3>
            <div className="space-y-2">
              {filteredLocations.map(loc => {
                const config = typeConfig[loc.type] || typeConfig.academic;
                const Icon = config.icon;
                return (
                  <button key={loc.id} onClick={() => setSelected(loc.id)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selected === loc.id ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted'}`}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">{config.label}</p>
                    </div>
                    {selected === loc.id && <Navigation className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>

          {selected && (
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="font-medium text-sm">{campusLocations.find(l => l.id === selected)?.name}</p>
              </div>
              <Button size="sm" className="w-full">
                <Navigation className="h-3.5 w-3.5 mr-1" /> Navigate Here
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
