import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const session = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        {!session.data ? (
          <>
            <li>
              <Link href={'/sign-in'}>Sign In</Link>
            </li>
            <li>
              <Link href={'/sign-up'}>Sign Up</Link>
            </li>
          </>
        ) : (
          <li>
            <span>{session.data.user.email}</span>{' '}
            <button onClick={handleLogout}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
