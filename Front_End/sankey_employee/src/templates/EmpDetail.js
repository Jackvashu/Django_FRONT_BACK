import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
    const {empid} = useParams();
    const [empdata, empdatachange] = useState({})

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/emp-detail/"+empid)
        .then((res) => {
            return res.json();
        })
        .then((resp) => {
            empdatachange(resp);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);
    return ( 
        <div className="card" style={{"textAlign":'left'}}>
            <div className="card-title">
                <h2>Employee Details : </h2>
            </div>
            <div className="card-body">
                {empdata &&
                    <div>
                        <h2>The Employee name is : <b>{empdata.name}</b></h2>
                        <h3>Contact Details : </h3>
                        <h5>Email is : {empdata.email}</h5>
                        <h5>Phone is : {empdata.phone}</h5>
                        <h5>Position is : {empdata.position}</h5>
                        <Link className="btn btn-danger"  to='/'>Back to Listing</Link>
                    </div>
                    
                }
            </div>
        </div>
     );
}
 
export default EmpDetail;   