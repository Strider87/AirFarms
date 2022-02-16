import React, {useState, useEffect} from 'react'
import { useLocation } from "react-router-dom"
import NavBar from '../components/NavBar'
import * as L from 'leaflet'
import Segments from '../components/Segments'
import DiscussionBoardCard from '../components/DiscussionBoardCard'
import ProjectGroup from '../components/ProjectGroup'
import {AuthProvider} from '../utils/AuthProvider'
import {
    Grid,
    GridItem,
    Skeleton,
    Stack
} from '@chakra-ui/react'

function Farm() {
    const location = useLocation()
    const [discussionBoard, SetDiscussionBoard] = useState()
    const [outerShape, SetOuterShape] = useState()
    const farm = location.state?.farmId
    const [center, SetCenter] = useState([51.505, -0.09])

    function get_polygon_centroid(pts) {
        var first = pts[0], last = pts[pts.length-1];
        if (first[0] !== last[0] || first[1] !== last[1]) pts.push(first);
        var twicearea=0,
        x=0, y=0,
        nPts = pts.length,
        p1, p2, f;
        for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
           p1 = pts[i]; p2 = pts[j];
           f = (p1[1] - first[1]) * (p2[0] - first[0]) - (p2[1] - first[1]) * (p1[0] - first[0]);
           twicearea += f;
           x += (p1[0] + p2[0] - 2 * first[0]) * f;
           y += (p1[1] + p2[1] - 2 * first[1]) * f;
        }
        f = twicearea * 3;
        return [ x/f + first[0], y/f + first[1] ];
     }


    useEffect(() => {
        let config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const authProvider = AuthProvider()
        authProvider.authGet(`http://127.0.0.1:8000/farm/perform/farm/discussionboard/${farm}/`, config)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            SetDiscussionBoard(res.data)
        })
        .catch(error => {
            console.log(error);
            console.log(error.data);
        })

        authProvider.authGet(`http://127.0.0.1:8000/farm-maps/mapfarm/handle/${farm}/`, config)
        .then(res =>{
            console.log(res);
            console.log(res.data);
            let centerPointGeo = [get_polygon_centroid(res.data.geometry.coordinates[0]),]
            let centerPointCoord = [centerPointGeo[0][1], centerPointGeo[0][0]]
            let geom = L.GeoJSON.coordsToLatLngs(res.data.geometry.coordinates, 1, false)
            SetCenter(centerPointCoord)
            SetOuterShape(geom)
        })
        .catch(error => {
            console.log(error);
            console.log(error.data);
        })
        
     }, [])

    return (            
        <>
            <NavBar/>
            <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            >
                {outerShape === undefined || outerShape === null? null : <GridItem rowSpan={1} colSpan={3}><Segments farm={farm} outerShape={outerShape} center={center}/></GridItem>}
                
                <GridItem rowSpan={1} colSpan={1}>{discussionBoard !== undefined ? <DiscussionBoardCard discussion={discussionBoard.id} title={discussionBoard.title}/>: <Stack>
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                        </Stack>} 
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>{discussionBoard !== undefined ? <DiscussionBoardCard discussion={discussionBoard.id} title={discussionBoard.title}/>: <Stack>
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                        </Stack>} 
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>{farm !== undefined ? <ProjectGroup farm={farm}/>: <Stack>
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                            <Skeleton height='20px' />
                                                        </Stack>} 
                </GridItem>
            </Grid>
        </>
        
    )
}

export default Farm
