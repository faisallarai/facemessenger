import { Session, unstable_getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logout from './Logout';

async function Header() {
  const session = await unstable_getServerSession();

  if (session)
    return (
      <header className="header">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2"
            src={session.user?.image!}
            width={50}
            height={10}
            style={{ objectFit: 'contain' }}
            alt="Profile Picture"
          />

          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>

        <Logout />
      </header>
    );
  return (
    <header className="header justify-center">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            width={50}
            height={10}
            alt="Logo"
          />

          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}

export default Header;
