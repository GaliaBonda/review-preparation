import React, { FC, PropsWithChildren } from 'react'

 const layout:FC<PropsWithChildren<unknown>> = ({children}) => {
  return (
    <div className="layout-2">{children}
    </div>
  )
}

export default layout;