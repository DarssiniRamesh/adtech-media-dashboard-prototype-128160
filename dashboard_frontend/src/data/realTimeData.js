// Real-time Data Simulation for Adtech Dashboard
// Live metrics, alerts, and streaming data simulation

export const realTimeData = {
  // Live dashboard metrics (updated every 30 seconds)
  liveMetrics: {
    timestamp: new Date().toISOString(),
    activeUsers: 15847,
    liveImpressions: 234567,
    liveClicks: 4567,
    liveConversions: 89,
    liveSpend: 12345.67,
    activeCampaigns: 34,
    serverStatus: "healthy",
    dataLatency: 2.3 // seconds
  },

  // Recent activity feed
  activityFeed: [
    {
      id: "activity_001",
      timestamp: "2024-01-15T14:28:45Z",
      type: "campaign_paused",
      message: "Campaign 'Mobile Gaming App Install' paused due to budget limit",
      severity: "warning",
      campaignId: "camp_004",
      userId: "user_123"
    },
    {
      id: "activity_002",
      timestamp: "2024-01-15T14:25:12Z",
      type: "high_cpc",
      message: "High CPC alert: B2B Software Solutions campaign exceeded $3.50 CPC threshold",
      severity: "alert",
      campaignId: "camp_003",
      metric: "cpc",
      value: 3.67
    },
    {
      id: "activity_003",
      timestamp: "2024-01-15T14:22:33Z",
      type: "conversion_spike",
      message: "Conversion rate increased by 15% in last hour for Fashion Forward campaign",
      severity: "success",
      campaignId: "camp_002",
      metric: "conversionRate",
      change: 15.2
    },
    {
      id: "activity_004",
      timestamp: "2024-01-15T14:18:07Z",
      type: "budget_milestone",
      message: "Summer Electronics Sale campaign reached 75% of budget",
      severity: "info",
      campaignId: "camp_001",
      percentage: 75
    },
    {
      id: "activity_005",
      timestamp: "2024-01-15T14:15:21Z",
      type: "quality_score_change",
      message: "Quality score improved for keyword 'electronics sale' from 7 to 8",
      severity: "success",
      campaignId: "camp_001",
      keyword: "electronics sale",
      oldScore: 7,
      newScore: 8
    }
  ],

  // Active alerts and notifications
  alerts: [
    {
      id: "alert_001",
      type: "budget_overspend",
      severity: "critical",
      title: "Budget Overspend Alert",
      message: "Campaign 'B2B Software Solutions' is on track to exceed daily budget by 20%",
      campaignId: "camp_003",
      threshold: 1200,
      current: 1440,
      timeframe: "today",
      acknowledged: false,
      createdAt: "2024-01-15T13:45:00Z"
    },
    {
      id: "alert_002",
      type: "performance_drop",
      severity: "warning",
      title: "CTR Performance Drop",
      message: "CTR dropped below 1.5% threshold for Fashion Forward campaign",
      campaignId: "camp_002",
      threshold: 1.5,
      current: 1.31,
      timeframe: "last_4_hours",
      acknowledged: false,
      createdAt: "2024-01-15T12:30:00Z"
    },
    {
      id: "alert_003",
      type: "conversion_spike",
      severity: "info",
      title: "Positive Performance Alert",
      message: "Conversion rate increased by 25% above normal for Electronics campaign",
      campaignId: "camp_001",
      threshold: 2.0,
      current: 2.7,
      timeframe: "last_2_hours",
      acknowledged: true,
      createdAt: "2024-01-15T11:15:00Z"
    }
  ],

  // Live bidding data
  liveBiddingData: [
    {
      auctionId: "auction_12345",
      timestamp: "2024-01-15T14:30:15.234Z",
      campaignId: "camp_001",
      keyword: "electronics sale",
      bidAmount: 2.45,
      maxBid: 3.00,
      position: 2,
      competitorBids: [2.67, 2.34, 2.12, 1.89],
      qualityScore: 8,
      adRank: 19.6,
      won: true,
      actualCPC: 2.35
    },
    {
      auctionId: "auction_12346",
      timestamp: "2024-01-15T14:30:16.567Z",
      campaignId: "camp_002",
      keyword: "fashion trends",
      bidAmount: 1.89,
      maxBid: 2.50,
      position: 1,
      competitorBids: [1.78, 1.65, 1.42],
      qualityScore: 7,
      adRank: 13.23,
      won: true,
      actualCPC: 1.79
    }
  ],

  // Hourly performance data (last 24 hours)
  hourlyPerformance: [
    { hour: "00:00", spend: 1234.56, impressions: 23456, clicks: 456, conversions: 12 },
    { hour: "01:00", spend: 987.65, impressions: 18901, clicks: 378, conversions: 8 },
    { hour: "02:00", spend: 765.43, impressions: 14567, clicks: 291, conversions: 6 },
    { hour: "03:00", spend: 654.32, impressions: 12345, clicks: 247, conversions: 5 },
    { hour: "04:00", spend: 543.21, impressions: 10234, clicks: 205, conversions: 4 },
    { hour: "05:00", spend: 678.90, impressions: 12890, clicks: 258, conversions: 6 },
    { hour: "06:00", spend: 890.12, impressions: 16789, clicks: 336, conversions: 9 },
    { hour: "07:00", spend: 1123.45, impressions: 21234, clicks: 425, conversions: 11 },
    { hour: "08:00", spend: 1456.78, impressions: 27890, clicks: 558, conversions: 15 },
    { hour: "09:00", spend: 1789.01, impressions: 34567, clicks: 691, conversions: 18 },
    { hour: "10:00", spend: 2012.34, impressions: 38901, clicks: 778, conversions: 21 },
    { hour: "11:00", spend: 2234.56, impressions: 43456, clicks: 869, conversions: 23 },
    { hour: "12:00", spend: 2456.78, impressions: 47890, clicks: 958, conversions: 26 },
    { hour: "13:00", spend: 2345.67, impressions: 45678, clicks: 914, conversions: 24 },
    { hour: "14:00", spend: 2123.45, impressions: 41234, clicks: 825, conversions: 22 }
  ],

  // Server and API status
  systemStatus: {
    overall: "healthy",
    services: [
      {
        name: "Campaign Management API",
        status: "healthy",
        responseTime: 145,
        uptime: 99.98
      },
      {
        name: "Analytics Engine",
        status: "healthy",
        responseTime: 89,
        uptime: 99.95
      },
      {
        name: "Bidding Engine",
        status: "degraded",
        responseTime: 234,
        uptime: 99.87
      },
      {
        name: "Reporting Service",
        status: "healthy",
        responseTime: 167,
        uptime: 99.99
      }
    ],
    lastCheck: "2024-01-15T14:30:00Z"
  },

  // Live competitor monitoring
  competitorActivity: [
    {
      competitor: "TechRival Corp",
      timestamp: "2024-01-15T14:25:00Z",
      activity: "new_campaign_launched",
      details: "Launched new electronics campaign targeting similar keywords",
      estimatedBudget: 50000,
      platforms: ["google", "facebook"]
    },
    {
      competitor: "StyleCompetitor Inc",
      timestamp: "2024-01-15T14:20:00Z",
      activity: "bid_increase",
      details: "Increased bids on fashion keywords by ~15%",
      affectedKeywords: ["fashion trends", "spring collection", "style guide"],
      estimatedImpact: "medium"
    }
  ],

  // Geographic performance heatmap data
  geoHeatmapData: [
    { state: "CA", lat: 36.7783, lng: -119.4179, spend: 345678.90, conversions: 8901, value: 0.85 },
    { state: "NY", lat: 40.7128, lng: -74.0060, spend: 289123.45, conversions: 7234, value: 0.72 },
    { state: "TX", lat: 31.9686, lng: -99.9018, spend: 234567.89, conversions: 5678, value: 0.58 },
    { state: "FL", lat: 27.7663, lng: -81.6868, spend: 198765.43, conversions: 4890, value: 0.49 },
    { state: "IL", lat: 40.6331, lng: -89.3985, spend: 156789.12, conversions: 3876, value: 0.39 }
  ],

  // Attribution model comparison (real-time)
  liveAttribution: {
    firstClick: { conversions: 89, revenue: 12456.78 },
    lastClick: { conversions: 134, revenue: 18789.23 },
    linear: { conversions: 112, revenue: 15623.45 },
    timeDecay: { conversions: 123, revenue: 17234.56 },
    positionBased: { conversions: 118, revenue: 16456.89 }
  },

  // Real-time audience insights
  liveAudiences: [
    {
      segment: "Tech Enthusiasts",
      activeUsers: 4567,
      conversionRate: 3.45,
      avgSessionValue: 67.89,
      topDevices: ["iPhone", "Samsung Galaxy", "MacBook"]
    },
    {
      segment: "Fashion Forward",
      activeUsers: 3456,
      conversionRate: 2.78,
      avgSessionValue: 45.67,
      topDevices: ["iPhone", "iPad", "Samsung Galaxy"]
    },
    {
      segment: "Business Professionals",
      activeUsers: 2345,
      conversionRate: 4.12,
      avgSessionValue: 89.23,
      topDevices: ["MacBook", "Surface Pro", "iPhone"]
    }
  ]
};

export default realTimeData;
