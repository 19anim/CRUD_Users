import { useEffect, useState } from 'react';
import Users from './components/users';
import userListAPI from './components/users/userListAPI.js'

function App() {

  const [usersList, SetUsersList] = useState([]);

  useEffect(() => {
    let tempList = userListAPI.map((user) => {
      var filteredUser = {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        isEditing: false,
      };
      return filteredUser;
    });
    SetUsersList(tempList);
  }, []);

  // useEffect(() => {
  //   async function getUsersList() {
  //     try {
  //       // let requestURL = 'https://learn-react.free.beeceptor.com/all-users'
  //       // let respone = await fetch(requestURL);
  //       // let responeJSON = await respone.json();
  //       // let tempList = responeJSON.map((user) => {
  //       //   return user.first_name + ' ' + user.last_name;
  //       // });
  //       // console.log(tempList);
  //       // SetUsersList(tempList);
  //       console.log(responeJSON)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   }
  //   getUsersList();
  // }, [])

  function handleEditButton(user) {
    let index = usersList.indexOf(user);
    usersList[index].isEditing = !usersList[index].isEditing;
    SetUsersList([...usersList])
  }

  function handleSaveButton(user, nameToChange) {
    let index = usersList.indexOf(user);
    usersList[index].isEditing = !usersList[index].isEditing;
    usersList[index].name = nameToChange ? nameToChange : usersList[index].name;
    SetUsersList([...usersList])
  }

  return (
    <div className="App">
      <Users usersList={usersList} onClickedEditButton={handleEditButton} onClickedSaveButton={handleSaveButton} />
    </div>
  );
}

export default App;
