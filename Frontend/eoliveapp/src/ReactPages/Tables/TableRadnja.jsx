import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Vrsta Radnje', field: 'Vrsta_Radnje' },
      { title: 'Datum', field: 'Datum', type: 'numeric' },
    ],
    data: [
      { Vrsta_Radnje: 'Prskanje', Datum: 20/11/2019 },
      {
        Vrsta_Radnje: 'Prskanje',
        Datum: 20/11/2019,
      },
    ],
  });

  return (
      <div className="Table1">
            <MaterialTable      
                title="Podaci Radnje"
                columns={state.columns}
                data={state.data}
                editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                        });
                    }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                        setState(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                        });
                        }
                    }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                        });
                    }, 600);
                    }),
                }}
            />
    </div>
  );
}