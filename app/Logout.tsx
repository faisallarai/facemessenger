'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign out
    </button>
  );
}

export default Logout;
