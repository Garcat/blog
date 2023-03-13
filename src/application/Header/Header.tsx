import Logo from '@/application/Logo'
import SearchModal from '@/application/SearchModal'
import Container, { Space } from '@/components/Container'
import Input from '@/components/Input'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { Size } from '../../components/Input/Input'
import NavLink, { Variant } from './components/NavLink'
import Notification from './components/Notification'
import User from './components/User'

const Header: FC = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  return (
    <header className="bg-background border-b">
      <Container className="flex justify-between items-center h-16 relative" space={Space.Small}>
        <Logo />

        <div className="absolute text-center h-8 w-[200px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Input
            size={Size.Small}
            className="text-center"
            placeholder="Search..."
            onClick={() => setIsSearchModalOpen(true)}
          />
        </div>
        {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}

        {session ? (
          <section className="flex gap-2.5">
            <Notification />
            <User />
          </section>
        ) : (
          <section className="flex gap-4">
            <NavLink href="/login">Log In</NavLink>
            <NavLink href="/sign-up" variant={Variant.Dark}>
              Sign Up
            </NavLink>
          </section>
        )}
      </Container>
    </header>
  )
}

export default Header