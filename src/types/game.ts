export interface GameProps {
  title: string;
  image: string;
  price: number;
  discount?: number;
}

export interface GameDateProps extends GameProps {
  date: Date;
}

export interface GamePublisherProps extends GameProps {
  publisher: string;
}
