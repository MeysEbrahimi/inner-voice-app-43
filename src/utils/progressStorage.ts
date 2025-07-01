
interface UserProgress {
  tool: string;
  stepIndex: number;
  data?: any;
  timestamp: number;
}

const STORAGE_KEY = 'innervoice_user_progress';

export const saveProgress = (tool: string, stepIndex: number, data?: any): void => {
  try {
    const progress: UserProgress = {
      tool,
      stepIndex,
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    console.log('Progress saved:', progress);
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): UserProgress | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('No stored progress found');
      return null;
    }
    
    const progress: UserProgress = JSON.parse(stored);
    console.log('Progress loaded:', progress);
    
    // Check if progress is older than 7 days
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    if (progress.timestamp < weekAgo) {
      console.log('Progress expired, clearing...');
      clearProgress();
      return null;
    }
    
    return progress;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Progress cleared');
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};

export const hasProgress = (): boolean => {
  const progress = loadProgress();
  const hasValidProgress = progress !== null;
  console.log('Has progress:', hasValidProgress);
  return hasValidProgress;
};
