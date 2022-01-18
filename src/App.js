import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoom from './components/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList';
import { Route, Switch } from 'react-router';
import axios from "axios"

function App() {

  const [rooms, setRooms] = useState([])

  useEffect(() => fetchRooms(), []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("https://coded-task-axios-be.herokuapp.com/rooms");
      setRooms(response.data);
    }
    catch(error) {
      console.log(error);
      alert("Failed getting Rooms")
    }
  }
    
  const createRoom =  async (newRoom) => {
    try {
      const response = await axios.post("https://coded-task-axios-be.herokuapp.com/rooms", newRoom);
        newRoom = response.data
         setRooms([...rooms, response.data]);
    }
    catch (error) {
      console.log(error);
      alert("Cannot Add Room");
    }
  }

  const deleteRoom =  async (id) => {
    try {
      const response = await axios.delete(`https://coded-task-axios-be.herokuapp.com/rooms/${id}`);
      setRooms(() => {
        return rooms.filter((item) => item.id !== id);
      });
    } catch (error) {
      console.log(error);
      alert("Cannot Delete Room !");
    } }

    const updateRoom = async (room) => { 
      try {
        const response = await axios.put(`https://coded-task-axios-be.herokuapp.com/rooms/${room.id}`, room);
        const newRooms = rooms.map((item) => (item.id === room.id ? room : item));
        setRooms(newRooms);
      } catch (error) {
        console.log(error);
        alert("Cannot Update Dude !")
      }
  };
  
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList rooms={rooms} 
                             createRoom={createRoom}
                             deleteRoom={deleteRoom}
                             updateRoom={updateRoom}/>
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
