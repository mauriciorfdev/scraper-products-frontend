const API_URL = import.meta.env.VITE_API_URL;
import Header from '../components/header/Header';
import styles from './UsersPage.module.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import type { User } from '../src/types';
import { useEffect, useState } from 'react';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
  );
};

const UsersPage = () => {
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const url = `${API_URL}/users`;
    try {
      const resp = await fetch(url, { credentials: 'include' });
      const data = await resp.json();
      setUsersData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <h1>Users List</h1>
        <Table striped hover>
          <TableHead />
          <tbody>
            {usersData.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UsersPage;
