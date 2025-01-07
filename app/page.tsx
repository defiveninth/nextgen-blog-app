import { Header } from '@/components/common/header'
import CurrencyTicker from '@/components/currency'
import CreatePostForm from '@/components/post/create-post.form'
import { PostList } from '@/components/post/posts-list'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[1080px] pb-10">
        <CurrencyTicker />
        <CreatePostForm />
        <PostList />
      </div>
    </>
  )
}