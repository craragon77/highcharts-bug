import React, {useState, useEffect} from 'react';
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dependencywheel from 'highcharts/modules/dependency-wheel';
import sankey from 'highcharts/modules/sankey';
// import "./Chord-Chart-Template.css"

sankey(HighCharts)
dependencywheel(HighCharts)

export default function ChartTemplate(props){
    console.log(props.data)
    const [initialRender, handleInitialRender] = useState(false);
    function handleChart(){
        const options = {
            title: {text: props.title},
            accessibility: {
                point: {
                  valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
                }
            },
            colors: ['rgb(0,200,0)', 'rgb(192,0,0)', 'rgb(192,192,192)', '#910000', '#1aadce',
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            series:[{
                type: "dependencywheel",
                data: props.data,
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
                            console.log(e.point.from);
                            console.log(e.point.to);
                            console.log(e.point.weight);
                            props.handleCurveClick()
                        }
                        else if (e.point.shapeType === "arc"){
                            console.log('arc fired')
                            console.log(e.point.id);
                            console.log(e.point.sum);
                            props.handleArcClick()
                        }else{
                            return null
                        }
                    }
                }
                
            }],
            chart: {
                backgroundColor: props.color,
                width: '300',
                height: '300',
                
            },
        }
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

    

    
