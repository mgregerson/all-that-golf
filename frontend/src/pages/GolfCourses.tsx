import { useEffect, useState } from "react"
import { CourseApi } from "@/api/api"
import GolfCourseCard from "@/components/GolfCourseCard"

function GolfCourses() {
    let [courses, setCourses] = useState<any>([])
    const courseApi = new CourseApi()

    useEffect(() => {
        async function getCourses() {
            const courses = await courseApi.getCourses()
            setCourses(courses.data)
        }
        getCourses()
    }, [])

    console.log('courses=', courses)

  return (
    <div>
        <h1 className="text-4xl text-center">Golf Courses</h1>
        <div className="flex flex-wrap justify-center">
            {courses.map((course: any) => (
            <GolfCourseCard key={course.id} course={course} />
        ))}
        </div>
    </div>
  )
}

export default GolfCourses