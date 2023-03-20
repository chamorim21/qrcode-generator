import { ReactNode } from "react";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return <div className='bg-gray-100 h-screen w-screen'>{children}</div>;
}
