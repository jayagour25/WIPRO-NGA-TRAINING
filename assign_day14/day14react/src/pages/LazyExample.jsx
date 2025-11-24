import React, { Suspense, useState } from "react";

const CourseDetails = React.lazy(() => import("../components/CourseDetails"));
const InstructorProfile = React.lazy(() => import("../components/InstructorProfile"));

export default function LazyExample() {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);

  return (
    <div className="container mt-4">
      <h2>Lazy Loading & Code Splitting</h2>

      <button className="btn btn-primary me-3" onClick={() => setShowCourse(true)}>
        View Course Details
      </button>

      <button className="btn btn-secondary" onClick={() => setShowInstructor(true)}>
        View Instructor Profile
      </button>

      <Suspense fallback={<div className="mt-3">Loading...</div>}>
        {showCourse && <CourseDetails />}
        {showInstructor && <InstructorProfile />}
      </Suspense>
    </div>
  );
}
