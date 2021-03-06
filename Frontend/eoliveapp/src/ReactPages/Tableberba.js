import React, { useState, useEffect }  from 'react';
import Grid from '@material-ui/core/Grid'
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import * as actions from './Token/actions/auth';
import './static/style.css';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Berba() {
    var columns = [
        { title: "id", field: "id", hidden: true},
        { title: "Sorta Masline", field: "vrstamaslina" },
        { title: "Datum Berbe", field: "datumb" },
        { title: "Katastarska ??estica", field: "katcest" },
        { title: "Koli??ina ubranog", field: "kolicinaubrano" },
        { title: "Dopprinos ulja", field: "doprinosulja" },
        { title: "Korisnik", field: "User_id", hidden: true }
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    const auth = localStorage.getItem('token')
    const User = localStorage.getItem('id')


    useEffect(() => { 
      axios.get("http://127.0.0.1:8000/api/Berba/", { headers:{
        'Authorization': `token ${auth}`,
        },
      })
         .then(res => {               
              setData(res.data)
          })
          .catch(error=>{
              console.log(error)
          })
    },[])


    const handleRowUpdate = (newData, oldData, resolve) => {
      //validation
      let errorList = []
      newData.User_id = User
      if(newData.vrstamaslina === ""){
        errorList.push("Unesite sortu masline")
      }
      if(newData.datumb === ""){
        errorList.push("Unesite datum format: YYYY-MM-DD")
      }
      if(newData.katcest === ""){
        errorList.push("Unesite katastarsku ??esticu")
      }
      if(newData.kolicinaubrano === ""){
        errorList.push("Unesite naziv koli??inu ubrane masline u KG")
      }
      if(newData.doprinosulja === ""){
        errorList.push("Unesite doprinos ulja po 100kg maslina")
      }
      if(newData.naziv_gosp === ""){
        errorList.push("Unesite naziv gospodarstva")
      }
  
      if(errorList.length < 1){
        axios.put("http://127.0.0.1:8000/api/Berba/"+newData.id, newData, { headers:{
          'Authorization': `token ${auth}`,
          },
        })
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()
          
        })
      }else{
        setErrorMessages(errorList)
        setIserror(true)
        resolve()
  
      }
      
    }
  
    const handleRowAdd = (newData, resolve) => {
      //validation
      let errorList = []
      newData.User_id = User
      if(newData.vrstamaslina === undefined){
        errorList.push("Unesite sortu masline")
      }
      if(newData.datumb === undefined){
        errorList.push("Unesite datum format:YYYY-MM-DD")
      }
      if(newData.katcest === undefined){
        errorList.push("Unesite katastarsku ??esticu")
      }
      if(newData.kolicinaubrano === undefined){
        errorList.push("Unesite naziv koli??inu ubrane masline u KG")
      }
      if(newData.doprinosulja === undefined){
        errorList.push("Unesite doprinos ulja po 100kg maslina")
      }
  
  
      if(errorList.length < 1){ //no error
        axios.post("http://127.0.0.1:8000/api/Berba/", newData,{ headers:{
          'Authorization': `token ${auth}`,
          },
        })
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
      }else{
        setErrorMessages(errorList)
        setIserror(true)
        resolve()
      }
  
      
    }
  
    const handleRowDelete = (oldData, resolve) => {
      
      axios.delete("http://127.0.0.1:8000/api/Berba/"+oldData.id, { headers:{
        'Authorization': `token ${auth}`,
        },
      })
        .then(res => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);
          resolve()
        })
        .catch(error => {
          setErrorMessages(["Delete failed! Server error"])
          setIserror(true)
          resolve()
        })
    }
  
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
            <MaterialTable
              title="OPG"
              data={data}
              columns={columns}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                      
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </div>
    );
}

  
  
export default Berba;

