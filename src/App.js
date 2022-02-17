import { useEffect, useRef, useState } from 'react';
import FooterButtons from './components/footerbuttons/FooterButtons';
import InputUser from './components/inputUsers/InputUser';
import Users from './components/users';
import userListAPI from './components/users/userListAPI.js'

function App() {

  let addedUserListAPI = useRef(userListAPI)
  const [usersList, SetUsersList] = useState([]);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    totalItems: 50,
  });
  const [filterReset, setFilterReset] = useState(
    {
      isReset: false
    }
  );

  useEffect(() => {
    setFiletedUsersList(userListAPI);
    setPaginator({
      page: 1,
      limit: 10,
      totalItems: 50,
    })
  }, [filterReset]);

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

  function setFiletedUsersList(defaultUsersList) {
    addedUserListAPI.current = defaultUsersList;
    let tempList = defaultUsersList.map((user) => {
      var filteredUser = {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        isEditing: false,
      };
      return filteredUser;
    });
    SetUsersList(tempList);
  }

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

  function handleDeleteButton(user) {
    let index = usersList.indexOf(user);
    let lastItem = (paginator.page - 1) * paginator.limit;

    usersList.splice(index, 1);
    userListAPI.splice(index, 1);
    addedUserListAPI.current = userListAPI;

    SetUsersList([...usersList])
    setPaginator({
      ...paginator,
      totalItems: paginator.totalItems - 1,
    })


    if (index === lastItem && index === paginator.totalItems - 1 && paginator.page !== 1) {
      setPaginator({
        ...paginator,
        page: paginator.page - 1,
        totalItems: paginator.totalItems - 1,
      })
    }
  }

  function handlePaginatorClick(newPage) {
    setPaginator({
      ...paginator,
      page: newPage
    })
  }

  function handleResetClick() {
    setFilterReset({
      isReset: true
    })
  }

  function handleSortClick() {
    var sortedUsersList = [...addedUserListAPI.current];
    sortedUsersList.sort(function (a, b) {
      var nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
      var nameB = `${b.first_name} ${b.last_name}`.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    })
    setFiletedUsersList(sortedUsersList)
  }

  function handleOnSubmit(newUser) {
    addedUserListAPI.current = [...addedUserListAPI.current, newUser]
    console.log(addedUserListAPI.current)
    setFiletedUsersList(addedUserListAPI.current)
    setPaginator({
      ...paginator,
      totalItems: paginator.totalItems + 1,
    })
  }

  return (
    <div className="App">
      <InputUser onSubmit={handleOnSubmit} />
      <Users usersList={usersList} onClickedEditButton={handleEditButton} onClickedSaveButton={handleSaveButton} onClickedDeleteButton={handleDeleteButton} paginator={paginator} />
      <FooterButtons paginator={paginator} onPaginatorClick={handlePaginatorClick} onResetClick={handleResetClick} onSortClick={handleSortClick} />
    </div>
  );
}

export default App;
