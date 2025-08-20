// Advanced Campaign Analytics Data
// Detailed funnel analysis, cohort data, and advanced metrics

export const campaignAnalytics = {
  // Conversion Funnel Data
  conversionFunnel: {
    "camp_001": {
      campaignName: "Summer Electronics Sale 2024",
      funnel: [
        { stage: "Impressions", value: 2345678, percentage: 100.0 },
        { stage: "Clicks", value: 45678, percentage: 1.95 },
        { stage: "Landing Page Views", value: 42345, percentage: 1.80 },
        { stage: "Product Views", value: 38901, percentage: 1.66 },
        { stage: "Add to Cart", value: 12345, percentage: 0.53 },
        { stage: "Checkout Started", value: 8901, percentage: 0.38 },
        { stage: "Purchases", value: 1234, percentage: 0.05 }
      ],
      dropOffRates: [
        { stage: "Click to Landing", dropOff: 7.3 },
        { stage: "Landing to Product", dropOff: 8.1 },
        { stage: "Product to Cart", dropOff: 68.3 },
        { stage: "Cart to Checkout", dropOff: 27.9 },
        { stage: "Checkout to Purchase", dropOff: 86.1 }
      ]
    },
    "camp_002": {
      campaignName: "Fashion Forward Spring Collection",
      funnel: [
        { stage: "Impressions", value: 3456789, percentage: 100.0 },
        { stage: "Clicks", value: 67891, percentage: 1.96 },
        { stage: "Landing Page Views", value: 64234, percentage: 1.86 },
        { stage: "Product Views", value: 58902, percentage: 1.70 },
        { stage: "Add to Cart", value: 15678, percentage: 0.45 },
        { stage: "Checkout Started", value: 4567, percentage: 0.13 },
        { stage: "Purchases", value: 891, percentage: 0.03 }
      ],
      dropOffRates: [
        { stage: "Click to Landing", dropOff: 5.4 },
        { stage: "Landing to Product", dropOff: 8.3 },
        { stage: "Product to Cart", dropOff: 73.4 },
        { stage: "Cart to Checkout", dropOff: 70.9 },
        { stage: "Checkout to Purchase", dropOff: 80.5 }
      ]
    }
  },

  // Cohort Analysis
  cohortAnalysis: {
    "2024-01": {
      cohortSize: 12345,
      retentionRates: {
        day1: 0.85,
        day7: 0.42,
        day14: 0.28,
        day30: 0.18,
        day60: 0.12,
        day90: 0.08
      },
      revenuePerUser: {
        day1: 15.67,
        day7: 28.45,
        day14: 34.12,
        day30: 42.89,
        day60: 48.56,
        day90: 52.34
      }
    },
    "2024-02": {
      cohortSize: 15678,
      retentionRates: {
        day1: 0.87,
        day7: 0.45,
        day14: 0.31,
        day30: 0.21,
        day60: 0.14,
        day90: 0.10
      },
      revenuePerUser: {
        day1: 16.89,
        day7: 30.12,
        day14: 36.78,
        day30: 45.23,
        day60: 51.45,
        day90: 55.67
      }
    }
  },

  // Customer Journey Analysis
  customerJourney: {
    touchpoints: [
      {
        touchpoint: "Awareness",
        channels: ["Display Ads", "Social Media", "Video Ads"],
        interactions: 2345678,
        cost: 456789.12,
        influence: 0.15
      },
      {
        touchpoint: "Consideration",
        channels: ["Search Ads", "Retargeting", "Email"],
        interactions: 789123,
        cost: 234567.89,
        influence: 0.35
      },
      {
        touchpoint: "Purchase",
        channels: ["Search Ads", "Direct", "Retargeting"],
        interactions: 123456,
        cost: 89123.45,
        influence: 0.50
      }
    ],
    pathAnalysis: [
      {
        path: "Display → Search → Direct",
        frequency: 4567,
        conversionRate: 3.45,
        avgTimeToConversion: "7.2 days",
        revenue: 234567.89
      },
      {
        path: "Social → Email → Search",
        frequency: 3456,
        conversionRate: 2.89,
        avgTimeToConversion: "5.8 days",
        revenue: 178901.23
      },
      {
        path: "Video → Retargeting → Direct",
        frequency: 2345,
        conversionRate: 4.12,
        avgTimeToConversion: "3.4 days",
        revenue: 156789.45
      }
    ]
  },

  // A/B Test Results
  abTestResults: [
    {
      testId: "test_001",
      testName: "CTA Button Color",
      campaign: "camp_001",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      status: "completed",
      variants: [
        {
          variant: "Control (Blue)",
          traffic: 50,
          impressions: 123456,
          clicks: 2345,
          conversions: 89,
          ctr: 1.90,
          conversionRate: 3.79,
          confidence: 95
        },
        {
          variant: "Test (Red)",
          traffic: 50,
          impressions: 123789,
          clicks: 2567,
          conversions: 103,
          ctr: 2.07,
          conversionRate: 4.01,
          confidence: 98
        }
      ],
      winner: "Test (Red)",
      improvement: 8.95
    },
    {
      testId: "test_002",
      testName: "Ad Copy Variation",
      campaign: "camp_002",
      startDate: "2024-01-10",
      endDate: "2024-01-24",
      status: "completed",
      variants: [
        {
          variant: "Control (Standard)",
          traffic: 50,
          impressions: 234567,
          clicks: 4567,
          conversions: 123,
          ctr: 1.95,
          conversionRate: 2.69,
          confidence: 92
        },
        {
          variant: "Test (Emotional)",
          traffic: 50,
          impressions: 235123,
          clicks: 5123,
          conversions: 156,
          ctr: 2.18,
          conversionRate: 3.04,
          confidence: 96
        }
      ],
      winner: "Test (Emotional)",
      improvement: 13.01
    }
  ],

  // Bid Strategy Performance
  bidStrategyPerformance: [
    {
      strategy: "Manual CPC",
      campaigns: 12,
      spend: 456789.12,
      impressions: 8901234,
      clicks: 178901,
      conversions: 4567,
      avgCPC: 2.55,
      conversionRate: 2.55,
      roas: 2.34
    },
    {
      strategy: "Enhanced CPC",
      campaigns: 8,
      spend: 345678.90,
      impressions: 6789012,
      clicks: 134567,
      conversions: 3890,
      avgCPC: 2.57,
      conversionRate: 2.89,
      roas: 2.67
    },
    {
      strategy: "Target CPA",
      campaigns: 9,
      spend: 567890.12,
      impressions: 11234567,
      clicks: 223456,
      conversions: 6789,
      avgCPC: 2.54,
      conversionRate: 3.04,
      roas: 2.89
    },
    {
      strategy: "Target ROAS",
      campaigns: 5,
      spend: 234567.89,
      impressions: 4567890,
      clicks: 89012,
      conversions: 2456,
      avgCPC: 2.64,
      conversionRate: 2.76,
      roas: 3.12
    }
  ],

  // Quality Score Analysis
  qualityScoreData: [
    {
      campaign: "camp_001",
      campaignName: "Summer Electronics Sale 2024",
      keywords: [
        {
          keyword: "electronics sale",
          qualityScore: 8,
          expectedCTR: "Above average",
          adRelevance: "Above average",
          landingPageExperience: "Good",
          impressions: 45678,
          clicks: 891,
          ctr: 1.95
        },
        {
          keyword: "tech deals",
          qualityScore: 6,
          expectedCTR: "Average",
          adRelevance: "Above average",
          landingPageExperience: "Average",
          impressions: 23456,
          clicks: 423,
          ctr: 1.80
        }
      ]
    }
  ],

  // Seasonal Trends
  seasonalTrends: {
    monthly: [
      { month: "January", spend: 2456789.12, conversionRate: 2.45, avgOrderValue: 123.45 },
      { month: "February", spend: 2234567.89, conversionRate: 2.67, avgOrderValue: 134.56 },
      { month: "March", spend: 2678901.23, conversionRate: 2.89, avgOrderValue: 145.67 },
      { month: "April", spend: 2890123.45, conversionRate: 3.12, avgOrderValue: 156.78 },
      { month: "May", spend: 3123456.78, conversionRate: 2.98, avgOrderValue: 167.89 },
      { month: "June", spend: 2987654.32, conversionRate: 2.76, avgOrderValue: 178.90 }
    ],
    dayOfWeek: [
      { day: "Monday", spend: 345678.90, ctr: 1.85, conversionRate: 2.34 },
      { day: "Tuesday", spend: 378901.23, ctr: 1.92, conversionRate: 2.45 },
      { day: "Wednesday", spend: 356789.12, ctr: 1.88, conversionRate: 2.41 },
      { day: "Thursday", spend: 389012.34, ctr: 1.95, conversionRate: 2.52 },
      { day: "Friday", spend: 401234.56, ctr: 2.01, conversionRate: 2.67 },
      { day: "Saturday", spend: 423456.78, ctr: 2.12, conversionRate: 2.89 },
      { day: "Sunday", spend: 398765.43, ctr: 2.05, conversionRate: 2.71 }
    ],
    hourly: [
      { hour: "00:00", spend: 12345.67, ctr: 1.23, conversionRate: 1.89 },
      { hour: "01:00", spend: 9876.54, ctr: 1.12, conversionRate: 1.67 },
      { hour: "02:00", spend: 8765.43, ctr: 1.05, conversionRate: 1.45 },
      { hour: "09:00", spend: 45678.90, ctr: 2.12, conversionRate: 2.89 },
      { hour: "12:00", spend: 56789.01, ctr: 2.34, conversionRate: 3.12 },
      { hour: "18:00", spend: 67890.12, ctr: 2.45, conversionRate: 3.23 },
      { hour: "21:00", spend: 54321.09, ctr: 2.23, conversionRate: 2.98 }
    ]
  }
};

export default campaignAnalytics;
