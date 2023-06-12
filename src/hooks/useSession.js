import axios from 'axios';

const useSession = async () => {
    await axios.get('http://localhost:5000/session').then(res => {
        if(res.data.valid) {
            return res.data;
        }
    }). catch(err => console.log(err));
};


export default useSession;