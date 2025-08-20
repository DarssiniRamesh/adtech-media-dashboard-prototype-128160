import React from 'react';
import { formatCurrency, formatPercentage } from '../../data/dataUtils';

// PUBLIC_INTERFACE
function GeoChart({ data }) {
  // For this implementation, we'll show a table-based geographic breakdown
  // In a real implementation, you might use a map library like react-simple-maps
  
  return (
    <div className="space-y-4">
      {data.map((location, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-lg">{location.country}</h4>
              <p className="text-sm text-gray-500">{location.region}</p>
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-lg">
                {formatCurrency(location.spend)}
              </div>
              <div className="text-sm text-gray-500">Total Spend</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">CTR:</span>
              <span className="ml-2 font-mono font-medium">
                {formatPercentage(location.ctr / 100)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">CPC:</span>
              <span className="ml-2 font-mono font-medium">
                {formatCurrency(location.cpc)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Conv Rate:</span>
              <span className="ml-2 font-mono font-medium">
                {formatPercentage(location.conversionRate / 100)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">ROAS:</span>
              <span className="ml-2 font-mono font-medium">
                {location.roas.toFixed(2)}x
              </span>
            </div>
          </div>
          
          {/* Performance Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Performance Score</span>
              <span>{((location.roas / 3) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((location.roas / 3) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeoChart;
