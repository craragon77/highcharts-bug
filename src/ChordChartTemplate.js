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
        (function(H){
            var animObject = H.animObject;
            H.seriesTypes.dependencywheel.prototype.animate = function (init) {
                if (!init) {
                    var duration = animObject(this.options.animation).duration,
                        step = (duration / 2) / this.nodes.length;
                    this.nodes.forEach(function (point, i) {
                        var graphic = point.graphic;
                        if (graphic) {
                            graphic.attr({ opacity: 0 });
                            setTimeout(function () {
                                if (graphic && graphic.renderer) {
                                    graphic.animate({ opacity: 1 }, { duration: step });
                                }
                            }, step * i);
                        }
                    }, this);
                    this.points.forEach(function (point) {
                        var graphic = point.graphic;
                        if (!point.isNode && graphic) {
                            graphic.attr({ opacity: 0 })
                                .animate({
                                opacity: 1
                            }, this.options.animation);
                        }
                    }, this);
                }
            };
        }(HighCharts));
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
