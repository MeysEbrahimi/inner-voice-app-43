
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface EnhancedCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  onClick: () => void;
  height?: 'normal' | 'tall' | 'short';
  priority?: 'high' | 'medium' | 'low';
  className?: string;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  height = 'normal',
  priority = 'medium',
  className = ""
}) => {
  const heightClasses = {
    short: 'h-64',
    normal: 'h-80',
    tall: 'h-96'
  };

  const priorityClasses = {
    high: 'md:col-span-2 lg:col-span-2',
    medium: 'md:col-span-1 lg:col-span-1',
    low: 'md:col-span-1 lg:col-span-1'
  };

  const shadowClasses = {
    high: 'shadow-xl hover:shadow-2xl',
    medium: 'shadow-lg hover:shadow-xl',
    low: 'shadow-md hover:shadow-lg'
  };

  return (
    <Card 
      className={`
        ${heightClasses[height]} ${priorityClasses[priority]} ${shadowClasses[priority]}
        p-8 bg-white/90 backdrop-blur-sm border-0 
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        cursor-pointer group relative overflow-hidden
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        ${className}
      `}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Open ${title} tool`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient} 
        opacity-0 group-hover:opacity-5 transition-opacity duration-500
      `} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className={`
          inline-flex items-center justify-center w-16 h-16 
          bg-gradient-to-r ${gradient} rounded-2xl mb-6
          group-hover:scale-110 group-hover:rotate-3
          transition-transform duration-300 ease-out
          shadow-lg
        `}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors">
            {description}
          </p>
          
          {/* CTA Button */}
          <Button 
            className={`
              bg-gradient-to-r ${gradient} hover:opacity-90
              text-white border-0 self-start
              group-hover:shadow-lg transition-all duration-300
              transform group-hover:translate-x-1
            `}
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedCard;
