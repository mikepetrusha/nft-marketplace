import { ReactNode } from "react"
import { TopBar } from "./TopBar"

type LayoutProps = {
    children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col pt-8 text-center">
      <TopBar />
      <div className="flex justify-center">
        {children}
      </div>
    </div>
  )
}
