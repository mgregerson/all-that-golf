import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { CourseApi } from '@/api/api';
import { useState } from 'react';

type StateType = {
  [stateName: string]: string;
};

const states: StateType = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};

const formSchema = z.object({
  courseName: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  city: z.string().min(1, {
    message: 'A city is required',
  }),
  state: z.string().min(1, {
    message: 'Please select a state',
  }),
  description: z.string().optional(),
  distanceInYards: z.string().regex(/^\d+$/, {
    message: 'Please input a number.',
  }),
  numHoles: z.string().regex(/^\d+$/, {
    message: 'Please input a number.',
  }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: 'Please input a 5-digit number.',
  }),
  price: z.string().optional(),
  par: z.string().regex(/^\d{1,3}$/, {
    message: 'Please input a number between 1 and 100.',
    }),
  phoneNumber: z.string().optional(),
  image: z.any().optional(),
});

export default function AddCourseForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const courseAPI = new CourseApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: '',
      city: '',
      state: 'AL',
      description: '',
      distanceInYards: '',
      par: '',
      numHoles: '',
      zipCode: '',
      price: '',
      phoneNumber: '',
      image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { image, ...courseData } = values;

      const newCourse = await courseAPI.addCourse(courseData);

      // console.log('newCourse on frontend!', newCourse)

      if (newCourse.id && image[0]) {
        const imageURL = await courseAPI.saveCourseImage(image[0], newCourse.id);
        console.log('imageUrl=', imageURL);
        return imageURL;
      }

    } catch (error) {
      console.error('error=', error);
      setLoading(false);
    }
    navigate('/');
  }

  return (
    <div className="grid place-items-center min-h-screen mb-10">
      <Form {...form}>
        <form
          autoComplete="off" // Ensure 'off' is in lowercase
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-[100px] inline-block border-green-700 border-2 rounded-lg py-5 px-5"
        >
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  What is the name of the course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(states).map(([stateName, stateCode]) => (
                        <SelectItem key={stateCode} value={stateCode}>
                          {stateName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distanceInYards"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance In Yards</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  What is the distance from the back tees?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="par"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Score to Par</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numHoles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Holes</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>How many holes are there?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>This field is optional.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormDescription>This field is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button className="w-[200px]" type="submit">
              {loading ? '...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
