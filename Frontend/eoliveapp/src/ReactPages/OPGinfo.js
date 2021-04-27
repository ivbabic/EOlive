import React, { useState, useEffect }  from 'react';
import MaterialTable from 'material-table';
import axios from "axios";
import './static/style.css';

function OPGinfo() {

    const [data, setData] = useState([])
    const columns = [
        { title: "Katastarke čestice", field: "katastar" },
        { title: "Naselje", field: "naselje" },
        { title: "Površina", field: "površina" },
        { title: "Naziv Gospodarstva", field: "naziv_gosp" },
        { title: "Korisnik", field: "User" }
    ]
    useEffect(() => {
      fetch("http://127.0.0.1:8000/Api/Evidencija/")
        .then(resp => resp.json())
        .then(resp => {
          setData(resp)
        })
    }, [])
  
    return (
      <div>
        <MaterialTable
          title="OPG"
          data={data}
          columns={columns}
        />
      </div>
    );
  }
  
  export default OPGinfo;