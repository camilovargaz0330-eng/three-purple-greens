/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, MapPin, Users, Info, Sparkles, Check } from 'lucide-react';
import { UpcomingEvent } from '../types';

interface EventCardProps {
  key?: string;
  event: UpcomingEvent;
  onRegister: (eventId: string) => void;
  isRegistered: boolean;
}

export default function EventCard({ event, onRegister, isRegistered }: EventCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  // Calculate percentage of occupied places
  const occupiedPercentage = (event.registeredCount / event.capacity) * 105; // Make the visual scale dynamic

  return (
    <div 
      id={`event-card-${event.id}`}
      className="glass-card p-6 flex flex-col border-l-4 border-l-brand-green hover:shadow-[0_0_15px_rgba(149,218,18,0.25)] transition-all duration-300 group rounded-sm min-h-[260px] relative overflow-hidden"
    >
      {/* Decorative background glow for active events */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"></div>

      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs text-brand-green font-bold block bg-brand-green/10 border border-brand-green/20 px-2 py-0.5 rounded-sm">
          {event.date} - {event.time}
        </span>
        {isRegistered && (
          <span className="flex items-center gap-1 font-mono text-[9px] text-brand-green-hover font-bold animate-pulse px-2 py-0.5 bg-brand-green/20 rounded">
            <Check className="w-3 h-3" /> REGISTRADO
          </span>
        )}
      </div>

      <h4 className="font-display font-semibold text-lg text-brand-text mb-4 uppercase leading-tight group-hover:text-brand-green transition-colors">
        {event.title}
      </h4>

      {/* Embedded Details when expanded */}
      {showInfo ? (
        <div id={`event-expand-${event.id}`} className="space-y-3 mt-1 text-xs text-brand-text-dim/95 transition-all duration-300">
          <p className="font-sans leading-relaxed italic bg-neutral-950/40 p-3 rounded border border-neutral-800">
            {event.description}
          </p>
          <div className="space-y-1.5 font-mono text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-purple-light" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-purple-light" />
              <span>Cupo: {event.registeredCount} / {event.capacity} lugares tomados</span>
            </div>
          </div>
          
          <div className="h-1 w-full bg-neutral-950 rounded-full overflow-hidden">
            <div 
              className="bg-brand-green h-full rounded-full" 
              style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="font-sans text-brand-text-dim text-xs leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>
      )}

      {/* Actions row */}
      <div className="mt-auto pt-6 border-t border-neutral-800/60 flex items-center justify-between gap-4">
        <button 
          id={`btn-event-info-${event.id}`}
          onClick={() => setShowInfo(!showInfo)}
          className="text-[10px] font-mono font-bold tracking-widest uppercase border-b border-brand-green text-brand-text-dim hover:text-brand-green hover:border-brand-green-hover transition-colors pb-0.5 flex items-center gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          {showInfo ? 'OCULTAR INFO' : 'MÁS INFO'}
        </button>

        <button 
          id={`btn-event-rsvp-${event.id}`}
          onClick={() => onRegister(event.id)}
          disabled={isRegistered}
          className={`px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-widest rounded-sm border transition-all cursor-pointer ${
            isRegistered 
              ? 'border-brand-green/30 text-brand-green bg-brand-green/10 cursor-default' 
              : 'border-brand-purple text-brand-purple-light hover:bg-brand-purple hover:text-white hover:shadow-[0_0_10px_rgba(119,1,208,0.4)]'
          }`}
        >
          {isRegistered ? 'Anotado ✔' : 'REGISTRARME'}
        </button>
      </div>
    </div>
  );
}
