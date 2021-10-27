import Layout from '../../components/layout';
import {GetServerSideProps} from "next";
import utilStyles from "../../styles/utils.module.css";
import {User} from "../../models/User";

interface Props {
  user: User
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user: User = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`).then(response => response.json())

  return {
    props: {user}
  }
}

const UserPage = ({ user }: Props) => {
  return (
    <Layout>
      <h1 className={utilStyles.headingXl}>{user.username}</h1>
      <span>{user.email}</span>
    </Layout>
  )
}

export default UserPage