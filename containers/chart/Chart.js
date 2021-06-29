import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, ActivityIndicator, TouchableOpacity} from "react-native";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Chart = (props) => {

    const [year, setYear] = useState(2021)
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [dataByYear, setDataByYear] = useState([])

    const chartMonthConfig = {
        backgroundGradientFrom : '#82CDFF',
        backgroundGradientTo: "#fff",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientToOpacity: .5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }

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

    const filterDataByYear = () => {
        let filteredData = data.filter((task, index) => {
            let date = new Date(parseInt(task.createdAt))
            let taskYear = date.getFullYear()
            if (taskYear === year ){
                return task
            }
        })
        console.log(filteredData)
    }

    return (
        <View style={Styles.chartsContainer}>
            <View style={Styles.headerView}>
                <TouchableOpacity onPress={filterDataByYear}>
                <View style={Styles.yearView}>
                        <FontAwesome5 name={'calendar-alt'} color={'#fff'} size={15} />
                        <Text style={Styles.yearTxt}>{year}</Text>
                </View>
                </TouchableOpacity>
            </View>
            {isLoaded ?
                <View>
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
                        }}
                    />
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
