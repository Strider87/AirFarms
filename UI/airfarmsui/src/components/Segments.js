import React, {useState, useEffect} from 'react'
import {AuthProvider} from '../utils/AuthProvider'
import { MapContainer, TileLayer, Polygon, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import FarmOutline from './FarmOutline'
import {Box} from '@chakra-ui/react'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import '../App.css'

function Segments(props) {
    const [mapLayer, SetMapLayer] = useState([])

    const _onCreated = (e) => {
        const {layerType, layer} = e
        if(layerType === "polygon")
        {
            const {_leaflet_id} = layer
            SetMapLayer((layers) => [
                ...layers,
                {id:_leaflet_id, latlngs:layer.getLatLngs()[0]},
            ]

            )
        }

    };

    const _onEdited = (e) => {
        const {layers: {_layers}} = e
        Object.values(_layers).map(({_leaflet_id, editing}) => {
            SetMapLayer(layers => layers.map(l => l.id === _leaflet_id ? {...l, latlngs: {...editing.latlngs[0]}} : l))
        })
    }

    const _onDeleted = (e) => {
        const {layers: {_layers}} = e
        Object.values(_layers).map(({_leaflet_id}) => {
            SetMapLayer(layers => layers.filter(l => l.id !== _leaflet_id))
        })
    }

    return (
        <Box 
        display='flex' 
        p='3' 
        maxW='bg' 
        alignItems='top'  
        borderWidth="2px" 
        borderRadius="lg"
        ml='2'
        mr='2'
        >
            <MapContainer center={props.center} zoom={18} scrollWheelZoom={false}>
                
                <FeatureGroup>
                    <EditControl position="topright" onCreated={_onCreated} onEdited={_onEdited} onDeleted={_onDeleted}/>
                </FeatureGroup>

                <FarmOutline color="yellow" positions={props.outerShape}/>
                
                <TileLayer
                    //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                    url="https://api.mapbox.com/styles/v1/abshash/ckz0tsbor005e14md0zkggjjy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWJzaGFzaCIsImEiOiJja3owdGh5cWkwMjN2MnVtdmo5YmIwZDhqIn0.aRRyb44d-Lv78rzWr5mNDw"
                />
            </MapContainer>
        </Box>
    )
}

export default Segments
