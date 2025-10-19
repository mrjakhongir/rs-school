interface Additive {
  name: string;
  "add-price": string;
}

interface Sizes {
  s: Size;
  m: Size;
  l: Size;
}

interface Size {
  size: string;
  "add-price": string;
}

export interface Product {
  name: string;
  description: string;
  img: string;
  price: string;
  category: string;
  sizes: Sizes;
  additives: Additive[];
}
