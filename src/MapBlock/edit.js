import {useBlockProps, InspectorControls} from '@wordpress/block-editor'
import {
    TextControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components'
import {share} from '@wordpress/icons';
import {useState, useEffect, useRef, useMemo, useCallback} from 'react';

import './editor.scss'
import './style.scss'
import {MapContainer, TileLayer, Popup, Marker} from 'react-leaflet'


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({attributes, setAttributes})
{
    //TODO : rendre la position dynamique


    const lat = attributes.lat ? attributes.lat : 47.218371;
    const lng = attributes.lng ? attributes.lng : -1.553621;
    const myposition = [lat, lng]
    const center = myposition
    const blockProps = useBlockProps()
    const zoom = 13

    function DraggableMarker()
    {
        const [draggable, setDraggable] = useState(true)
        const [position, setPosition] = useState(myposition)
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
            dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                    }
                },
            }),
            [],
        )
        const toggleDraggable = useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {attributes.popup_content}
        </span>
                </Popup>
            </Marker>
        )
    }

    function DisplayPosition({map})
    {
        const [position, setPosition] = useState(() => map.getCenter())
        const onClick = useCallback(() => {
            map.setView(center, zoom)
        }, [map])

        const onMove = useCallback(() => {
            setPosition(map.getCenter())
        }, [map])

        useEffect(() => {
            map.on('move', onMove)
            return () => {
                map.off('move', onMove)
            }
        }, [map, onMove])
        return (
            <p>
                latitude: {lat}, longitude: {lng}
            </p>
        )
    }

    function ExternalStateExample()
    {
        const [map, setMap] = useState(null)

        const displayMap = useMemo(
            () => (
            <MapContainer
                    center={center}
                    zoom={zoom}
                    scrollWheelZoom={false}
                    ref={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            ),
            [],
        )

        return (
            <div>
                {map ? <DisplayPosition map={map} /> : null}
                {displayMap}
            </div>
        )
    }



    return (
        <div {...blockProps}>
            <MapContainer className="r1-map" center={myposition} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker/>

            </MapContainer>
            <InspectorControls>
                <label>Latitude</label>
                <NumberControl value={lat} onChange={lat => setAttributes({lat})}></NumberControl>
                <label>Longitude</label>
                <NumberControl value={lng} onChange={lng => setAttributes({lng})}></NumberControl>

                <label>popup </label>
                <TextControl value={attributes.popup_content} onChange={popup_content => setAttributes({popup_content})}></TextControl>
            </InspectorControls>
            <ExternalStateExample></ExternalStateExample>
        </div>
    )

}
