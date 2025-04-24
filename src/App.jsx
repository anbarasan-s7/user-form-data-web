
import React, { useState } from 'react'
import './index.css'
import{v4 as uuid}from 'uuid'

const App = () => {
  const [users, setUsers] = useState([]);
  const [btnState, setBtnState] = useState('add');
  const [userInfo, setUserInfo] = useState({
    id:uuid(),
    name:'',
    age:'',
    email:'',
    phone:'',
  });


  const handleChange=(e)=>{
    // console.log(e);
    const{name,value}=e.target;
    setUserInfo((curInfo)=>{
      return {
        ...curInfo,
        [name]:value,
      };
    });
    

  };
      // add data
      const addData=()=>{
        setUsers((curUsers)=>[...curUsers,userInfo]);
        setUserInfo({
          id:uuid(),
          name:'',
          age:'',
          email:'',
          phone:'',
        });
      };
      // console.log(users);

      const deleteData=(id)=>{
        setUsers((curUsers)=>{
          return curUsers.filter((user)=>{
            return user.id !==id;
          })
        })
      }

      // update or editing button
      const editingBtn=(user)=>{
        setUserInfo(user);
        setBtnState('edit')
      }

      // cancel editing
      const cancelEditing=()=>{
        setUserInfo({
          id:uuid(),
          name:'',
          age:'',
          email:'',
          phone:'',
        })
        setBtnState('add')
      };

      // update data
      const updatedData=()=>{
        setUsers((curVal)=>{
          return curVal.map((user)=>{
            if(user.id === userInfo.id){
              return userInfo;
            }
            return user;
          });
        });
        cancelEditing();
      }

  return (
    <div className='main'>
      <div className='container'>
      <input type="text" placeholder='Enter your name' required value={userInfo.name}  name='name' onChange={handleChange}/><br />
      <input type="number" placeholder='Enter your age' required value={userInfo.age} name='age' onChange={handleChange}/><br />
      <input type="email" placeholder='Enter your e-mail' required value={userInfo.email} name='email' onChange={handleChange}/><br />
      <input type="number" placeholder='Enter your Phone' required value={userInfo.phone} max={10} name='phone' onChange={handleChange}/><br />
      {
        btnState === 'add' ?(<button onClick={addData}>ADD</button>):
        ( 
          <div>
            <button onClick={updatedData}>UPDATE</button>
            <button style={{
              marginLeft:'15px',
              backgroundColor: 'red'
            }} onClick={cancelEditing}>CANCEL</button>
          </div>
        )
      }
    </div>
    <div className='tableDiv'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>{
            return <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={()=>editingBtn(user)}>Edit</button>
                <button onClick={()=>deleteData(user.id)}>Delete</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
    </div>
    
  )
}

export default App;