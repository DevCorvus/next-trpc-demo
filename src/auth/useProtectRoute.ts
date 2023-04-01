import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type RouteProtectionMode = 'auth' | 'guest';

// Client-side route protection (caveat: it requires to handle loading state)
export function useProtectRoute(mode: RouteProtectionMode) {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (session.status !== 'loading') {
      switch (mode) {
        case 'auth':
          if (session.status === 'unauthenticated') {
            router.replace('/sign-in');
          } else {
            setLoading(false);
          }
          break;
        case 'guest':
          if (session.status === 'authenticated') {
            router.replace('/');
          } else {
            setLoading(false);
          }
          break;
      }
    }
  }, [mode, session.status, router]);

  return isLoading;
}
