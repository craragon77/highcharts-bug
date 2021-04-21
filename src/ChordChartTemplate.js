import React, {useState, useEffect} from 'react';
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dependencywheel from 'highcharts/modules/dependency-wheel';
import sankey from 'highcharts/modules/sankey';
// import "./Chord-Chart-Template.css"

sankey(HighCharts)
dependencywheel(HighCharts)

export default function ChartTemplate(props){
    const [initialRender, handleInitialRender] = useState(false);
    function handleChart(){
        const options = props.options
        return(
            <HighchartsReact
                highcharts={HighCharts}
                constructorType={'chart'}
                options={options}
            />
        )
    }


    useEffect(() => {
        handleInitialRender(true)
    }, []);


    return(
        <>
            {initialRender == false? null: handleChart()}
        </>
        
    );
};
