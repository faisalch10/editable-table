import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

const Table = () => {

  const [columns] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Username', field: 'username' }
  ]);


  const [data, setData] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(users.data);
    }
    getUsers();
  }, []);

  return (
    <MaterialTable
      style={{ maxWidth: '1140px', margin: '3rem auto' }}
      title="Editable Table made by Muhammad Faisal"
      columns={columns}
      data={data}
      isLoading={data.length > 0 ? false : true}
      editable={{
        onRowAdd: async (newData) => {
          const newUser = await axios.post('https://jsonplaceholder.typicode.com/users', newData);
          setData([...data, newUser.data]);
        },
        onRowUpdate: async (newData, oldData) => {
          const updatedUser = await axios.put(`https://jsonplaceholder.typicode.com/users/${oldData.id}`, { name: newData.name, username: newData.username });
          console.log(updatedUser.data);
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = updatedUser.data;
          setData([...dataUpdate]);
        }
      }}
    />
  )
};

export default Table;


