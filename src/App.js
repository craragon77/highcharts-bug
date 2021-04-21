import React, {useState, useEffect} from 'react';
import ChordChartTemplate from './ChordChartTemplate';
import dummy_data from './data.json';
// import TestGISMap from './TestGISMap';
import SelectMenu from './SelectMenu';
import './Cows.css';

export default function Cows(){
    const [cropland, handleCropLand] = useState(true);
    const [pasture, handlePasture] = useState(false);
    const [range, handleRange] = useState(false);
    //data will be fetched from this component, but is null for now; data fetched from 
    const [theData, handleData] = useState(null);
    const [color, handleColor] = useState("rgb(15, 236, 151)");
    const [center, handleCenter] = useState([-72.575386, 44.260059]);
    const [zoom, handleZoom] = useState(10);
    const [status, handleStatus] = useState("loading");
    const [landUse, handleLandUse] = useState([])
    const [initialRender, handleInitialRender] = useState(false);
  //   const [defaultDropdown, handleDefaultDropdown] = useState({
  //     "landuse_id": 1,
  //     "landuse": "Crop"
  // })
    const [options, handleChartOptions] = useState({
        title: 'test wheel',
        accessibility: {
            point: {
              valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
            }
        },
        colors: ['rgb(0,200,0)', 'rgb(192,0,0)', 'rgb(192,192,192)', '#910000', '#1aadce',
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        series:[{
            type: "dependencywheel",
            data: dummy_data.data,
            name: 'Dependency wheel series',
            dataLabels: {
                color: '#333',
                textPath: {
                    enabled: true,
                    attributes: {
                        dy: 5
                    }
                },
                distance: 10,
                fontWeight: 'light'
            },
            size: '95%',
            events: {
                click: (e) => {
                    if(e.point.shapeType === "path"){
                        handleCurveClick()
                    }
                    else if (e.point.shapeType === "arc"){
                        handleArcClick()
                    }else{
                        return null
                    }
                }
            }
            
        }],
        chart: {
            backgroundColor: "rgb(15, 236, 151)",
            width: '300',
            height: '300',
            
        },
    })

    function handleCropLandClick () {
        handleCropLand(true);
        handlePasture(false);
        handleRange(false);
        handleColor("rgb(15, 236, 151)");
        handleCenter([-112.0391,46.5891]);
        handleChartOptions(prevState => ({
            ...prevState,
            chart: {
                ...prevState.chart,
                backgroundColor: "rgb(15, 236, 151)"
            }
        }))  
    };

    function handlePastureClick(){
        handleCropLand(false);
        handlePasture(true);
        handleRange(false);
        handleColor("rgb(255, 165, 0)")
        handleCenter([-75.634,41.395]);
        handleChartOptions(prevState => ({
            ...prevState,
            chart: {
                ...prevState.chart,
                backgroundColor: "rgb(255, 165, 0)"
            }
        }))  
    };

    function handleRangeClick(){
        handleCropLand(false);
        handlePasture(false);
        handleRange(true);
        handleColor("rgb(238, 130, 238)");
        handleCenter([-106.6504, 35.084]);
        handleChartOptions(prevState => ({
            ...prevState,
            chart: {
                ...prevState.chart,
                backgroundColor: "rgb(238, 130, 238)"
            }
        }))  
    };

    function handleArcClick(){
        handleColor("rgb(36, 177, 255)");
        handleCenter([-76.6122, 39.2904]);
        handleCropLand(false);
        handlePasture(false);
        handleRange(false);
        handleChartOptions(prevState => ({
            ...prevState,
            chart: {
                ...prevState.chart,
                backgroundColor: "rgb(36, 177, 255)"
            }
        }))    
    }

    function handleCurveClick(){
        handleColor("rgb(255, 255, 0)");
        handleCenter([-157.8583, 21.3069]);
        handleCropLand(false);
        handlePasture(false);
        handleRange(false);
        handleChartOptions(prevState => ({
            ...prevState,
            chart: {
                ...prevState.chart,
                backgroundColor: "rgb(255, 255, 0)"
            }
        }))
    };

    function fetchChordChartData(landUse){
        //the landuse is the id that we want
        console.log(landUse);
        fetch('https://nrcs-core-api-dev.stone-env.net:8443/getchordchart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({'landuseid': landUse })
        })
        .then(res => {
            if(res.ok){
                console.log('the res is ok')
                console.log(res)
                return res.json();
            };
        })
        .then(resJson => {
            let formattedData = resJson[0].get_chordchart;
            console.log(resJson);
            console.log(resJson[0].get_chordchar.length);
            handleChartOptions(prevState => ({
                ...prevState,
                series: {
                    ...prevState.series,
                    data: formattedData
                }
            }))
        })
        .catch(e => console.warn(e))
    };

    function fetchLandUseIds(){
      //final answer endpoint: use get_landuse
        fetch(`https://nrcs-core-api-dev.stone-env.net:8443/get_landuse`)
        .then(res => {
            if(res.ok){
                return res.json();
            }
        })
        .then(resJson => {
            let dataResponse = resJson[0].getlanduse;
            handleLandUse(dataResponse);
            console.log(dataResponse)
        })
        .catch(e => console.warn(e))
    };

    useEffect(() => {
        fetchLandUseIds();
        handleInitialRender(true);
    }, [])

    function handleMapOfUndefined(){
      if(initialRender == true){
        return <SelectMenu options={landUse} fetchChordChartData={fetchChordChartData} initialRender={initialRender}/>
      }else{
        return <SelectMenu options={landUse} fetchChordChartData={fetchChordChartData} initialRender={initialRender}/>
      }
    }
    
    return(
        <div className="cow-outer-container">
            <div className="cows-container">
                <h1>Welcome to CORE</h1>
                {/* <img src={cows} alt="cows!"/> */}
            </div>
            <h3>Please select your resource</h3>
            <label htmlFor="DummyDropDown" id="dropdown"></label><br/>
            {handleMapOfUndefined()}
            {/* <div className="land-cover-button-container">
                <LandCoverButton name={"Cropland"} landStateChange={handleCropLandClick}/>
                <LandCoverButton name={"Pasture"} landStateChange={handlePastureClick}/>
                <LandCoverButton name={"Range"} landStateChange={handleRangeClick}/>
            </div> */}
            <div className="chart-container">
            <ChordChartTemplate
                options = {options}
            />
                {/* <TestGISMap 
                    center={center} 
                    zoom={zoom}
                    status={status}
                    handleRangeClick={handleRangeClick}
                /> */}
            </div>
        </div>
    )
};
