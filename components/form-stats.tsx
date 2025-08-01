'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormStats {
  totalVotes: number;
  thisWeek: number;
  topRequests: Array<{ request: string; count: number }>;
  liveRequest: {
    name: string;
    response: string;
  };
}

interface FormStatsProps {
  onStatsUpdate?: (stats: { 
    totalVotes: number; 
    thisWeek: number; 
    topRequests?: Array<{ request: string; count: number }> 
  }) => void;
}

export default function FormStats({ onStatsUpdate }: FormStatsProps) {
  const [stats, setStats] = useState<FormStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastFetchTimeRef = useRef<number>(0);

  const fetchStats = async () => {
    const currentTime = Date.now();
    const tenMinutesAgo = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Only fetch if more than 10 minutes have passed since last fetch
    if (currentTime - lastFetchTimeRef.current < tenMinutesAgo) {
      console.log('Skipping fetch: Less than 10 minutes since last update');
      return;
    }

    try {
      console.log('Attempting to fetch form statistics');
      setLoading(true);
      const response = await fetch('/api/form-data');
      
      console.log('Fetch response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Fetched form data:', data);
      
      if (!data) {
        throw new Error('Received empty data');
      }
      
      setStats(data);
      setError(null);

      // Update last fetch time
      lastFetchTimeRef.current = currentTime;

      // Call onStatsUpdate if provided
      if (onStatsUpdate) {
        onStatsUpdate({
          totalVotes: data.totalVotes,
          thisWeek: data.thisWeek,
          topRequests: data.topRequests
        });
      }
    } catch (err) {
      console.error('Full error during stats fetch:', err);
      
      let errorMessage = 'Failed to load statistics';
      if (err instanceof Error) {
        errorMessage = `Failed to load statistics: ${err.message}`;
      }
      
      setError(errorMessage);
      console.error('Error details:', {
        name: err instanceof Error ? err.name : 'Unknown Error',
        message: err instanceof Error ? err.message : 'No additional details',
        stack: err instanceof Error ? err.stack : 'No stack trace'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch stats immediately on component mount
    fetchStats();

    // No recurring interval, only manual fetch
  }, [onStatsUpdate]);

  // Render logic remains the same
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchStats}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Votes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalVotes}</div>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.thisWeek}</div>
        </CardContent>
      </Card>

      {/* Top Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.topRequests.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="truncate">{item.request}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Student Request */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Latest Request</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="font-medium text-sm">{stats.liveRequest.name}</div>
            <div className="text-xs text-gray-600 truncate">
              {stats.liveRequest.response}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}