import { NextPage } from 'next'
import useBlog from '@/hooks/useBlog'
import Layout from '@/application/Layout'
import Container, { Size } from '@/components/Container'
import Loading from '@/components/Loading'
import BackLink from './components/BackLink'
import BlogTitle from './components/BlogTitle'
import Content from './components/Content'
import AddComments from './components/AddComments'
import Comments from './components/Comments'
import CommentsUserList from './components/CommentsUserList'

const BlogViewPage: NextPage = () => {
  const { blog, isLoading } = useBlog()
  if (!blog) return null

  return (
    <Layout>
      {isLoading ? (
        <div className="h-[700px] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <Container>
            <BackLink />
          </Container>
          <Container size={Size.Narrow}>
            <BlogTitle />
            <Content />
          </Container>
          <hr />
          <Container size={Size.Narrow}>
            <AddComments />
            <CommentsUserList />
            <Comments />
          </Container>
        </>
      )}
    </Layout>
  )
}

export default BlogViewPage
