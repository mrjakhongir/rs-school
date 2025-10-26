interface Additive {
  name: string;
  price: string;
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

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  img: string;
  price: string;
  category: "coffee" | "tea" | "dessert";
  sizes: Sizes;
  additives: Additive[];
  discountPrice: string;
}
