
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle } from 'lucide-react';

interface EnhancedCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  onClick: () => void;
  onTourClick?: () => void;
  className?: string;
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  gradient,
  onClick,
  onTourClick,
  className = ""
}) => {
  return (
    <Card 
      className={`
        h-80 p-8 bg-card/90 backdrop-blur-[var(--surface-blur)] border border-border/50
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]
        cursor-pointer group relative overflow-hidden
        focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2
        shadow-[var(--shadow-soft)] hover:bg-card/95
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
        opacity-0 group-hover:opacity-10 transition-opacity duration-500
      `} />
      
      {/* Tour button - only visible on hover */}
      {onTourClick && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onTourClick();
          }}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          aria-label={`Take ${title} tour`}
        >
          <HelpCircle className="w-4 h-4" />
        </Button>
      )}
      
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
          <h3 className="text-2xl font-bold text-card-foreground mb-2 group-hover:text-foreground transition-colors">
            {title}
          </h3>
          <p className="text-sm font-medium text-primary mb-4 uppercase tracking-wide">
            {subtitle}
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed flex-1 group-hover:text-card-foreground transition-colors">
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
