export interface EventItem {
  id: number;
  image: string;
  date: Date;
  time: string;
  topic: string;
  message: string;
  venue: string;
}

export interface TabsTileCardProps {
  name: string;
  icon: string;
  buttonpress: () => void;
  selected: boolean;
}

export interface NavigationProps {
  navigation: (screen: string) => void;
}
