import { Header } from '@/components/common/header'
import GivenCategoryPosts from '@/components/post/category-posts'

export default function CategoryPostsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-[1080px] pb-10 pt-10">
        <GivenCategoryPosts />
      </div>
    </>
  )
}
