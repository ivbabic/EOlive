import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Naziv prihrane', field: 'nazivprihrane' },
      { title: 'Kolicina ', field: 'kolicinap' },
      { title: 'Datum', field: 'datump' },
    ],
    data: [
      { nazivprihrane: 'Mehmet', kolicinap: 'Baran', datump:20/11/2019 },
    ],
  });

  return (
      <div className="Table1">
            <MaterialTable      
                title="Evidencija prihrane"
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