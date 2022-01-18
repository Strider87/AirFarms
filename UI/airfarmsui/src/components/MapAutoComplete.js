import React, {useState, useEffect} from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Input, HStack, Button } from '@chakra-ui/react'
import FormikControl from '../components/FormikControl';

function MapAutoComplete(props) {    
    
    const [searchInput, setSearchInput] = useState()
    const [autoComplete, setAutoComplete] = useState()
    
    const onSubmit = (values) => {
        props.geoCoder.geocode({ address: values.address }, (results, status) => {
            if (status === "OK") {
              props.map.setCenter(results[0].geometry.location);
              new props.mapApi.Marker({
                map: props.map,
                position: results[0].geometry.location,
              });
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
          });
    }

    useEffect(() => {
        
        if(autoComplete === undefined && props.mapApi !== undefined)
        {
            setAutoComplete (new props.mapApi.places.Autocomplete(
                searchInput,
                {
                    types: ['address'],
                    componentRestrictions: { country: "in" },
                },
            ))
        }        
        else if(autoComplete !== undefined)
        {
            autoComplete.addListener('place_changed', onPlaceChanged)
        }

    }, [autoComplete, props.mapApi]);

    const validationSchema = Yup.object({
        address: Yup.string()
    })

    const onPlaceChanged = ({ map, addPlace } = props) => {
        const place = autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(18);
        }

        addPlace(place);
        searchInput.blur();
    };

    return (
            
        <Formik
            initialValues={{address:''}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
            return (
                <Form>
                    <FormikControl
                        control='chakraInput'
                        type='search'
                        label='Search location'
                        name='address'
                        color="orange.400"
                        placeholder="Enter a location"
                        setRef={setSearchInput}
                    />
                </Form>
            )
        }}
        </Formik>
    )
}

export default MapAutoComplete
