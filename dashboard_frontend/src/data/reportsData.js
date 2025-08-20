// Reports and Export Templates
// Predefined report templates and export configurations

export const reportsData = {
  // Available report templates
  reportTemplates: [
    {
      id: "daily_performance",
      name: "Daily Performance Report",
      description: "Comprehensive daily metrics across all campaigns",
      frequency: "daily",
      sections: ["summary", "campaigns", "platforms", "devices"],
      metrics: ["impressions", "clicks", "spend", "conversions", "ctr", "cpc", "roas"],
      filters: {
        dateRange: "yesterday",
        campaigns: "all",
        platforms: "all"
      }
    },
    {
      id: "weekly_summary",
      name: "Weekly Executive Summary",
      description: "High-level weekly performance overview for executives",
      frequency: "weekly",
      sections: ["kpis", "trends", "topCampaigns", "insights"],
      metrics: ["spend", "revenue", "roas", "conversions", "newUsers"],
      filters: {
        dateRange: "last_7_days",
        campaigns: "active",
        includeProjections: true
      }
    },
    {
      id: "campaign_deep_dive",
      name: "Campaign Deep Dive Analysis",
      description: "Detailed analysis of individual campaign performance",
      frequency: "on_demand",
      sections: ["overview", "demographics", "funnel", "creatives", "keywords"],
      metrics: ["all"],
      filters: {
        dateRange: "custom",
        campaigns: "selected",
        includeCompetitive: true
      }
    },
    {
      id: "platform_comparison",
      name: "Platform Performance Comparison",
      description: "Side-by-side comparison of platform performance",
      frequency: "weekly",
      sections: ["platformMetrics", "audienceOverlap", "costEfficiency"],
      metrics: ["spend", "impressions", "ctr", "cpc", "conversionRate", "roas"],
      filters: {
        dateRange: "last_30_days",
        platforms: "all",
        normalizeByCost: true
      }
    },
    {
      id: "attribution_analysis",
      name: "Attribution Model Analysis",
      description: "Multi-touch attribution analysis across customer journey",
      frequency: "monthly",
      sections: ["attributionComparison", "journeyPaths", "channelValue"],
      metrics: ["conversions", "revenue", "assistedConversions"],
      filters: {
        dateRange: "last_30_days",
        attributionWindow: "30_days",
        includeViewThrough: true
      }
    }
  ],

  // Sample generated reports
  generatedReports: [
    {
      id: "report_001",
      templateId: "daily_performance",
      name: "Daily Performance - January 15, 2024",
      generatedAt: "2024-01-15T09:00:00Z",
      dateRange: {
        start: "2024-01-14",
        end: "2024-01-14"
      },
      status: "completed",
      fileSize: "2.4 MB",
      formats: ["pdf", "xlsx", "csv"],
      summary: {
        totalSpend: 89234.56,
        totalImpressions: 1876543,
        totalClicks: 34567,
        totalConversions: 891,
        avgCTR: 1.84,
        avgCPC: 2.58,
        roas: 2.14
      }
    },
    {
      id: "report_002",
      templateId: "weekly_summary",
      name: "Executive Summary - Week 2, 2024",
      generatedAt: "2024-01-15T08:00:00Z",
      dateRange: {
        start: "2024-01-08",
        end: "2024-01-14"
      },
      status: "completed",
      fileSize: "1.8 MB",
      formats: ["pdf"],
      summary: {
        weeklySpend: 623456.78,
        weeklyRevenue: 1234567.89,
        weeklyConversions: 6234,
        growthRate: 12.5,
        topCampaign: "Summer Electronics Sale 2024"
      }
    },
    {
      id: "report_003",
      templateId: "campaign_deep_dive",
      name: "Deep Dive - Summer Electronics Sale 2024",
      generatedAt: "2024-01-15T07:30:00Z",
      dateRange: {
        start: "2024-01-01",
        end: "2024-01-14"
      },
      status: "processing",
      progress: 75,
      estimatedCompletion: "2024-01-15T15:45:00Z"
    }
  ],

  // Export configurations
  exportConfigs: {
    pdf: {
      format: "A4",
      orientation: "portrait",
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      },
      fontSize: 10,
      includeCharts: true,
      chartResolution: "high",
      branding: {
        logo: true,
        colors: true,
        footer: true
      }
    },
    excel: {
      sheets: ["Summary", "Campaigns", "Daily Data", "Raw Data"],
      includeCharts: true,
      formatting: {
        headerRow: true,
        alternatingRows: true,
        conditionalFormatting: true
      },
      pivotTables: false
    },
    csv: {
      delimiter: ",",
      encoding: "UTF-8",
      includeHeaders: true,
      dateFormat: "YYYY-MM-DD",
      numberFormat: "0.00"
    }
  },

  // Scheduled reports
  scheduledReports: [
    {
      id: "schedule_001",
      templateId: "daily_performance",
      name: "Daily Performance Auto-Report",
      schedule: {
        frequency: "daily",
        time: "09:00",
        timezone: "UTC",
        weekdays: [1, 2, 3, 4, 5] // Monday to Friday
      },
      recipients: [
        { email: "manager@company.com", format: "pdf" },
        { email: "analyst@company.com", format: "xlsx" }
      ],
      active: true,
      lastSent: "2024-01-15T09:00:00Z",
      nextSend: "2024-01-16T09:00:00Z"
    },
    {
      id: "schedule_002",
      templateId: "weekly_summary",
      name: "Weekly Executive Report",
      schedule: {
        frequency: "weekly",
        dayOfWeek: 1, // Monday
        time: "08:00",
        timezone: "UTC"
      },
      recipients: [
        { email: "ceo@company.com", format: "pdf" },
        { email: "cmo@company.com", format: "pdf" }
      ],
      active: true,
      lastSent: "2024-01-15T08:00:00Z",
      nextSend: "2024-01-22T08:00:00Z"
    }
  ],

  // Report insights and recommendations
  reportInsights: {
    "report_001": [
      {
        type: "opportunity",
        title: "Mobile Performance Gap",
        description: "Mobile CTR is 23% lower than desktop. Consider mobile-specific creative optimization.",
        priority: "high",
        estimatedImpact: "15% CTR improvement",
        recommendations: [
          "Create vertical video creatives for mobile",
          "Optimize landing pages for mobile experience",
          "Adjust bidding strategy for mobile devices"
        ]
      },
      {
        type: "alert",
        title: "Budget Pacing Issue",
        description: "Campaign 'B2B Software Solutions' is underspending by 18% daily.",
        priority: "medium",
        estimatedImpact: "Missing 500+ impressions daily",
        recommendations: [
          "Increase daily budget allocation",
          "Expand keyword targeting",
          "Review bid strategy settings"
        ]
      }
    ],
    "report_002": [
      {
        type: "success",
        title: "Strong Week-over-Week Growth",
        description: "ROAS improved by 12.5% compared to previous week across all campaigns.",
        priority: "info",
        keyFactors: [
          "Improved ad creative performance",
          "Better audience targeting",
          "Seasonal demand increase"
        ]
      }
    ]
  },

  // Custom report builder configuration
  customReportBuilder: {
    availableMetrics: [
      { id: "impressions", name: "Impressions", category: "volume" },
      { id: "clicks", name: "Clicks", category: "volume" },
      { id: "spend", name: "Spend", category: "cost" },
      { id: "conversions", name: "Conversions", category: "performance" },
      { id: "revenue", name: "Revenue", category: "performance" },
      { id: "ctr", name: "Click-Through Rate", category: "efficiency" },
      { id: "cpc", name: "Cost Per Click", category: "cost" },
      { id: "cpm", name: "Cost Per Mille", category: "cost" },
      { id: "cpa", name: "Cost Per Acquisition", category: "cost" },
      { id: "roas", name: "Return on Ad Spend", category: "performance" },
      { id: "conversionRate", name: "Conversion Rate", category: "efficiency" },
      { id: "reach", name: "Reach", category: "volume" },
      { id: "frequency", name: "Frequency", category: "volume" }
    ],
    availableDimensions: [
      { id: "campaign", name: "Campaign" },
      { id: "platform", name: "Platform" },
      { id: "device", name: "Device Type" },
      { id: "geography", name: "Geography" },
      { id: "ageGroup", name: "Age Group" },
      { id: "gender", name: "Gender" },
      { id: "creative", name: "Creative" },
      { id: "keyword", name: "Keyword" },
      { id: "date", name: "Date" },
      { id: "hour", name: "Hour of Day" },
      { id: "dayOfWeek", name: "Day of Week" }
    ],
    availableFilters: [
      { id: "dateRange", name: "Date Range", type: "dateRange" },
      { id: "campaigns", name: "Campaigns", type: "multiSelect" },
      { id: "platforms", name: "Platforms", type: "multiSelect" },
      { id: "status", name: "Campaign Status", type: "select" },
      { id: "spend", name: "Spend Range", type: "range" },
      { id: "conversions", name: "Min Conversions", type: "number" }
    ]
  }
};

export default reportsData;
