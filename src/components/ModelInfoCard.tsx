
// Info card on AI model statistics including XGBoost, Log Likelyhood, MSE, Mean distance, Accuracy, F1. Card should be expandabile, well formatted, and should have a selector for different models.


import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Select from '@/components/ui/Select';

const modelData = {
  'Model A': {
    XGBoost: 0.85,
    LogLikelihood: -0.32,
    MSE: 0.15,
    MeanDistance: 0.25,
    Accuracy: 0.92,
    F1: 0.88
  },
  'Model B': {
    XGBoost: 0.82,
    LogLikelihood: -0.35,
    MSE: 0.18,
    MeanDistance: 0.28,
    Accuracy: 0.90,
    F1: 0.86
  },
  'Model C': {
    XGBoost: 0.88,
    LogLikelihood: -0.30,
    MSE: 0.12,
    MeanDistance: 0.22,
    Accuracy: 0.94,
    F1: 0.91
  }
};

const AIModelStatsCard = () => {
  const [selectedModel, setSelectedModel] = useState('Model A');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderStatItem = (label: string, value: number) => (
    <div className="flex justify-between items-center py-2">
      <span className="font-base text-text dark:text-darkText">{label}:</span>
      <span className="font-bold text-text dark:text-darkText">{value.toFixed(2)}</span>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="border-border dark:border-darkBorder shadow-light dark:shadow-dark rounded-base border-2 bg-bg dark:bg-darkBg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-heading text-text dark:text-darkText">AI Model Statistics</h2>
          <Select
            items={Object.keys(modelData)}
            onChange={handleModelChange}
            value={selectedModel}
          />
        </div>

        {renderStatItem('XGBoost', modelData[selectedModel].XGBoost)}
        {renderStatItem('Log Likelihood', modelData[selectedModel].LogLikelihood)}
        {renderStatItem('MSE', modelData[selectedModel].MSE)}

        {isExpanded && (
          <>
            {renderStatItem('Mean Distance', modelData[selectedModel].MeanDistance)}
            {renderStatItem('Accuracy', modelData[selectedModel].Accuracy)}
            {renderStatItem('F1 Score', modelData[selectedModel].F1)}
          </>
        )}

        <button
          onClick={toggleExpand}
          className="mt-4 w-full flex items-center justify-center border-border dark:border-darkBorder dark:bg-secondaryBlack dark:text-darkText shadow-light dark:shadow-dark cursor-pointer rounded-base border-2 bg-white px-4 py-2 text-center text-sm font-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:text-base dark:hover:shadow-none"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2" />
              Show More
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AIModelStatsCard;
