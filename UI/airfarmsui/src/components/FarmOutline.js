import React, {useState, useMemo} from 'react';
import { Polygon, useMap } from 'react-leaflet'

function FarmOutline(props) {

    const [bounds, setBounds] = useState(props.positions)
    const map = useMap()

    const outerHandlers = useMemo(
        () => ({
          click() {
            setBounds(props.positions)
            map.fitBounds(props.positions)
          },
        }),
        [map],
      )

    return (
        <Polygon 
        color={props.color} 
        positions={props.positions}
        bounds={props.positions}
        eventHandlers={outerHandlers}
        />
    );
}

export default FarmOutline;
