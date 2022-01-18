import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { userLocationAction} from '../storeActions';

function LocationProvider(props) {

    const dispatch = useDispatch()

    const getPosition = () => {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(setPosition, posError);
            // Passing in a success callback and an error callback fn
        } 
        else 
        {
            //TODO: Add error handling
            alert("Sorry, Geolocation is not supported by this browser."); 
            // Alert is browser does not support geolocation
        }
    }

    // Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
    const posError = () => {
        if (navigator.permissions) 
        {
            navigator.permissions.query({ name: 'geolocation' })
            .then(res => {
                if (res.state === 'denied') 
                {
                    //TODO: Add error handling
                    alert('Enable location permissions for this website in your browser settings.')
                }
            }
            )
        }
        else 
        {
            //TODO: Add error handling
            alert('Unable to access your location. You can continue by submitting location manually.') 
            // Obtaining Lat/long from address necessary
        }
    }

    // Geolocation success callback fn
    const setPosition = (position) => {
        let loc = {
            lat : position.coords.latitude ,
            lng : position.coords.longitude 
        }
        // You have obtained longitude coordinate!
        dispatch(userLocationAction(loc));
        // Using dispatch to modify lat store state
        // Using dispatch to modify long store state
        //convertToAddress(lat, long) 
        // Will convert lat/long to City, State, & Zip code
    }

    useEffect(() => {
        if(props.currentLocation)
        {
            getPosition()
        }

    }, []);

    return (
        <div>
            
        </div>
    )
}

export default LocationProvider
