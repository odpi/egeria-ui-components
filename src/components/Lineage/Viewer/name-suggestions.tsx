import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import {SyntheticEvent} from 'react';
// import { getComponent, lineage } from '@lfai/egeria-js-commons';

export function NameSuggestions() {

    const [open] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    // const onInputChange = (event: SyntheticEvent, value: string, reason: string) => {
    //     if (reason === 'input') {
    //         const nameId: string = event.currentTarget.id
    //         const typeId: string = '#type-' + nameId;
    //         const typeBox: any = getComponent(typeId);
    //         const selectedType: string = typeBox.value;
    //         if (selectedType != null) {
    //             lineage.getNameSuggestions(value, selectedType).then(response => {
    //                 return response.json();
    //             }).then(data => {
    //                 console.log(data)
    //                 // @ts-ignore
    //                 setOptions([...new Set(data)])
    //             });
    //         } else {
    //             console.log('please select a type')
    //         }
    //     }
    // };

    React.useEffect(() => {
        if (!loading) {
            return undefined;
        }
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);


    return (
      <></>
        // <Autocomplete
        //     freeSolo
        //     id={props.itemId}
        //     sx={{width: 300}}
        //     open={open}
        //     onOpen={() => {setOpen(true);}}
        //     onClose={() => {setOpen(false);}}
        //     getOptionLabel={(option: any) => option}
        //     onInputChange={onInputChange}
        //     options={options}
        //     loading={loading}
        //     filterOptions={(x: any) => x}
        //     renderInput={(params: any) => (
        //         <TextField
        //             {...params}
        //             label={props.searchedItem ? "Searched Name" : "Related Name"}
        //             InputProps={{
        //                 ...params.InputProps,
        //                 endAdornment: (
        //                     <React.Fragment>
        //                         {loading ? <Loader size="sm" /> : null}
        //                         {params.InputProps.endAdornment}
        //                     </React.Fragment>
        //                 ),
        //             }}
        //         />
        //     )}
        // />
    );
}
