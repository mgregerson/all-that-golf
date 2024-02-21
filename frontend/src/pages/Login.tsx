import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out:', error.message);
      return;
    }

    console.log('Logged out');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      {!session ? (
        <div className="w-full max-w-md ">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(153 60.0% 53.0%)', //this does not display in the button background
                    brandAccent: 'hsl(154 54.8% 45.1%)',
                    brandButtonText: 'green',
                    defaultButtonBackground: 'hsl(153 60.0% 53.0%)',
                    defaultButtonBackgroundHover: '#eaeaea',
                    defaultButtonBorder: 'lightgray',
                    defaultButtonText: 'black',
                    dividerBackground: '#eaeaea',
                    inputBackground: 'transparent',
                    inputBorder: 'lightgray',
                    inputBorderHover: 'gray',
                    inputBorderFocus: 'gray',
                    inputText: 'black',
                    inputLabelText: 'gray',
                    inputPlaceholder: 'darkgray',
                    messageText: 'gray',
                    messageTextDanger: 'red',
                    anchorTextColor: 'gray',
                    anchorTextHoverColor: 'darkgray',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      ) : (
        <div className="logoutButton">
          <button onClick={logOut}>Logout!</button>
        </div>
      )}
    </div>
  );
}
