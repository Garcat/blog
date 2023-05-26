import { NextPage } from 'next'
import Link from 'next/link'

const FourOhFour: NextPage = () => (
  <>
    <h1>404 - Page Not Found</h1>
    <Link href="/">Go back home</Link>
  </>
)

export default FourOhFour
