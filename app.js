
const studentsData = [
  { id: 1, name: "Alice Johnson", year: 1, course: "BSCS", grades: [88, 92, 90, 85], enrolled: true },
  { id: 2, name: "Bob Smith", year: 2, course: "BSIT", grades: [75, 80, 78, 82], enrolled: true },
  { id: 3, name: "Charlie Brown", year: 3, course: "BSCS", grades: [95, 98, 92, 96], enrolled: false },
  { id: 4, name: "Diana Prince", year: 1, course: "BSIS", grades: [85, 89, 90, 88], enrolled: true },
  { id: 5, name: "Evan Wright", year: 4, course: "BSIT", grades: [70, 72, 68, 75], enrolled: true },
  { id: 6, name: "Fiona Gallagher", year: 2, course: "BSCS", grades: [91, 93, 89, 94], enrolled: true },
  { id: 7, name: "George Clark", year: 3, course: "BSIS", grades: [82, 85, 80, 84], enrolled: false },
  { id: 8, name: "Hannah Abbott", year: 1, course: "BSIT", grades: [78, 82, 85, 80], enrolled: true },
  { id: 9, name: "Ian Malcolm", year: 4, course: "BSCS", grades: [88, 86, 90, 89], enrolled: true },
  { id: 10, name: "Julia Roberts", year: 2, course: "BSIS", grades: [93, 95, 91, 94], enrolled: true },
  { id: 11, name: "Kevin Bacon", year: 3, course: "BSIT", grades: [65, 70, 72, 68], enrolled: false },
  { id: 12, name: "Laura Croft", year: 1, course: "BSCS", grades: [98, 96, 99, 97], enrolled: true },
  { id: 13, name: "Mike Wheeler", year: 2, course: "BSIS", grades: [80, 83, 81, 82], enrolled: true },
  { id: 14, name: "Nina Williams", year: 4, course: "BSIT", grades: [87, 89, 90, 88], enrolled: true },
  { id: 15, name: "Oscar Isaac", year: 3, course: "BSCS", grades: [76, 78, 80, 75], enrolled: true },
  { id: 16, name: "Peter Parker", year: 1, course: "BSIS", grades: [92, 94, 96, 91], enrolled: false },
  { id: 17, name: "Quinn Fabray", year: 2, course: "BSIT", grades: [84, 86, 88, 85], enrolled: true },
  { id: 18, name: "Rachel Green", year: 3, course: "BSCS", grades: [89, 91, 87, 90], enrolled: true },
  { id: 19, name: "Steve Rogers", year: 4, course: "BSIS", grades: [95, 97, 94, 96], enrolled: true },
  { id: 20, name: "Tony Stark", year: 1, course: "BSIT", grades: [100, 99, 98, 100], enrolled: true },
  { id: 21, name: "Umar Khan", year: 2, course: "BSCS", grades: [73, 75, 78, 72], enrolled: false },
  { id: 22, name: "Victoria Secret", year: 3, course: "BSIS", grades: [86, 88, 87, 89], enrolled: true },
  { id: 23, name: "Wanda Maximoff", year: 4, course: "BSIT", grades: [92, 90, 95, 93], enrolled: true },
  { id: 24, name: "Xavier Charles", year: 1, course: "BSCS", grades: [94, 96, 95, 97], enrolled: true },
  { id: 25, name: "Yara Shahidi", year: 2, course: "BSIS", grades: [81, 83, 85, 82], enrolled: false },
  { id: 26, name: "Zack Martin", year: 3, course: "BSIT", grades: [79, 81, 77, 80], enrolled: true },
  { id: 27, name: "No Grades Student", year: 1, course: "BSCS", grades: [], enrolled: true },
  { id: 28, name: "Arthur Pendragon", year: 2, course: "BSIS", grades: [88, 85, 90, 87], enrolled: true },
  { id: 29, name: "Barry Allen", year: 3, course: "BSIT", grades: [91, 89, 93, 92], enrolled: true },
  { id: 30, name: "Bruce Wayne", year: 4, course: "BSCS", grades: [96, 98, 97, 99], enrolled: true }
];

function getAverageGrade(student) {
  if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
    return 0;
  }
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return Number((total / student.grades.length).toFixed(2));
}

function getTopStudents(students, n) {
  if (!Array.isArray(students)) throw new Error("Invalid student dataset provided.");
  if (typeof n !== "number" || n < 0) throw new Error("Count 'n' must be a non-negative number.");

  return [...students]
    .sort((a, b) => getAverageGrade(b) - getAverageGrade(a))
    .slice(0, n);
}

function groupByCourse(students) {
  if (!Array.isArray(students)) return {};

  return students.reduce((acc, student) => {
    const course = student.course || "Unassigned";
    if (!acc[course]) acc[course] = [];
    acc[course].push(student);
    return acc;
  }, {});
}
function getEnrolledCount(students) {
  if (!Array.isArray(students)) return { enrolled: 0, notEnrolled: 0 };

  return students.reduce(
    (acc, student) => {
      if (student.enrolled) acc.enrolled += 1;
      else acc.notEnrolled += 1;
      return acc;
    },
    { enrolled: 0, notEnrolled: 0 }
  );
}

function findStudent(students, name) {
  if (!Array.isArray(students) || typeof name !== "string") return null;

  const searchName = name.trim().toLowerCase();
  return students.find((s) => s.name.toLowerCase() === searchName) || null;
}

function getCourseAverages(students) {
  if (!Array.isArray(students) || students.length === 0) return [];

  const grouped = groupByCourse(students);

  const courseAverages = Object.keys(grouped).map((course) => {
    const courseStudents = grouped[course];
    const validGrades = courseStudents
      .map((s) => getAverageGrade(s))
      .filter((avg) => avg > 0);

    const courseAvg = validGrades.length > 0
      ? validGrades.reduce((sum, val) => sum + val, 0) / validGrades.length
      : 0;

    return { course, averageGrade: Number(courseAvg.toFixed(2)) };
  });

  return courseAverages.sort((a, b) => b.averageGrade - a.averageGrade);
}

function exportSummary(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return { totalStudents: 0, overallAverage: 0, topStudent: null, courseBreakdown: [] };
  }

  const validAverages = students
    .map((s) => getAverageGrade(s))
    .filter((avg) => avg > 0);

  const overallAverage = validAverages.length > 0
    ? validAverages.reduce((sum, g) => sum + g, 0) / validAverages.length
    : 0;

  const topStudentsList = getTopStudents(students, 1);
  const topStudent = topStudentsList.length > 0
    ? { name: topStudentsList[0].name, averageGrade: getAverageGrade(topStudentsList[0]) }
    : null;

  return {
    totalStudents: students.length,
    overallAverage: Number(overallAverage.toFixed(2)),
    topStudent,
    courseBreakdown: getCourseAverages(students)
  };
}

function filterByYear(students, year) {
  if (!Array.isArray(students)) return [];
  if (typeof year !== "number") throw new Error("Year level must be a number.");

  return students.filter((s) => s.year === year);
}

function sortByName(students) {
  if (!Array.isArray(students)) return [];
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
}

// --- Main Execution ---
function main() {
  console.log("================================================");
  console.log("          STUDENT RECORDS REPORT SUMMARY        ");
  console.log("================================================\n");

  const summary = exportSummary(studentsData);
  console.log(`Total Students    : ${summary.totalStudents}`);
  console.log(`Overall Average   : ${summary.overallAverage}`);
  console.log(`Top Student       : ${summary.topStudent.name} (${summary.topStudent.averageGrade})\n`);

  console.log("------------------------------------------------");
  console.log("              TOP 3 STUDENTS                   ");
  console.log("------------------------------------------------");
  const top3 = getTopStudents(studentsData, 3);
  top3.forEach((s, idx) => {
    console.log(`${idx + 1}. ${s.name} [${s.course}] - Avg: ${getAverageGrade(s)}`);
  });

  console.log("\n------------------------------------------------");
  console.log("         AVERAGE GRADE BY COURSE                ");
  console.log("------------------------------------------------");
  summary.courseBreakdown.forEach((c) => {
    console.log(`Course: ${c.course.padEnd(8)} | Average Grade: ${c.averageGrade}`);
  });

  console.log("\n------------------------------------------------");
  console.log("            ENROLLMENT STATUS                   ");
  console.log("------------------------------------------------");
  const enrollment = getEnrolledCount(studentsData);
  console.log(`Enrolled     : ${enrollment.enrolled}`);
  console.log(`Not Enrolled : ${enrollment.notEnrolled}`);

  console.log("\n------------------------------------------------");
  console.log("               STUDENT SEARCH                   ");
  console.log("------------------------------------------------");
  const searchName = "tony stark";
  const found = findStudent(studentsData, searchName);
  console.log(`Search query: "${searchName}"`);
  console.log(found ? `Found: ${found.name} (ID: ${found.id}, Course: ${found.course})` : "Student not found.");

  const missingSearch = findStudent(studentsData, "Unknown Person");
  console.log(`Search query: "Unknown Person"`);
  console.log(missingSearch ? `Found: ${missingSearch.name}` : "Student not found.");

  console.log("\n================================================");
  console.log("                 STRETCH GOALS                  ");
  console.log("================================================");

  console.log("\nYear 1 Students Count:", filterByYear(studentsData, 1).length);

  const sortedAlphabetically = sortByName(studentsData);
  console.log(`First student alphabetically : ${sortedAlphabetically[0].name}`);
  console.log(`Last student alphabetically  : ${sortedAlphabetically[sortedAlphabetically.length - 1].name}`);
}

main();
