export interface Item {
  name: string;
  price: number;
}

interface Shop {
   stock: Array<Item>;
}
