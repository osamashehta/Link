import { useMemo } from "react";

export function useTimeAgo(dateString: string): string {
    return useMemo(()=> {


        const now: Date = new Date();
        const past: Date = new Date(dateString);
        const diffInSeconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);
      
        if (diffInSeconds < 60) return 'Just now';
        const minutes: number = Math.floor(diffInSeconds / 60);
        if (minutes < 60) return `${minutes}m`;
        const hours: number = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`;
        const days: number = Math.floor(hours / 24);
        if (days < 7) return `${days}d`;
        const weeks: number = Math.floor(days / 7);
        if (weeks < 4) return `${weeks}w`;
        const months: number = Math.floor(days / 30);
        if (months < 12) return `${months}mo`;
        const years: number = Math.floor(days / 365);
        return `${years}y `;

    }, [dateString]);
  }