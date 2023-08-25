export interface Stack {
  id: number;
  name: string;
  background_color: string;
  font_color: string;
  cards: {
    order: string;
    show_first: string;
  }
}
