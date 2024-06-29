class HolbertonCourse {
    constructor(name, length, students) {
      if (typeof name !== 'string') {
        throw new TypeError('Name must be a string');
      }
      if (typeof length !== 'number') {
        throw new TypeError('Length must be a number');
      }
      this._name = name;
      this._length = length;
      this._students = students;
    }
  
    get name() {
      return this._name;
    }
  
    set name(newName) {
      if (typeof newName !== 'string') {
        throw new TypeError('Name must be a string');
      }
      this._name = newName;
    }
  
    get length() {
      return this._length;
    }
  
    set length(newLength) {
      if (typeof newLength !== 'number') {
        throw new TypeError('Length must be a number');
      }
      this._length = newLength;
    }
  
    get students() {
      return this._students;
    }
  
    set students(newStudents) {
      this._students = newStudents;
    }
  }
  
  const c1 = new HolbertonCourse("ES6", 1, ["Bob", "Jane"]);
  console.log(c1.name);
  c1.name = "Python 101";
  console.log(c1);
  
  try {
    c1.name = 12;
  } catch (err) {
    console.log(err);
  }
  
  try {
    const c2 = new HolbertonCourse("ES6", "1", ["Bob", "Jane"]);
  } catch (err) {
    console.log(err);
  }
