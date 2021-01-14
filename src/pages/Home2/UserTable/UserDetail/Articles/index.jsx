
import { List, Avatar } from 'antd';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';


import Winner from '../../../../../public/images/winner.png';
import Loser from '../../../../../public/images/loser.png';

import { BASE_API_URL } from "../../../../../utils/constant";
import AuthService from "../../../../../service/auth-service"; 

const Articles = (props) => {
  const { userId, setNumGame } = props;
  const [userGames, setUserGames] = useState([])

  useEffect(() => {
    axios(`${BASE_API_URL}/api/v1/game/user/${userId}`, {
      method: "GET",
      headers: AuthService.authHeader(),
    })
      .then((res) => {
        console.log(res.data);
        setUserGames(res.data.data);
        setNumGame(res.data.data.length);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [userId]);


  return (
    <List
    itemLayout="horizontal"
    dataSource={userGames}
    renderItem={item => (
      <List.Item key={item._id}>
        <List.Item.Meta
          avatar={<Avatar src={item.winner[0]._id === userId ? Winner : Loser} />}
          title={item.players[0]._id !== userId ? 
          <p style={{margin: "0"}} >Đối thủ: <span>
          <Link to={"/home/user/"+item.players[0]._id}>{item.players[0].username}</Link></span></p> 
          : 
          <p style={{margin: "0"}} >Competitor: <span>
          <Link to={"/home/user/"+item.players[1]._id}>{item.players[1].username}</Link></span></p>}
          description={"Tổng số Game steps: "+item.steps_count}
        />
        <div>{moment(item.created_at).format("DD/MM/YYYY")}</div>
      </List.Item>
    )}
  />
  );
};

export default Articles;
