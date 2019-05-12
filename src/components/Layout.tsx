import React from 'react'
import { Container } from 'reactstrap'
import NavMenu from './NavMenu'
import { RootRouters } from '../routers'

export default function() {
  return (
    <>
      <NavMenu />
      <Container>
        <RootRouters />
      </Container>
    </>
  )
}
