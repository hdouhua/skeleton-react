import React from 'react'

export default function PageNotFound({ location: { pathname } }: { location: { pathname: string } }) {
  // const { pathname } = props.location
  return (
    <>
      <h3>404 PAGE</h3>
      <h4>URL: {pathname}</h4>
    </>
  )
}
