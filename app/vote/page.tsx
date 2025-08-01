"use client"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import FloatingNavbar from "@/components/floating-navbar"
import FormStats from "@/components/form-stats"

// Declare the prop type for FormStats
declare module "@/components/form-stats" {
  interface FormStatsProps {
    onStatsUpdate?: (stats: { totalVotes: number; thisWeek: number }) => void;
  }
}

const colleges = [{ id: 1, name: "Saraswati College", votes: 445, status: "Active", logo: "SC" }]

const suggestionChips = [
  "Energy Drinks",
  "Healthy Snacks",
  "Coffee & Tea",
  "Protein Bars",
  "Chips & Crackers",
  "Candy & Chocolate",
  "Beverages",
  "Organic Options",
]

export default function VotePage() {
  // Log when the page component is rendered
  useEffect(() => {
    console.log('VotePage component rendering');
  }, []);

  const [selectedCollege, setSelectedCollege] = useState(colleges[0]) // Saraswati College selected by default
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [totalVotes, setTotalVotes] = useState(selectedCollege.votes)
  const [thisWeekVotes, setThisWeekVotes] = useState(0)
  const [topRequests, setTopRequests] = useState<Array<{ name: string; emoji: string; votes: number; percentage: number }>>([
    { name: "Energy Drinks", emoji: "⚡", votes: 0, percentage: 0 },
    { name: "Healthy Snacks", emoji: "🥗", votes: 0, percentage: 0 },
    { name: "Coffee & Tea", emoji: "☕", votes: 0, percentage: 0 },
  ])

  // Log state changes
  useEffect(() => {
    console.log('Selected College:', selectedCollege);
    console.log('Search Term:', searchTerm);
    console.log('Selected Chips:', selectedChips);
  }, [selectedCollege, searchTerm, selectedChips]);

  const toggleChip = (chip: string) => {
    console.log(`Toggling chip: ${chip}`);
    setSelectedChips((prev) => (prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]))
  }

  // Helper function to standardize request names with explicit overrides
  const standardizeRequestName = (request: string): string => {
    // Detailed logging to understand incoming request names
    console.log('Standardizing request name:', request);

    // Explicit name overrides
    const explicitOverrides: { [key: string]: string } = {
      // Chips
      "lays": "Lays",
      "lay's": "Lays",
      "kurkure": "Kurkure",
      
      // Energy Drinks
      "red bull": "Red Bull",
      "redbull": "Red Bull",
      "hell": "Hell",
      
      // Protein
      "protein bar": "Protein Bar",
      "protein bars": "Protein Bar"
    };

    // Normalize the request by converting to lowercase and trimming
    const normalizedRequest = request.toLowerCase().trim();

    // First, try explicit override
    for (const [key, value] of Object.entries(explicitOverrides)) {
      if (normalizedRequest === key || normalizedRequest.includes(key)) {
        console.log(`Explicit override found for ${request}: ${value}`);
        return value;
      }
    }

    // Fallback mappings
    const nameMap: { [key: string]: string } = {
      "energy drink": "Energy Drinks",
      "energy drinks": "Energy Drinks",
      "healthy snack": "Healthy Snacks",
      "healthy snacks": "Healthy Snacks",
      "coffee and tea": "Coffee & Tea",
      "coffee & tea": "Coffee & Tea"
    };

    // Try fallback mappings
    if (nameMap[normalizedRequest]) {
      console.log(`Fallback match found for ${request}: ${nameMap[normalizedRequest]}`);
      return nameMap[normalizedRequest];
    }

    // If no match found, log the unmatched request and return original
    console.warn(`No mapping found for request: ${request}`);
    return request;
  }

  // Helper function to assign emojis based on request name
  const getEmojiForRequest = (request: string): string => {
    const emojiMap: { [key: string]: string } = {
      // Chips and Snacks
      "Lays": "🥔",
      "Kurkure": "🌶️",
      
      // Protein and Energy
      "Protein Bar": "💪",
      "Red Bull": "⚡",
      "Hell": "🔥",
      
      // Default mappings
      "Energy Drinks": "⚡",
      "Healthy Snacks": "🥗",
      "Coffee & Tea": "☕",
      "Chips & Crackers": "🥨",
      "Candy & Chocolate": "🍫",
      "Beverages": "🥤",
      "Organic Options": "🌿"
    };

    // Check for exact match first
    if (emojiMap[request]) {
      return emojiMap[request];
    }

    // Then try partial match
    const matchedEmoji = Object.keys(emojiMap).find(key => 
      request.toLowerCase().includes(key.toLowerCase())
    );

    return matchedEmoji ? emojiMap[matchedEmoji] : "🍽️";
  }

  // Function to update votes from FormStats
  const handleStatsUpdate = (stats: { 
    totalVotes: number; 
    thisWeek: number; 
    topRequests?: Array<{ request: string; count: number }> 
  }) => {
    setTotalVotes(stats.totalVotes);
    setThisWeekVotes(stats.thisWeek);

    // Log incoming top requests for debugging
    console.log('Incoming Top Requests:', stats.topRequests);

    // Update top requests if provided
    if (stats.topRequests && stats.topRequests.length > 0) {
      const updatedTopRequests = stats.topRequests.map((request, index) => {
        // Log each request before standardization
        console.log(`Processing request ${index + 1}:`, request);

        return {
          name: standardizeRequestName(request.request),
          emoji: getEmojiForRequest(request.request),
          votes: request.count,
          percentage: calculatePercentage(request.count, stats.totalVotes)
        };
      });

      // Pad with default values if less than 3 requests
      while (updatedTopRequests.length < 3) {
        updatedTopRequests.push({ 
          name: "No Data", 
          emoji: "❓", 
          votes: 0, 
          percentage: 0 
        });
      }

      // Log final top requests before setting state
      console.log('Updated Top Requests:', updatedTopRequests);
      setTopRequests(updatedTopRequests);
    }
  }

  // Helper function to calculate percentage
  const calculatePercentage = (count: number, total: number): number => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* SECTION 1: COLLEGE SELECTOR */}
      <section className="pt-24 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Vote for Your College</h1>
          <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Select your college and vote for the snacks you want to see in HungryzHub vending machines
          </p>

          {/* Add FormStats component with onUpdate prop */}
          <div className="mb-12">
            <FormStats onStatsUpdate={handleStatsUpdate} />
          </div>

          {/* Rest of the existing content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college, index) => (
              <div
                key={college.id}
                onClick={() => {
                  console.log(`College selected: ${college.name}`);
                  setSelectedCollege(college);
                }}
                className={`group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/70 backdrop-blur-md rounded-3xl p-8 cursor-pointer transition-all duration-500 ease-out hover:scale-[1.05] overflow-hidden ${
                  selectedCollege.id === college.id
                    ? "ring-2 ring-white/50 shadow-2xl shadow-white/20 bg-gradient-to-br from-zinc-800/95 to-zinc-700/80"
                    : "border border-zinc-700/50 hover:border-zinc-600/70 hover:shadow-xl hover:shadow-white/10"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Selection indicator */}
                {selectedCollege.id === college.id && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent" />
                )}

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    {/* Enhanced logo */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm scale-110" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-white to-zinc-200 text-black rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <span className="font-bold text-lg">{college.logo}</span>
                      </div>
                    </div>

                    {/* Enhanced status badge */}
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border transition-all duration-300 ${
                        college.status === "Active"
                          ? "bg-gradient-to-r from-white/10 to-white/5 text-white border-white/30 shadow-lg"
                          : "bg-gradient-to-r from-zinc-800/60 to-zinc-700/40 text-zinc-400 border-zinc-600/50"
                      }`}
                    >
                      {college.status}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors duration-300">
                    {college.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-medium">Total Votes</span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm" />
                      <div className="relative bg-gradient-to-r from-zinc-800/80 to-zinc-700/60 border border-zinc-600/50 text-white rounded-xl px-4 py-2 text-lg font-bold backdrop-blur-sm">
                        {totalVotes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            ))}
          </div>

          {/* Startup Message */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-lg italic">More colleges coming soon</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: SELECTED COLLEGE HEADER */}
      <section className="py-8 px-6 bg-black border-b-2 border-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white text-black rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">{selectedCollege.logo}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedCollege.name}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm text-gray-400">Machine Active</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="border border-white rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Total Votes</div>
                  <div className="text-xl font-bold text-white">{totalVotes}</div>
                </div>
                <div className="border border-white rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">This Week</div>
                  <div className="text-xl font-bold text-white">+{thisWeekVotes}</div>
                </div>
                <div className="border border-white rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Rank</div>
                  <div className="text-xl font-bold text-white">#1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CURRENT TOP REQUESTS */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Current Top Requests</h2>
          <div className="space-y-8">
            {topRequests.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/70 backdrop-blur-md rounded-3xl p-8 border border-zinc-700/50 hover:border-zinc-600/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10 overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      {/* Enhanced emoji container */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-2xl blur-md scale-110" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-zinc-800/80 to-zinc-700/60 rounded-2xl flex items-center justify-center border border-zinc-600/50 backdrop-blur-sm">
                          <span className="text-3xl">{item.emoji}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                        <p className="text-zinc-400 bg-zinc-800/40 px-3 py-1 rounded-full text-sm border border-zinc-700/30">
                          {item.votes} votes
                        </p>
                      </div>
                    </div>

                    {/* Enhanced percentage display */}
                    <div className="text-right space-y-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm" />
                        <div className="relative bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-zinc-600/50 rounded-xl px-6 py-4 backdrop-blur-sm">
                          <div className="text-3xl font-bold text-white">{item.percentage}%</div>
                          <div className="text-sm text-zinc-400 font-medium">of total votes</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced progress bar */}
                  <div className="relative">
                    <div className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-full h-4 backdrop-blur-sm overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-700/30 to-zinc-600/20" />
                      <div
                        className="h-full bg-gradient-to-r from-white via-zinc-200 to-white rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                        style={{ width: `${item.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: VOTE FOR NEW ITEMS */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Vote for New Items</h2>

          {/* Google Form Container */}
          <div className="google-form-container max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfP26InnNm11xYGk_ML7lwTLpsVhTH_DXlIITpKVYpMEOFdYA/viewform?embedded=true"
              width="100%"
              height="700"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Vote for New Items Form"
              className="rounded-xl min-h-[600px] md:min-h-[700px]"
              style={{ background: "white" }}
            >
              Loading…
            </iframe>

            {/* Fallback Link */}
            <div className="text-center mt-4">
              <p className="text-zinc-400 text-sm mb-2">Having trouble with the form?</p>
              <a
                href="https://forms.gle/FtnjEA3aQcDTxxb66"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              >
                Open Form in New Tab
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: RECENT VOTES FEED */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Recent Votes</h2>
          <div className="space-y-4">
            {/* recentVotes data was removed, so this section will be empty or need new data */}
            {/* For now, keeping the structure but noting the missing data */}
            <div className="text-center text-gray-500">Recent votes feed is currently empty.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
