// Mock Data for Adtech Media Dashboard
// Comprehensive dataset including campaigns, metrics, analytics, and breakdowns

export const mockData = {
  // Dashboard Summary Metrics
  dashboardSummary: {
    totalSpend: 2847291.45,
    totalImpressions: 45672893,
    totalClicks: 891457,
    totalConversions: 23891,
    avgCPM: 12.47,
    avgCTR: 1.95,
    avgCPC: 3.19,
    conversionRate: 2.68,
    totalRevenue: 5694382.91,
    ROAS: 2.0,
    activeCampaigns: 34,
    pausedCampaigns: 12,
    lastUpdated: "2024-01-15T14:30:00Z"
  },

  // Individual Campaign Data
  campaigns: [
    {
      id: "camp_001",
      name: "Summer Electronics Sale 2024",
      advertiser: "TechMax Electronics",
      status: "active",
      objective: "conversions",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      budget: {
        total: 150000,
        daily: 2000,
        spent: 89234.56
      },
      platforms: ["facebook", "google", "amazon"],
      targeting: {
        demographics: {
          ageRange: "25-54",
          gender: "all",
          income: "middle_to_high"
        },
        geography: {
          countries: ["US", "CA", "UK"],
          regions: ["North America", "Europe"],
          cities: ["New York", "Los Angeles", "Toronto", "London"]
        },
        interests: ["Electronics", "Technology", "Gadgets", "Gaming"],
        behaviors: ["Online Shoppers", "Tech Early Adopters"]
      },
      creatives: [
        {
          id: "creative_001",
          name: "Electronics Hero Banner",
          type: "display",
          format: "banner",
          size: "728x90",
          ctr: 2.34,
          impressions: 234567,
          clicks: 5489
        },
        {
          id: "creative_002",
          name: "Video Product Demo",
          type: "video",
          format: "mp4",
          duration: 30,
          ctr: 3.12,
          impressions: 456789,
          clicks: 14251
        }
      ],
      metrics: {
        impressions: 2345678,
        clicks: 45678,
        conversions: 1234,
        spend: 89234.56,
        revenue: 185673.45,
        cpm: 38.04,
        cpc: 1.95,
        ctr: 1.95,
        conversionRate: 2.70,
        roas: 2.08,
        reach: 1876543,
        frequency: 1.25
      },
      dailyStats: [
        { date: "2024-01-01", impressions: 45678, clicks: 891, spend: 1789.23, conversions: 23 },
        { date: "2024-01-02", impressions: 52341, clicks: 1024, spend: 2012.45, conversions: 28 },
        { date: "2024-01-03", impressions: 48932, clicks: 956, spend: 1856.78, conversions: 25 },
        { date: "2024-01-04", impressions: 51267, clicks: 998, spend: 1943.21, conversions: 27 },
        { date: "2024-01-05", impressions: 49845, clicks: 972, spend: 1889.65, conversions: 26 }
      ]
    },
    {
      id: "camp_002",
      name: "Fashion Forward Spring Collection",
      advertiser: "StyleHub Fashion",
      status: "active",
      objective: "brand_awareness",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      budget: {
        total: 200000,
        daily: 2500,
        spent: 67891.34
      },
      platforms: ["instagram", "pinterest", "tiktok"],
      targeting: {
        demographics: {
          ageRange: "18-35",
          gender: "female",
          income: "middle"
        },
        geography: {
          countries: ["US", "CA", "AU"],
          regions: ["North America", "Oceania"],
          cities: ["New York", "Los Angeles", "Sydney", "Vancouver"]
        },
        interests: ["Fashion", "Style", "Shopping", "Lifestyle"],
        behaviors: ["Fashion Enthusiasts", "Brand Conscious"]
      },
      creatives: [
        {
          id: "creative_003",
          name: "Spring Collection Carousel",
          type: "carousel",
          format: "image",
          size: "1080x1080",
          ctr: 2.89,
          impressions: 345678,
          clicks: 9987
        },
        {
          id: "creative_004",
          name: "Fashion Video Story",
          type: "video",
          format: "vertical",
          duration: 15,
          ctr: 4.23,
          impressions: 567890,
          clicks: 24018
        }
      ],
      metrics: {
        impressions: 3456789,
        clicks: 67891,
        conversions: 891,
        spend: 67891.34,
        revenue: 123456.78,
        cpm: 19.64,
        cpc: 1.00,
        ctr: 1.96,
        conversionRate: 1.31,
        roas: 1.82,
        reach: 2789456,
        frequency: 1.24
      },
      dailyStats: [
        { date: "2024-01-15", impressions: 67891, clicks: 1334, spend: 1334.23, conversions: 18 },
        { date: "2024-01-16", impressions: 72145, clicks: 1415, spend: 1415.67, conversions: 19 },
        { date: "2024-01-17", impressions: 69823, clicks: 1369, spend: 1369.45, conversions: 17 },
        { date: "2024-01-18", impressions: 71456, clicks: 1402, spend: 1402.89, conversions: 20 },
        { date: "2024-01-19", impressions: 68934, clicks: 1352, spend: 1352.12, conversions: 16 }
      ]
    },
    {
      id: "camp_003",
      name: "B2B Software Solutions",
      advertiser: "CloudTech Solutions",
      status: "active",
      objective: "lead_generation",
      startDate: "2023-12-01",
      endDate: "2024-02-29",
      budget: {
        total: 75000,
        daily: 1200,
        spent: 45678.90
      },
      platforms: ["linkedin", "google"],
      targeting: {
        demographics: {
          ageRange: "28-65",
          gender: "all",
          income: "high",
          jobTitles: ["CTO", "IT Director", "Software Engineer", "DevOps"]
        },
        geography: {
          countries: ["US", "UK", "DE", "FR"],
          regions: ["North America", "Europe"],
          cities: ["San Francisco", "New York", "London", "Berlin"]
        },
        interests: ["Software Development", "Cloud Computing", "DevOps", "Enterprise Solutions"],
        behaviors: ["B2B Decision Makers", "Tech Professionals"]
      },
      creatives: [
        {
          id: "creative_005",
          name: "Software Demo CTA",
          type: "display",
          format: "sponsored_content",
          size: "1200x628",
          ctr: 1.45,
          impressions: 123456,
          clicks: 1790
        },
        {
          id: "creative_006",
          name: "Product Explainer Video",
          type: "video",
          format: "landscape",
          duration: 60,
          ctr: 2.78,
          impressions: 234567,
          clicks: 6521
        }
      ],
      metrics: {
        impressions: 1234567,
        clicks: 18901,
        conversions: 567,
        spend: 45678.90,
        revenue: 156789.45,
        cpm: 37.01,
        cpc: 2.42,
        ctr: 1.53,
        conversionRate: 3.00,
        roas: 3.43,
        reach: 987654,
        frequency: 1.25
      },
      dailyStats: [
        { date: "2024-01-10", impressions: 23456, clicks: 359, spend: 867.23, conversions: 11 },
        { date: "2024-01-11", impressions: 25123, clicks: 384, spend: 927.45, conversions: 12 },
        { date: "2024-01-12", impressions: 24789, clicks: 379, spend: 915.67, conversions: 10 },
        { date: "2024-01-13", impressions: 26034, clicks: 398, spend: 962.89, conversions: 13 },
        { date: "2024-01-14", impressions: 24567, clicks: 376, spend: 908.12, conversions: 9 }
      ]
    },
    {
      id: "camp_004",
      name: "Mobile Gaming App Install",
      advertiser: "GameForge Studios",
      status: "paused",
      objective: "app_installs",
      startDate: "2024-01-05",
      endDate: "2024-02-05",
      budget: {
        total: 100000,
        daily: 3000,
        spent: 23456.78
      },
      platforms: ["facebook", "google", "unity"],
      targeting: {
        demographics: {
          ageRange: "16-35",
          gender: "all",
          income: "all"
        },
        geography: {
          countries: ["US", "UK", "DE", "JP", "KR"],
          regions: ["North America", "Europe", "Asia"],
          cities: ["Los Angeles", "London", "Berlin", "Tokyo", "Seoul"]
        },
        interests: ["Mobile Gaming", "Casual Games", "Strategy Games", "RPG"],
        behaviors: ["Mobile Gamers", "In-App Purchasers"]
      },
      creatives: [
        {
          id: "creative_007",
          name: "Gameplay Footage",
          type: "video",
          format: "square",
          duration: 15,
          ctr: 3.45,
          impressions: 456789,
          clicks: 15759
        },
        {
          id: "creative_008",
          name: "Character Showcase",
          type: "playable",
          format: "interactive",
          size: "320x480",
          ctr: 5.67,
          impressions: 234567,
          clicks: 13302
        }
      ],
      metrics: {
        impressions: 2345678,
        clicks: 89012,
        conversions: 4567,
        spend: 23456.78,
        revenue: 45678.90,
        cpm: 10.00,
        cpc: 0.26,
        ctr: 3.79,
        conversionRate: 5.13,
        roas: 1.95,
        reach: 1876543,
        frequency: 1.25
      },
      dailyStats: [
        { date: "2024-01-05", impressions: 123456, clicks: 4681, spend: 1234.56, conversions: 240 },
        { date: "2024-01-06", impressions: 134567, clicks: 5099, spend: 1345.67, conversions: 262 },
        { date: "2024-01-07", impressions: 128934, clicks: 4887, spend: 1289.34, conversions: 251 },
        { date: "2024-01-08", impressions: 131245, clicks: 4975, spend: 1312.45, conversions: 256 },
        { date: "2024-01-09", impressions: 129876, clicks: 4925, spend: 1298.76, conversions: 254 }
      ]
    },
    {
      id: "camp_005",
      name: "Local Restaurant Promotion",
      advertiser: "Bella Vista Restaurant",
      status: "active",
      objective: "store_visits",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      budget: {
        total: 25000,
        daily: 400,
        spent: 8934.56
      },
      platforms: ["facebook", "google"],
      targeting: {
        demographics: {
          ageRange: "25-55",
          gender: "all",
          income: "middle"
        },
        geography: {
          countries: ["US"],
          regions: ["California"],
          cities: ["San Francisco"],
          radius: "10 miles"
        },
        interests: ["Dining", "Italian Food", "Fine Dining", "Date Night"],
        behaviors: ["Frequent Restaurant Goers", "Foodies"]
      },
      creatives: [
        {
          id: "creative_009",
          name: "Signature Dish Photo",
          type: "image",
          format: "square",
          size: "1080x1080",
          ctr: 2.12,
          impressions: 45678,
          clicks: 968
        },
        {
          id: "creative_010",
          name: "Chef's Special Video",
          type: "video",
          format: "vertical",
          duration: 30,
          ctr: 3.89,
          impressions: 67890,
          clicks: 2641
        }
      ],
      metrics: {
        impressions: 345678,
        clicks: 7890,
        conversions: 234,
        spend: 8934.56,
        revenue: 18769.12,
        cpm: 25.85,
        cpc: 1.13,
        ctr: 2.28,
        conversionRate: 2.97,
        roas: 2.10,
        reach: 234567,
        frequency: 1.47
      },
      dailyStats: [
        { date: "2024-01-20", impressions: 12345, clicks: 282, spend: 318.23, conversions: 8 },
        { date: "2024-01-21", impressions: 13456, clicks: 307, spend: 346.67, conversions: 9 },
        { date: "2024-01-22", impressions: 12789, clicks: 292, spend: 329.45, conversions: 7 },
        { date: "2024-01-23", impressions: 13234, clicks: 302, spend: 341.89, conversions: 10 },
        { date: "2024-01-24", impressions: 12567, clicks: 287, spend: 323.12, conversions: 8 }
      ]
    }
  ],

  // Platform Performance Breakdown
  platformBreakdown: [
    {
      platform: "facebook",
      spend: 1234567.89,
      impressions: 23456789,
      clicks: 456789,
      conversions: 12345,
      cpm: 52.64,
      cpc: 2.70,
      ctr: 1.95,
      conversionRate: 2.70,
      roas: 2.15
    },
    {
      platform: "google",
      spend: 987654.32,
      impressions: 15678901,
      clicks: 234567,
      conversions: 8901,
      cpm: 62.98,
      cpc: 4.21,
      ctr: 1.50,
      conversionRate: 3.79,
      roas: 2.45
    },
    {
      platform: "instagram",
      spend: 456789.12,
      impressions: 8901234,
      clicks: 178902,
      conversions: 3456,
      cpm: 51.30,
      cpc: 2.55,
      ctr: 2.01,
      conversionRate: 1.93,
      roas: 1.85
    },
    {
      platform: "linkedin",
      spend: 123456.78,
      impressions: 2345678,
      clicks: 45678,
      conversions: 1234,
      cpm: 52.63,
      cpc: 2.70,
      ctr: 1.95,
      conversionRate: 2.70,
      roas: 3.20
    },
    {
      platform: "tiktok",
      spend: 345678.90,
      impressions: 6789012,
      clicks: 234567,
      conversions: 4567,
      cpm: 50.93,
      cpc: 1.47,
      ctr: 3.46,
      conversionRate: 1.95,
      roas: 1.95
    }
  ],

  // Device Performance Breakdown
  deviceBreakdown: [
    {
      device: "mobile",
      spend: 1789234.56,
      impressions: 34567890,
      clicks: 678901,
      conversions: 15678,
      percentage: 62.8,
      cpm: 51.76,
      cpc: 2.64,
      ctr: 1.96,
      conversionRate: 2.31
    },
    {
      device: "desktop",
      spend: 789123.45,
      impressions: 12345678,
      clicks: 234567,
      conversions: 6789,
      percentage: 27.7,
      cpm: 63.93,
      cpc: 3.36,
      ctr: 1.90,
      conversionRate: 2.89
    },
    {
      device: "tablet",
      spend: 268933.44,
      impressions: 4567890,
      clicks: 89012,
      conversions: 1424,
      percentage: 9.5,
      cpm: 58.85,
      cpc: 3.02,
      ctr: 1.95,
      conversionRate: 1.60
    }
  ],

  // Geographic Performance Breakdown
  geographicBreakdown: [
    {
      country: "United States",
      region: "North America",
      spend: 1456789.12,
      impressions: 28901234,
      clicks: 567890,
      conversions: 14567,
      cpm: 50.42,
      cpc: 2.56,
      ctr: 1.96,
      conversionRate: 2.56,
      roas: 2.25
    },
    {
      country: "United Kingdom",
      region: "Europe",
      spend: 456789.12,
      impressions: 8901234,
      clicks: 178902,
      conversions: 4567,
      cpm: 51.30,
      cpc: 2.55,
      ctr: 2.01,
      conversionRate: 2.55,
      roas: 2.10
    },
    {
      country: "Canada",
      region: "North America",
      spend: 234567.89,
      impressions: 4567890,
      clicks: 89012,
      conversions: 2234,
      cpm: 51.36,
      cpc: 2.64,
      ctr: 1.95,
      conversionRate: 2.51,
      roas: 2.15
    },
    {
      country: "Germany",
      region: "Europe",
      spend: 345678.90,
      impressions: 6789012,
      clicks: 134567,
      conversions: 3456,
      cpm: 50.93,
      cpc: 2.57,
      ctr: 1.98,
      conversionRate: 2.57,
      roas: 2.05
    },
    {
      country: "Australia",
      region: "Oceania",
      spend: 123456.78,
      impressions: 2345678,
      clicks: 45678,
      conversions: 1123,
      cpm: 52.63,
      cpc: 2.70,
      ctr: 1.95,
      conversionRate: 2.46,
      roas: 1.95
    }
  ],

  // Age Group Performance
  ageGroupBreakdown: [
    {
      ageGroup: "18-24",
      spend: 456789.12,
      impressions: 9876543,
      clicks: 234567,
      conversions: 4567,
      percentage: 16.0,
      cpm: 46.24,
      cpc: 1.95,
      ctr: 2.37,
      conversionRate: 1.95
    },
    {
      ageGroup: "25-34",
      spend: 789123.45,
      impressions: 15678901,
      clicks: 345678,
      conversions: 8901,
      percentage: 27.7,
      cpm: 50.36,
      cpc: 2.28,
      ctr: 2.20,
      conversionRate: 2.57
    },
    {
      ageGroup: "35-44",
      spend: 612345.67,
      impressions: 11234567,
      clicks: 234567,
      conversions: 6789,
      percentage: 21.5,
      cpm: 54.51,
      cpc: 2.61,
      ctr: 2.09,
      conversionRate: 2.89
    },
    {
      ageGroup: "45-54",
      spend: 534567.89,
      impressions: 8901234,
      clicks: 178901,
      conversions: 5234,
      percentage: 18.8,
      cpm: 60.05,
      cpc: 2.99,
      ctr: 2.01,
      conversionRate: 2.92
    },
    {
      ageGroup: "55-64",
      spend: 345678.90,
      impressions: 5678901,
      clicks: 112345,
      conversions: 2890,
      percentage: 12.1,
      cpm: 60.85,
      cpc: 3.08,
      ctr: 1.98,
      conversionRate: 2.57
    },
    {
      ageGroup: "65+",
      spend: 108786.42,
      impressions: 2345678,
      clicks: 44567,
      conversions: 1510,
      percentage: 3.9,
      cpm: 46.39,
      cpc: 2.44,
      ctr: 1.90,
      conversionRate: 3.39
    }
  ],

  // Time-series Analytics Data (Daily performance over 30 days)
  timeSeriesData: [
    { date: "2024-01-01", spend: 89234.56, impressions: 1876543, clicks: 34567, conversions: 891, revenue: 156789.23 },
    { date: "2024-01-02", spend: 92456.78, impressions: 1943210, clicks: 36789, conversions: 923, revenue: 162345.67 },
    { date: "2024-01-03", spend: 87123.45, impressions: 1823456, clicks: 33456, conversions: 867, revenue: 152123.45 },
    { date: "2024-01-04", spend: 94567.89, impressions: 1976543, clicks: 37890, conversions: 945, revenue: 165432.10 },
    { date: "2024-01-05", spend: 91234.56, impressions: 1912345, clicks: 35678, conversions: 912, revenue: 159876.54 },
    { date: "2024-01-06", spend: 88765.43, impressions: 1854321, clicks: 34123, conversions: 888, revenue: 155432.10 },
    { date: "2024-01-07", spend: 93456.78, impressions: 1965432, clicks: 37234, conversions: 934, revenue: 163987.65 },
    { date: "2024-01-08", spend: 90123.45, impressions: 1890123, clicks: 35234, conversions: 901, revenue: 158123.45 },
    { date: "2024-01-09", spend: 95678.90, impressions: 2009876, clicks: 38567, conversions: 957, revenue: 167890.12 },
    { date: "2024-01-10", spend: 89876.54, impressions: 1876543, clicks: 34678, conversions: 899, revenue: 157654.32 },
    { date: "2024-01-11", spend: 92345.67, impressions: 1934567, clicks: 36456, conversions: 923, revenue: 161987.65 },
    { date: "2024-01-12", spend: 87654.32, impressions: 1834567, clicks: 33567, conversions: 876, revenue: 153456.78 },
    { date: "2024-01-13", spend: 94123.45, impressions: 1967890, clicks: 37456, conversions: 941, revenue: 164789.01 },
    { date: "2024-01-14", spend: 90987.65, impressions: 1898765, clicks: 35456, conversions: 910, revenue: 159123.45 },
    { date: "2024-01-15", spend: 96234.56, impressions: 2012345, clicks: 38789, conversions: 962, revenue: 168456.78 }
  ],

  // Audience Segments
  audienceSegments: [
    {
      id: "segment_001",
      name: "Tech Enthusiasts",
      size: 2345678,
      description: "Users interested in technology and gadgets",
      demographics: {
        ageRange: "25-45",
        gender: "male-leaning",
        income: "high"
      },
      performance: {
        ctr: 2.45,
        conversionRate: 3.12,
        avgOrderValue: 245.67,
        cpm: 45.23
      }
    },
    {
      id: "segment_002", 
      name: "Fashion Forward",
      size: 1876543,
      description: "Style-conscious users who follow fashion trends",
      demographics: {
        ageRange: "18-35",
        gender: "female-leaning",
        income: "middle-to-high"
      },
      performance: {
        ctr: 3.78,
        conversionRate: 2.45,
        avgOrderValue: 156.89,
        cpm: 38.90
      }
    },
    {
      id: "segment_003",
      name: "Business Professionals",
      size: 987654,
      description: "Working professionals and decision makers",
      demographics: {
        ageRange: "28-55",
        gender: "balanced",
        income: "high"
      },
      performance: {
        ctr: 1.89,
        conversionRate: 4.56,
        avgOrderValue: 456.78,
        cpm: 67.34
      }
    }
  ],

  // Campaign Performance Trends (Weekly data)
  weeklyTrends: [
    { week: "2024-W01", spend: 623456.78, impressions: 13245678, clicks: 245678, conversions: 6234, ctr: 1.85, cpm: 47.12 },
    { week: "2024-W02", spend: 634567.89, impressions: 13456789, clicks: 256789, conversions: 6456, ctr: 1.91, cpm: 47.15 },
    { week: "2024-W03", spend: 645678.90, impressions: 13567890, clicks: 267890, conversions: 6678, ctr: 1.97, cpm: 47.59 }
  ],

  // Top Performing Creatives
  topCreatives: [
    {
      id: "creative_002",
      name: "Video Product Demo",
      type: "video",
      campaignName: "Summer Electronics Sale 2024",
      impressions: 456789,
      clicks: 14251,
      conversions: 567,
      ctr: 3.12,
      conversionRate: 3.98,
      spend: 12345.67
    },
    {
      id: "creative_008",
      name: "Character Showcase",
      type: "playable",
      campaignName: "Mobile Gaming App Install",
      impressions: 234567,
      clicks: 13302,
      conversions: 789,
      ctr: 5.67,
      conversionRate: 5.93,
      spend: 8901.23
    },
    {
      id: "creative_004",
      name: "Fashion Video Story",
      type: "video",
      campaignName: "Fashion Forward Spring Collection",
      impressions: 567890,
      clicks: 24018,
      conversions: 456,
      ctr: 4.23,
      conversionRate: 1.90,
      spend: 15678.90
    }
  ],

  // Competitive Intelligence (Mock data)
  competitorData: [
    {
      competitor: "TechRival Corp",
      estimatedSpend: 1500000,
      adVolume: 245,
      topPlatforms: ["google", "facebook"],
      avgCTR: 1.85,
      shareOfVoice: 0.23
    },
    {
      competitor: "StyleCompetitor Inc",
      estimatedSpend: 890000,
      adVolume: 189,
      topPlatforms: ["instagram", "pinterest"],
      avgCTR: 2.34,
      shareOfVoice: 0.15
    }
  ],

  // Attribution Data
  attributionData: {
    firstClick: { conversions: 8234, revenue: 1234567.89 },
    lastClick: { conversions: 12456, revenue: 1876543.21 },
    linear: { conversions: 10345, revenue: 1555555.55 },
    timeDecay: { conversions: 11234, revenue: 1678901.23 },
    positionBased: { conversions: 10789, revenue: 1612345.67 }
  },

  // Frequency Analysis
  frequencyData: [
    { frequency: 1, users: 1234567, conversions: 4567, conversionRate: 0.37 },
    { frequency: 2, users: 789123, conversions: 3456, conversionRate: 0.44 },
    { frequency: 3, users: 456789, conversions: 2890, conversionRate: 0.63 },
    { frequency: 4, users: 234567, conversions: 2123, conversionRate: 0.90 },
    { frequency: 5, users: 123456, conversions: 1567, conversionRate: 1.27 },
    { frequency: "6+", users: 89012, conversions: 1234, conversionRate: 1.39 }
  ]
};

export default mockData;
