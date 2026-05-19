export interface NavLink {
  label: string;
  href: string;
}

export interface UnicornStudioWindow extends Window {
  UnicornStudio?: {
    isInitialized: boolean;
    init: () => void;
  };
}