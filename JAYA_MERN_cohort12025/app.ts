interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
}

// Decorator for logging actions
function LogAction(target: any, key: string, descriptor?: PropertyDescriptor): any {
  const original = descriptor?.value;
  if (!original) return;
  descriptor.value = function (...args: any[]) {
    console.log(`Action: ${key} called with`, args);
    return original.apply(this, args);
  };
}

class ProductManager {
  private products: IProduct[] = [];

  @LogAction
  addProduct(product: IProduct): void {
    this.products.push(product);
  }

  @LogAction
  getAllProducts(): IProduct[] {
    return this.products;
  }
}

const manager = new ProductManager();
manager.addProduct({ id: 101, name: "Mobile", price: 500, category: "Electronics" });
console.log(manager.getAllProducts());
