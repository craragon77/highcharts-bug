import React, { Component } from 'react';
//import { loadModules } from 'esri-loader';
import ArcGISMap from "@arcgis/core/Map";
// import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from '@arcgis/core/config.js';

const options = {
  url: 'https://js.arcgis.com/4.6/'
};

class BaseMap extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          status: 'loading',
          center: null,
          zoom: null,
          mapview: null,
          mapDivStyle: {
            padding: 0,
            margin: 0,
            height: '300px',
            width: '300px',
            opacity: '0%'
          }
        }
      }
    
      componentDidMount() {
        console.log("TestGISMap did mount");

        // This is only to make sure these values for center and zoom end up in state
        this.setState((state,props) => 
          {
            return {
              "center":this.props.center, 
              "zoom":this.props.zoom
            };
          }
        );

        // Create map and mapView and stuff them into state
        this.setState((state,props) => 
          {
            const map = new ArcGISMap({ basemap: "streets" });
            let view = new MapView(
              {
                container: "viewDiv",
                map: map,
                center: this.props.center,
                zoom: this.props.zoom
              }
            );
            console.log(view);
            // There are probably better ways to do this, but here we update the map DIV's style to not be transparent
            let newMapDivStyle = Object.assign({}, this.state.mapDivStyle, {"opacity": "100%"});
            return {
              "mapview":view, 
              "status":"ready", 
              "mapDivStyle": newMapDivStyle
            };
          }
        );
      }

      componentDidUpdate(prevProps) {
        console.log("TestGISMap did update");
        if (this.props.center !== prevProps.center) {
          (this.state.mapview).center = this.props.center;
        }
        if (this.props.zoom !== prevProps.zoom) {
          (this.state.mapview).zoom = this.props.zoom;
        }
        if (this.props.status !== prevProps.status) {
          this.setState({"status":this.props.status});
        }
      }

      componentWillReceiveProps(nextProps) {
        // deprecated but functional way to see if props are going to change
        console.log("newProps", nextProps);
      }

      render() {
        return(
          <div /*style={styles.container} */>
            <div id='viewDiv' style={ this.state.mapDivStyle } ></div>
          </div>
        )
    }
}

export default BaseMap;