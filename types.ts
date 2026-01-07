export interface GuestData {
  family: string;
  passes: number;
}

export interface TimelineEvent {
  time: string;
  title: string;
  icon: 'church' | 'toast' | 'dinner' | 'party';
}

export enum ThemeColors {
  Burgundy = '#800020',
  Gold = '#D4AF37',
  Cream = '#FDFBF7',
}