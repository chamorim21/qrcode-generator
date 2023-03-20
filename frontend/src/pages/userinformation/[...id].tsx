import BaseCard from "@/components/BaseCard";
import getApi from "@/services/axios";
import { User } from "@/types/User";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

export default function UserInformation({
  user,
  hasError,
}: {
  user: User;
  hasError: boolean;
}) {
  return (
    <>
      <Head>
        <title>User information</title>
        <meta name='description' content='User information' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-2xl mx-auto p-5 space-y-2'>
        <Link href='/' className='underline text-xs'>
          Back to homepage
        </Link>
        <BaseCard>
          {!hasError && (
            <>
              <div className='px-4 pb-4 sm:px-6'>
                <h3 className='text-base text-center font-semibold leading-6 text-gray-900'>
                  {user.name}
                </h3>
              </div>
              <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
                <dl className='sm:divide-y sm:divide-gray-200'>
                  <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>
                      Email address
                    </dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      {user.email}
                    </dd>
                  </div>
                  <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                    <dt className='text-sm font-medium text-gray-500'>About</dt>
                    <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                      {user.about}
                    </dd>
                  </div>
                  <div className='py-4 flex justify-around'>
                    <Link
                      href={user.github_url}
                      target='_blank'
                      className='ml-3 inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-gray-600'
                    >
                      GitHub
                    </Link>
                    <Link
                      href={user.linkedin_url}
                      target='_blank'
                      className='ml-3 inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 bg-indigo-600'
                    >
                      LinkedIn
                    </Link>
                  </div>
                </dl>
              </div>
            </>
          )}
          {hasError && (
            <div className='flex flex-col items-center pb-5 h-[500px]'>
              <p className='text-lg text-red-500 font-medium'>
                Unable to get information about this user.
              </p>
            </div>
          )}
        </BaseCard>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    if (!context.params) throw new Error("No params provided");
    const { id } = context.params;
    const api = getApi("server");
    const response = await api.get(`/users/${id}/`);
    return {
      props: {
        user: response.data,
        hasError: false,
      },
    };
  } catch (error) {
    return {
      props: { user: {}, hasError: true },
    };
  }
};
