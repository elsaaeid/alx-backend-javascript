interface Teacher {
  firstName: string;
  lastName: string;
  readonly fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  readonly location: string;
  [key: string]: any;
}

const teacher1: Teacher = {
  firstName: 'John',
  lastName: 'Doe',
  fullTimeEmployee: false,
  location: 'London',
  contract: false,
};

interface Directors extends Teacher {
  numberOfReports: number;
}

const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
  const firstLetter = firstName.charAt(0).toUpperCase();
  const fullName = `${firstLetter}. ${lastName}`;

  return fullName;
};



console.log(teacher1);
console.log(director1);
console.log(printTeacher(teacher1.firstName, teacher1.lastName));



interface Student {
  firstName: string;
  lastName: string;
}

interface StudentClassInterface {
  new (firstName: string, lastName: string): StudentClass;
}

class StudentClass implements Student {
  constructor(public firstName: string, public lastName: string) {}

  workOnHomework() {
    return 'Currently working';
  }

  displayName() {
    return this.firstName;
  }
}

const student1: StudentClassInterface = StudentClass;
const student = new student1('John', 'Doe');

console.log(student.workOnHomework());
console.log(student.displayName());
