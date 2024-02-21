import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface GolfCourse {
  name: string;
  description: string | null;
  city: string;
  state: string;
  zipCode: number;
  distanceInYards: number;
  par: number;
  phoneNumber: string | null;
  imageURL: string | null;
  numHoles: number;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  id: number;
}

interface GolfCourseCardProps {
  course: GolfCourse;
}

function GolfCourseCard({ course }: GolfCourseCardProps) {
  return (
    <Card className="mx-4 my-4 w-[350px] bg-gray-100 shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>
          {course.city}, {course.state}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="list-disc ml-4">
          <li><strong>Distance From Back Tees:</strong> {course.distanceInYards} yards</li>
          <li><strong>Par:</strong> {course.par}</li>
          <li><strong>Phone Number:</strong> {course.phoneNumber}</li>
          <li><strong>Number of Holes:</strong> {course.numHoles}</li>
          <li><strong>Price:</strong> {course.price}</li>
        </ul>
      </CardContent>
      <div className="flex-grow flex justify-center items-center">
        {course.imageURL && (
          <Link to={course.imageURL}>
            <img
              className="w-72 h-32 object-cover shadow-md rounded-md hover:border-2 hover:border-transparent transition-all duration-300 ease-in-out"
              src={course.imageURL}
              alt={course.name}
            />
          </Link>
        )}
      </div>
      <CardFooter>
        <p>{course.description}</p>
      </CardFooter>
    </Card>
  );
}

export default GolfCourseCard;
