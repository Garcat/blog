import { FC, useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '@/components/Avatar'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import NavLink from './components/NavLink'
import Notification from './components/Notification'
import UserDropdown from './components/UserDropdown'

const Header: FC = () => {
  const { data: session } = useSession()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false)

  return (
    <header className="bg-background">
      <Container className="flex justify-between items-center h-16 px-6 border-b">
        <Logo />

        {session ? (
          <section className="flex gap-2.5">
            <Notification />

            <div className="relative">
              <button type="button" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                <Avatar src={session.user?.image} alt={session.user?.name} width={30} height={30} />
              </button>
              {isUserDropdownOpen && <UserDropdown />}
            </div>
          </section>
        ) : (
          <section className="flex gap-4">
            <NavLink href="/sign-up" outline>
              Sign Up
            </NavLink>
            <NavLink href="/login">Log In</NavLink>
          </section>
        )}
      </Container>
    </header>
  )
}

export default Header
