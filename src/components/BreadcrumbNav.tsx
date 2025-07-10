
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path?: string;
  current?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items, 
  onNavigate, 
  className = "" 
}) => {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate?.('/')}
        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          
          {item.current ? (
            <span 
              className="text-gray-900 font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => item.path && onNavigate?.(item.path)}
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              disabled={!item.path}
            >
              {item.label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
