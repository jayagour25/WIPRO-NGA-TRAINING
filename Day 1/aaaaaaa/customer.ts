interface Customer {
  id: number;
  name: string;
  email: string;
  ticketType: TicketType;
}

enum TicketType {
  REGULAR = "Regular",
  VIP = "VIP",
  VVIP = "VVIP"
}

// Decorator for validation
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(Called ${propertyKey} with, args);
    return original.apply(this, args);
  };
}

class CustomerRegistration {
  private customers: Customer[] = [];

  @Log
  register(name: string, email: string, ticketType: TicketType): void {
    const newCustomer: Customer = {
      id: this.customers.length + 1,
      name,
      email,
      ticketType
    };
    this.customers.push(newCustomer);
    console.log("Customer Registered:", newCustomer);
  }

  listAll(): void {
    for (const customer of this.customers) {
      console.log(${customer.name} - ${customer.ticketType});
    }
  }
}

// Example usage
const reg = new CustomerRegistration();
reg.register("Alice", "alice@example.com", TicketType.VIP);
reg.register("Bob", "bob@example.com", TicketType.REGULAR);
reg.listAll();