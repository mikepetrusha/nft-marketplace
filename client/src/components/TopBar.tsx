import Link from "next/link";
import { routes } from "@/constants/Routes";

export const TopBar = () => {
  return (
    <>
    <p className="text-4xl font-bold">Marketplace</p>
    <div className="flex mt-4 justify-center">
      {routes.map(route => (
        <Link
        key={route.href}
        className="mr-6 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        href={route.href}>{route.name}</Link>
      ))}
    </div>
  </>
  )
}
