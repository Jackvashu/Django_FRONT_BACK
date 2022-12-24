import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const [query, setQuery] = useState("");    
    const navigate = useNavigate();
    const LoadDetail=(id)=>{
        navigate('/employee/detail/'+id)
    }

    const LoadEdit=(id)=>{
        navigate('/employee/Edit/'+id)
    }

    const LoadRemove=(id)=>{
        if(window.confirm('Do you want to delete?'))
        {
            fetch("http://127.0.0.1:8000/api/emp-delete/"+id+"/", {
            method: "DELETE",
            })
            .then((res) => {
                alert("Delete SuccessFully!!");
                window.location.reload();
            })
            
            .catch((err) => {
                console.log(err.message);
            });
        }

    }
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/emp-list/")
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
        <div className="container">
        <div className="card">
            <div className="card-title">
            <h2>Employee Listing</h2>
            </div>
            <div className="card-body">
            <div className="divbtn">
                <Link to="/employee/create" className="btn btn-success">
                {" "}
                Add New (+)
                </Link>
            </div>
            <div className="search" >
                <input type="text" placeholder="Search..." onChange={e=>setQuery(e.target.value)} className="search"/>
            </div>
            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>E-mail</td>
                    <td>Phone</td>
                    <td>Positions</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {empdata &&
                    empdata.filter((item) => item.name.toLowerCase().includes(query)).map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.position}</td>
                        <td>
                        <a
                            onClick={() => {
                            LoadEdit(item.id);
                            }}
                            className="btn btn-success"
                        >
                            Edit
                        </a>
                        <a
                            onClick={() => {
                            LoadRemove(item.id);
                            }}
                            className="btn btn-danger"
                        >
                            Remove
                        </a>
                        <a
                            onClick={() => {
                            LoadDetail(item.id);
                            }}
                            className="btn btn-primary"
                        >
                            Details
                        </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default EmpListing;
