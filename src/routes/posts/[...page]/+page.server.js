import { getPosts } from '$lib/get-posts'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  let page = 1
  let limit = 10

  if (params.page) {
    try {
      // a url of /posts/page/2 will come through as 'page/2' for params.page
      const index = params.page.split('page/').pop()

      if (index) {
        page = parseInt(index)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const posts = getPosts({ limit, page })

  // if page doesn't exist, direct to page 1
  if (posts.length == 0 && page > 1) {
    throw redirect(302, '/posts')
  }

  return {
    posts,
    page,
    limit
  }
}
