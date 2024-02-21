import axios from 'axios';

export class CourseApi {
  async saveCourseImage(image: any, id: string) {
    try {
      const formData = new FormData();
      formData.append('image', image, `${image.originalname}`);
  
      const newCourseImage = await axios.post(
        `http://localhost:3000/courses/course/upload-image/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return newCourseImage;
    } catch (error) {
      console.error('Error saving course image:', error);
      throw error;
    }
  }

  async addCourse(course: object) {
    console.log('course=', course);
    const newCourse = await axios.post(
      'http://localhost:3000/courses/add-course',
      course
    );
    return newCourse.data;
  }

  async getCourses() {
    const courses = await axios.get('http://localhost:3000/courses');
    return courses;
  }
}

export class UserApi {
  async registerUser(user: object) {
    const newUser = await axios.post(
      'http://localhost:3000/users/register',
      user
    );
    return newUser.data;
  }

  async saveUserImage(image: any, id: string) {
    try {
      const formData = new FormData();
      formData.append('image', image, `${image.originalname}`);
  
      const newUserImage = await axios.post(
        `http://localhost:3000/users/user/upload-image/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return newUserImage;
    } catch (error) {
      console.error('Error saving user image:', error);
      throw error;
    }
  }
}
