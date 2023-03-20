import BaseCard from "@/components/BaseCard";
import getApi from "@/services/axios";
import clsx from "clsx";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function clearForm() {
    setUserName("");
    setEmail("");
    setAbout("");
    setLinkedinUrl("");
    setGithubUrl("");
  }

  function startRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    if (hasError) setHasError(false);
  }

  async function generateQRCode(event: React.FormEvent<HTMLFormElement>) {
    startRequest(event);
    try {
      const api = getApi("client");
      const response = await api.post("/users/", {
        name: userName,
        email,
        about,
        linkedin_url: linkedinUrl,
        github_url: githubUrl,
      });
      if (response.status === 201) {
        await router.push(`/userqrcode/${response.data.id}`);
      }
    } catch (error) {
      setHasError(true);
      clearForm();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>QRCode Generator</title>
        <meta name='description' content='QRCode Generator' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='max-w-2xl mx-auto p-5'>
        <BaseCard>
          <form className='space-y-6' onSubmit={generateQRCode}>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-base font-semibold leading-6 text-gray-900'>
                  QRCode Generator
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Fill the form to generate a custom QR-Code with information
                  about you.
                </p>
              </div>
              <div className='mt-5 space-y-6 md:col-span-2 md:mt-0'>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='userName'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Name
                  </label>
                  <div className='mt-2 flex rounded-md shadow-sm'>
                    <input
                      type='text'
                      required
                      name='userName'
                      id='userName'
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className='block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    E-mail
                  </label>
                  <div className='mt-2 flex rounded-md shadow-sm'>
                    <input
                      type='email'
                      required
                      name='email'
                      placeholder='user@example.com'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='about'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    About
                  </label>
                  <div className='mt-2 flex rounded-md shadow-sm'>
                    <textarea
                      name='about'
                      required
                      id='about'
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className='resize-none block w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='linkedin-url'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    LinkedIn URL
                  </label>
                  <div className='mt-2 flex rounded-md shadow-sm'>
                    <input
                      type='url'
                      required
                      name='linkedin-url'
                      id='linkedin-url'
                      className='block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder='https://linkedin.com/in/userid'
                    />
                  </div>
                </div>

                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='github-url'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    GitHub URL
                  </label>
                  <div className='mt-2 flex rounded-md shadow-sm'>
                    <input
                      type='url'
                      required
                      name='github-url'
                      id='github-url'
                      className='block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder='https://github.com/username'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end px-4 sm:px-0'>
              <button
                type='submit'
                disabled={isLoading}
                className={clsx(
                  "ml-3 inline-flex justify-center rounded-md py-2 px-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
                  isLoading
                    ? "bg-indigo-300"
                    : "bg-indigo-600 hover:bg-indigo-500"
                )}
              >
                Generate QRCode Image
              </button>
            </div>
          </form>
          {hasError && (
            <p className='text-xs text-red-500 text-end w-full pt-4'>
              There was an error. Please try again later.
            </p>
          )}
        </BaseCard>
      </div>
    </>
  );
}
