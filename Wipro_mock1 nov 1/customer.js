// compiled-ish customer.js (ES5 compatible) ; This is a compiled JS equivalent so there is no need to run the tsc.
(function(){
  var Role;
  (function (Role) {
      Role["Guest"] = "Guest";
      Role["Regular"] = "Regular";
      Role["VIP"] = "VIP";
  })(Role || (Role = {}));
  function LogClass(constructor) {
      var name = constructor.name;
      console.log("[LogClass] " + name + " loaded at " + new Date().toISOString());
  }
  function ValidateEmail(target, propertyKey, descriptor) {
      var original = descriptor.value;
      descriptor.value = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var email = args[0];
          if (typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email)) {
              return original.apply(this, args);
          }
          else {
              throw new Error('Invalid email format');
          }
      };
      return descriptor;
  }
  var Customer = /** @class */ (function () {
      function Customer(id, name, email, role, address) {
          if (role === void 0) { role = Role.Guest; }
          this.id = id;
          this.name = name;
          this.email = email;
          this.role = role;
          this.address = address;
          this.createdAt = new Date();
      }
      Customer.prototype.fullName = function () {
          return this.name;
      };
      Customer.prototype.updateEmail = function (newEmail) {
          this.email = newEmail;
          return true;
      };
      __decorate([ValidateEmail], Customer.prototype, "updateEmail", null);
      Customer = __decorate([LogClass], Customer);
      return Customer;
  }());
  // decorator helpers (simplified)
  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  var CustomerRepo = /** @class */ (function () {
      function CustomerRepo() {
          this.customers = [];
      }
      CustomerRepo.prototype.add = function (c) {
          this.customers.push(c);
      };
      CustomerRepo.prototype.getAll = function () {
          return this.customers.slice();
      };
      CustomerRepo.prototype.findByEmail = function (email) {
          return this.customers.find(function (x) { return x.email === email; }) || null;
      };
      return CustomerRepo;
  }());
  // expose
  window.Customer = Customer;
  window.CustomerRepo = CustomerRepo;
  window.Role = Role;
})();
