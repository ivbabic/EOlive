import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Naziv tekučine', field: 'nazivtek' },
      { title: 'Kolicina ', field: 'kolicina' },
      { title: 'Datum', field: 'datums' },
    ],
    data: [
      { nazivtek: 'Mehmet', kolicina: 'Baran', datums:20/11/2019 },
    ],
  });

  return (
      <div className="Table1">
            <MaterialTable      
                title="Evidencija Spricanja"
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