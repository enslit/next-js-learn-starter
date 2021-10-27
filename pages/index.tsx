import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import {Post} from "../models/Post";
import {User} from "../models/User";

interface Props {
  posts: Post[]
  users: User[]
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getSortedPostsData(),
      users: await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    }
  }
}

export default function Home({ posts, users }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Users</h2>
        <ul className={utilStyles.list}>
          {users.map(({ id, username }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/users/${id}`}>
                <a>{username}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
