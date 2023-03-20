import BaseCard from "@/components/BaseCard";
import getApi from "@/services/axios";
import api from "@/services/axios";
import { User } from "@/types/User";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export default function UserQRCode({
  user,
  hasError,
}: {
  user: User;
  hasError: boolean;
}) {
  return (
    <>
      <Head>
        <title>User</title>
        <meta name='description' content='User' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-2xl mx-auto p-5 space-y-2 flex flex-col flex items-center'>
        <Link href='/' className='underline text-xs'>
          Back to homepage
        </Link>
        <div className='marvel-device iphone4s black'>
          <div className='top-bar'></div>
          <div className='sleep'></div>
          <div className='volume'></div>
          <div className='camera'></div>
          <div className='sensor'></div>
          <div className='speaker'></div>
          <div className='screen'>
            <div>
              {!hasError && (
                <div className='flex flex-col items-center justify-center h-full py-5 space-y-24'>
                  <p className='text-lg font-bold'>{user.name}</p>
                  <div className='flex flex-col gap-y-4 items-center'>
                    <span className='text-xs'>
                      Scan here to get more information
                    </span>
                    <QRCodeSVG
                      value={`${process.env.NEXT_PUBLIC_CLIENT_URL}/userinformation/${user.id}`}
                    />
                  </div>
                </div>
              )}
              {hasError && (
                <div className='flex flex-col items-center pb-5 h-[500px]'>
                  <p className='text-lg text-red-500 font-medium'>
                    Unable to generate a QRCode to this user.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='home'></div>
          <div className='bottom-bar'></div>
        </div>
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
