import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomSlider,  } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';

let osm = new Tile({
    type: "base",
    title: "Open Street Maps",
    visible: true,
    source: new OSM()
});
let DTM = new Image({
    title: "dtm",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:dtm','style':'dtm'}
    
   
}),
visible: true // Ensure the layer is set to visible


});
var Aspect = new Image({
    title: "aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:aspect','style':'aspect'}
    }),
    opacity: 0.5
});

var CONFIDENCE = new Image({
    title: "confidence",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:confidence','style':'confidence' }
    }),
    visible: false
});
var DUSAF = new Image({
    title: "dusaf",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:dusaf' ,'style':'dusaf'}
    }),
    
});
var FAULTS = new Image({
    title: "faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:faults','style':'faults' }
    }),
    
});
var NDVI = new Image({
    title: "ndvi",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:ndvi','style':'ndvi' }
    }),
    
});
var PLAN = new Image({
    title: "plan",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:plan','style':'plan' }
    }),
    
});

var PROFILE = new Image({
    title: "profile",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:profile','style':'profile' }
    }),
    
});

var RIVERS = new Image({
    title: "rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:rivers','style':'rivers' }
    }),
    
});

var ROADS = new Image({
    title: "roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:roads','style':'roads' }
    }),
    
});

var SLOPE = new Image({
    title: "slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': '	gisgeoserver_11:slope' ,'style':'slope'}
    }),
    
});

var TRAININGSAMPLEPOINTS = new Image({
    title: "TrainingSamplePoints",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:TrainingSamplePoints', 'style':'TrainingSamplePoints'}
    }),
    
});


var TESTINGSAMPLEPOINTS = new Image({
    title: "TestingSamplePoints",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:TestingSamplePoints', 'style':'TestingSamplePoints'}
    }),
    
});

var LANDSLIDESUSCEPTIBILITYMAP = new Image({
    title: "LandslideSusceptibilityMap",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:LandslideSusceptibilityMap','style':'landslideSusceptibilityMap' }
    }),
    
});

var LandslideSusceptibilityMap_RECLASS = new Image({
    title: "LandslideSusceptibilityMap_reclass",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_11:LandslideSusceptibilityMap_reclass','style':'LandSlideSusceptibilityMap_reclass' }
    }),
    
});


//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
})

let overlayLayers = new Group({
    title: "Overlay Layers",
    layers:
        [
        DTM, 
        Aspect,
        CONFIDENCE,
        DUSAF,
        FAULTS,
      NDVI,
     PLAN,
     PROFILE,
     RIVERS,
     ROADS,
     SLOPE,
     TRAININGSAMPLEPOINTS,
     LANDSLIDESUSCEPTIBILITYMAP,
     LandslideSusceptibilityMap_RECLASS,
     TESTINGSAMPLEPOINTS,
     
]
      
      
})

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, overlayLayers],
    view: new View({
        center: fromLonLat([10.1432, 46.0978]),
        zoom: 12
    })
});

// Add the map controls:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
}));

let layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);


//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});

var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);

//Add the Stadia Maps layers
var stadiaWatercolor = new Tile({
    title: "Stadia Watercolor",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_watercolor'
    })
})
var stadiaToner = new Tile({
    title: "Stadia Toner",
    type: "base",
    visible: false,
    source: new StadiaMaps({
        layer: 'stamen_toner'
    })
})
//basemapLayers.addLayer(stadiaWatercolor);
basemapLayers.getLayers().extend([stadiaWatercolor, stadiaToner]);


overlayLayers.getLayers().extend([wfsLayer]);

// This allows to use the function in a callback!
function loadFeatures(response) {
    wfsSource.addFeatures(new GeoJSON().readFeatures(response))
}
// This is not a good practice, but works for the jsonp.
window.loadFeatures = loadFeatures;


var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gis/ows?";
var wfs_url = base_url;
wfs_url += "service=WFS&"
wfs_url += "version=2.0.0&"
wfs_url += "request=GetFeature&"
wfs_url += "typeName=gis%3ACOL_water_areas&"
wfs_url += "outputFormat=text%2Fjavascript&"
wfs_url += "srsname=EPSG:3857&"
wfs_url += "format_options=callback:loadFeatures"

console.log(wfs_url);

map.once('postrender', (event) => {
    // Load the WFS layer
    $.ajax({ url: wfs_url, dataType: 'jsonp' });
    
})

//Add the code for the Pop-up
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new Overlay({
    element: container
});
map.addOverlay(popup);

// The click event handler for closing the popup.
// This ensures that JQuery ($) is already available in the page.
$(document).ready(function () {
    map.on('singleclick', function (event) {
        //This iterates over all the features that are located on the pixel of the click (can be many)
        var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            return feature;
        });

        //If there is a feature, open the popup by setting a position to it and put the data from the feature
        if (feature != null) {
            var pixel = event.pixel;
            var coord = map.getCoordinateFromPixel(pixel);
            popup.setPosition(coord);
            content.innerHTML =
                '<h5> Water Areas</h5><br><b>Name: </b>' +
                feature.get('NAME') +
                '</br><b>Description: </b>' +
                feature.get('HYC_DESCRI');
        } else {
            //Only if the colombiaRoads layer is visible, do the GetFeatureInfo request
            if (ROADS.getVisible()) {
                var viewResolution = (map.getView().getResolution());
                var url = ROADS.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });
                console.log(url);

                if (url) {
                    var pixel = event.pixel;
                    var coord = map.getCoordinateFromPixel(pixel);
                    popup.setPosition(coord);
                    //We do again the AJAX request to get the data from the GetFeatureInfo request
                    $.ajax({ url: url })
                        .done((data) => {
                            //Put the data of the GetFeatureInfo response inside the pop-up
                            //The data that arrives is in HTML
                            content.innerHTML = data;
                        });
                }
            }
        }
    });
});



// Adding map event for pointermove
// The click event handler for closing the popup.
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur(); 
    return false;
};

map.on('pointermove', function(event){
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

map.on('moveend', function(event){
    console.log("moved map");
});