"use strict";

class Student {
  constructor(lastName, firstName, id) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.id = id;
  }

  print(not_display) {
    var s = "Student: " + this.lastName + ", " + this.firstName + ", " + this.id;
    if (!not_display) console.log(s);
    return s;
  }
}

var student = new Student("Dupond", "John", 1835);
student.print();

class ForeignStudent extends Student {

  constructor(lastName, firstName, id, nationality) {
    super(lastName, firstName, id);
    this.nationality = nationality;
  }

  print(not_display) {
    var s = super.print(1) + ", " + this.nationality;
    if (!not_display) console.log(s);
    return s;
  }
}
student = new ForeignStudent("Doe", "John", 435, "American");
student.print();


exports.Student = Student;
exports.ForeignStudent = ForeignStudent;
