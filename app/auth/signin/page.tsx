import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import SignIn from './SignIn';

async function SignInPage() {
  const providers = await getProviders();

  return (
    <main className="grid justify-center">
      <div>
        <Image
          className="rounded-full mx-2"
          src="https://links.papareact.com/161"
          width={700}
          height={700}
          alt=""
          style={{ objectFit: 'cover' }}
        />
      </div>

      <SignIn providers={providers} />
    </main>
  );
}

export default SignInPage;
