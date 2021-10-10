export interface StageOption {
  number: number;
  title: string;
  handler: (user: string) => void;
}
