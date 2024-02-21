import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserApi } from '@/api/api';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const formSchema = z
  .object({
    username: z
      .string()
      .min(6, {
        message: 'Username must be at least 6 characters',
      })
      .max(20, {
        message: 'Username must be at most 20 characters',
      }),
    email: z.string().min(1, {
      message: 'An email is required',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    firstName: z.string().min(1, {
      message: 'You forgot your first name!',
    }),
    lastName: z.string().min(1, {
      message: 'You forgot your last name!',
    }),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function Register() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { toast } = useToast();

  const userAPI = new UserApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      image: '',
    },
  });

  if (session) {
    navigate('/');
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { image, ...userData } = values;

      const newUser = await userAPI.registerUser(userData);

      if (newUser && image[0]) {
        const imageURL = await userAPI.saveUserImage(image[0], newUser.id);
        console.log('imageURL:', imageURL);
      }

      toast({
        title: 'New User Created!',
        description: 'Please check your email.',
      })
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
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

export default Register;
