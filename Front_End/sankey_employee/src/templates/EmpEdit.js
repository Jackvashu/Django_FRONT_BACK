import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EmpEdit = () => {
    const {empid} = useParams();
    const [name, nameChange] = useState("");
    const [email, emailChange] = useState("");
    const [phone, phoneChange] = useState("");
    const [position, positionChange] = useState("");
    const [validation, valChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/emp-detail/"+empid)
        .then((res) => {
            return res.json();
        })
        .then((resp) => {
            console.log(resp)
            nameChange(resp.name)
            emailChange(resp.email)
            phoneChange(resp.phone)
            positionChange(resp.position)
            // empdatachange(resp);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
        // console.log({name,email,phone,position})
        const empdata = { name, email, phone, position };
    
        fetch("http://127.0.0.1:8000/api/emp-update/"+empid+"/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(empdata),
        })
          .then((res) => {
            alert("Saved SuccessFully!!");
            navigate("/");
          })
          
          .catch((err) => {
            console.log(err.message);
          });
      };

    return ( 
        <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="from-group">
                      <label>Name</label>
                      <input
                        value={name}
                        onChange={(e) => nameChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="from-group">
                      <label>Email</label>
                      <input
                        required
                        value={email}
                        onMouseDown = {(e) => valChange(true)}
                        onChange={(e) => emailChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {email.length == 0 && validation && (
                        <span className="text-danger">
                          Enter Email Address.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="from-group">
                      <label>Phone</label>
                      <input
                        required
                        value={phone}
                        onMouseDown = {(e) => valChange(true)}
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {phone.length == 0 && validation && (
                        <span className="text-danger">Enter Phone Number.</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="from-group">
                      <label>position</label>
                      <input
                        value={position}
                        onChange={(e) => positionChange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="from-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> );
}
 
export default EmpEdit;