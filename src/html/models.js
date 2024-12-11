const db = localStorage;
const usersKey = "USER_TABLE";
class User {
  constructor(
    email, password, firstName, lastName, birthdate,
    isTraveller, isLoggedIn, isAdmin) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.isTraveller = isTraveller;
    this.isLoggedIn = isLoggedIn;
    this.isAdmin = isAdmin;
  }
}

class Rental {
  constructor(city, streetName, streetNumber, floorLevel, squareMetreSize,
    hasAirConditioning, rentalPricePerMonth, leaseDurationInMonths, petsAllowed, dateAvailable) {
    this.city = city;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.floorLevel = floorLevel;
    this.squareMetreSize = squareMetreSize;
    this.hasAirConditioning = hasAirConditioning;
    this.rentalPricePerMonth = rentalPricePerMonth;
    this.leaseDurationInMonths = leaseDurationInMonths;
    this.petsAllowed = petsAllowed;
    this.dateAvailable = dateAvailable;
    this.isShortTermRental = leaseDurationInMonths < 6;
  }
}
class UserRecord {
  constructor(obj) {
    this.user = this.objToUser(obj);
  }

  objToUser(obj) {
    let email = obj["email"];
    let password = obj["password"];
    let firstName = obj["firstName"];
    let lastName = obj["lastName"];
    let birthdate = obj["birthdate"];
    let isTraveller = obj["isTraveller"];
    let isLoggedIn = obj["isLoggedIn"];
    let isAdmin = obj["isAdmin"];
    if (anyNullOrEmpty(email, password, firstName,
      lastName, birthdate, isTraveller, isLoggedIn, isAdmin)) {
      return null;
    }
    return new User(email, password, firstName, lastName,
      birthdate, isTraveller, isLoggedIn, isAdmin
    );
  }
}
function getAllUsers() {
  const items = JSON.parse(db.getItem(usersKey));
  if (items != null && items.length > 0) {
    const userRecords = items.map(obj => new UserRecord(obj));
    return userRecords.map(record => record.user);
  }
  return null;
}
function usersListToJsonString(value) {
  if (value == null || value == undefined) {
    return null;
  }
  try {
    return JSON.stringify(value);
  } catch (error) {
    return null;
  }
}
function getUsersFromStorage() {
  const userString = db.getItem(usersKey);
  return getAllUsers();
}
class Validation {
  // 1.a. all fields are required
  isNotEmpty(v) {
    const c1 = v != null;
    const c2 = v != undefined;
    return c1 && c2;
  }
  // 1.b. all fields are required
  areNotEmpty(...v) {
    for (const value of v) {
      if (!this.isNotEmpty(value)) return false;
    }
    return true;
  }
  // 2.a. fields have matching type
  isMatchingType(v, type) {
    if (type === "date") {
      return v instanceof Date;
    } else {
      return typeof (v) === type;
    }
  }
  // 2.b. fields have matching type
  areMatchingType(mapObj) {
    for (const [v, type] of mapObj) {
      if (!this.isMatchingType(v, type)) return false;
    }
    return true;
  }
}
let steve = new User(
  "steve@gmail.com",
  "pwd",
  "steve",
  "greystone",
  new Date("2000/15/04"),
  true,
  true,
  true
);
let stevy = new User(
  "stevy@gmail.com",
  "pwd",
  "stevy",
  "greystone",
  new Date("2000/15/04"),
  true,
  false,
  false
);
let validation = new Validation();
let areNotEmpty = validation.areNotEmpty(
  steve.email,
  steve.password,
  steve.firstName,
  steve.lastName,
  steve.birthdate,
  steve.traveller
);
console.log(areNotEmpty);
let areMatchingType = validation.areMatchingType(
  new Map([
    [steve.email, "string"],
    [steve.password, "string"],
    [steve.firstName, "string"],
    [steve.lastName, "string"],
    [steve.birthdate, "date"],
    [steve.traveller, "boolean"],
  ])
);
console.log(areMatchingType);

let newRentalAboveSubway = new Rental(
  'Vancouver', 'Granville', 541, 4, 750,
  true, 1500, 2, false, Date.now()
)
console.log(newRentalAboveSubway);