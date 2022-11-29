import axios from 'axios';

export const fetchAllPlayers = async () => {
    try{
    const res = await axios.get('/api/players');
    console.log('FETCHALL', res)
    return res.data;
    } catch(err){
        console.log(err)
    }
}

export const fetchSinglePlayer = async (playerId) => {
    try{
        const res = await axios.get(`/api/players/${playerId}`);
        console.log(res.data);
        return res.data;
    } catch(err){
        console.log(err)
    }
}

export const addNewPlayer = async (playerObj) => {
    try{
        const res = await axios.post('/api/players', playerObj);
        console.log(res.data);
        return res.data;
    } catch(err){
        console.log(err)
    }
}

export const removePlayer = async (playerId) => {
    try{
        const res = await axios.delete(`/api/players/${playerId}`);
        console.log(res.data);
        return res.data;
    } catch(err){
        console.log(err)
    }
}
