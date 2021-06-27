import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, ActivityIndicator} from "react-native";
import Styles from './Styles'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {getAllTasks} from "../../utils/CRUD";
import Toast from "react-native-simple-toast";


const Chart = (props) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const chartMonthConfig = {
        backgroundGradientFrom : '#14274E',
        backgroundGradientTo: "#14274E",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientToOpacity: .5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    useEffect(() => {
        return props.navigation.addListener('focus', () => {
            getAllTasks()
                .then((result) => {
                    setData(result.rows._array)
                    setIsLoaded(true)
                })
                .catch((error) => {
                    Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                    console.log(error)
                })
        })
    }, [props.navigation])

    const getChart1Data = () => {
        data.map((task, index) => {

        })
    }

    return (
        <View style={Styles.chartsContainer}>
            {isLoaded ?
                <View>
                    <Text>Bezier Line Chart</Text>
                    <LineChart
                        data={{
                            // labels: [1,2,3,4,5,6,7,8,9,10,11,12],
                            // labels: ["Janvier","Février","Mars","Avril","Mai","Juin",'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
                            labels: ["Janvier","Février","Mars","Avril","Mai","Juin"],
                            datasets: [
                                {
                                    data: [
                                        Math.floor(Math.random() * 1000),
                                        Math.floor(Math.random() * 1000),
                                        Math.floor(Math.random() * 1000),
                                        Math.floor(Math.random() * 1000),
                                        Math.floor(Math.random() * 1000),
                                        Math.floor(Math.random() * 1000),
                                    ]
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        // yAxisLabel="$"
                        // yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartMonthConfig}
                        bezier
                        style={{
                            marginVertical: 10,
                        }}
                    />
                </View>
                :
                <View style={Styles.spinnerView}>
                    <ActivityIndicator size="large" color={'#47597e'}/>
                </View>
            }
        </View>
    )
}

export default Chart
