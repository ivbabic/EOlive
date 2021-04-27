import React, { useState, useEffect }  from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

  function Berba() {

    const [data, setData] = useState([])
    const columns = [
        { title: 'Vrsta Maslina', field: 'vrstamaslina' },
        { title: 'Datum', field: 'datumb' },
        { title: 'Katastarke čestice', field: 'katcest' },
        { title: 'Kolicina Ubrano u Kg', field: 'kolicinaubrano' },
        { title: 'Doprinos Ulja', field: 'doprinosulja' }
    ]
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/Api/Berba/')
        .then(resp => resp.json())
        .then(resp => {
          setData(resp)
        })
    }, [])
  
    return (
      <div>
        <MaterialTable
          title="Berba"
          data={data}
          columns={columns}
        />
      </div>
    );
  }
  
  export default Berba;