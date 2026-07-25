'use client';

import { useState } from 'react';
import { addTrustline } from '@/lib/payment';


type Props = {
  publicKey: string | null;
  onAdded?: () => void;
};



export default function AddTrustline({
  publicKey,
  onAdded,
}: Props) {


  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');



  const handleAdd = async () => {


    if (!publicKey) {

      setError('Please connect your wallet first');

      return;

    }



    setLoading(true);

    setError('');

    setSuccess('');



    try {


      await addTrustline(publicKey);



      setSuccess('USDC trustline added successfully');


      onAdded?.();



    } catch (e: unknown) {


      setError(
        e instanceof Error
          ? e.message
          : 'Failed to add trustline'
      );


    } finally {


      setLoading(false);


    }

  };





  return (

    <div className="rounded border border-gray-200 bg-white p-6">


      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Add Trustline
      </h2>



      <button
        onClick={handleAdd}
        disabled={loading}
        className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
      >

        {loading
          ? 'Adding...'
          : 'Add USDC Trustline'
        }

      </button>





      {success && (

        <p className="mt-2 text-sm text-green-600">

          {success}

        </p>

      )}





      {error && (

        <p className="mt-2 text-sm text-red-600">

          {error}

        </p>

      )}





    </div>

  );

}
