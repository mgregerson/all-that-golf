
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="flex items-center justify-center h-screen">
      {!session ? (
        <div>
          <p>You're not logged in!</p>
        </div>
      ) : (
        <div>
          <p>You're logged in!</p>
        </div>
      )}
    </div>
  );
}
