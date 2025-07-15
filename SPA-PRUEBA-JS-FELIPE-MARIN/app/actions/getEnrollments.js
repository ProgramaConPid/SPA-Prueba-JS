export default async function getEnrollments() {
  const response = await fetch("http://localhost:3000/enrollments");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const enrollments = await response.json();
  return enrollments;
}
