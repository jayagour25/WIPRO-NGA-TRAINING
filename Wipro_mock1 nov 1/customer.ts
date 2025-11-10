// customer.ts
// Make sure tsconfig.json has "experimentalDecorators": true

enum Role {
  Guest = 'Guest',
  Regular = 'Regular',
  VIP = 'VIP'
}

type Address = [street: string, city: string, country: string, zip: string];

interface ICustomer {
  id: string;
  name: string;
  email: string;
  role: Role;
  address?: Address;
  createdAt: Date;
  fullName(): string;
}

// Simple class decorator (optional)
function LogClass(constructor: Function) {
  console.log(`[LogClass] ${constructor.name} loaded at ${new Date().toISOString()}`);
}

// Method decorator to validate email param (expects new email as first arg)
function ValidateEmail(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;
  descriptor.value = function (newEmail: string, ...args: any[]) {
    if (typeof newEmail !== 'string' || !/^\S+@\S+\.\S+$/.test(newEmail)) {
      throw new Error('Invalid email format provided to updateEmail.');
    }
    return original.apply(this, [newEmail, ...args]);
  };
  return descriptor;
}

@LogClass
class Customer implements ICustomer {
  id: string;
  name: string;
  email: string;
  role: Role;
  address?: Address;
  createdAt: Date;

  // Make constructor parameters optional with defaults so `new Customer()` works
  constructor(
    id: string = `c_${Date.now()}`,
    name: string = 'Anonymous',
    email: string = 'unknown@example.com',
    role: Role = Role.Guest,
    address?: Address
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.address = address;
    this.createdAt = new Date();
  }

  fullName() {
    return this.name;
  }

  @ValidateEmail
  updateEmail(newEmail: string) {
    this.email = newEmail;
    return true;
  }
}

class CustomerRepo {
  private customers: Customer[] = [];

  add(c: Customer) {
    this.customers.push(c);
  }
  getAll(): Customer[] {
    return this.customers.slice();
  }
  findByEmail(email: string) {
    return this.customers.find(x => x.email === email) || null;
  }
}

// expose for runtime testing when compiled to JS
declare global {
  interface Window { Customer: any; CustomerRepo: any; Role: any; }
}
if (typeof window !== 'undefined') {
  (window as any).Customer = Customer;
  (window as any).CustomerRepo = CustomerRepo;
  (window as any).Role = Role;
}

// ----------------- quick test -----------------
if (require.main === module) {
  // Only run when executed directly (node customer.js)
  try {
    const repo = new CustomerRepo();

    // Works without args because constructor has defaults
    const c1 = new Customer();
    console.log('Before update:', c1.email);

    // valid email update
    c1.updateEmail('jaya.gour@example.com');
    console.log('After update:', c1.email);

    repo.add(c1);
    console.log('Repo count:', repo.getAll().length);

    // invalid update (uncomment to test error)
    // c1.updateEmail('bad-email'); // this will throw

    console.log('✅ customer.ts test finished successfully');
  } catch (err) {
    console.error('❌ Test error:', (err as Error).message);
  }
}

export { Customer, CustomerRepo, Role };
