import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, ActivityIndicator, TouchableOpacity, Modal, TextInput} from "react-native";
import Styles from './Styles'
import {LineChart, PieChart} from "react-native-chart-kit";
import Toast from "react-native-simple-toast";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from "validator/es/lib/isEmpty";
import isInt from "validator/es/lib/isInt";
import {connect} from "react-redux";


const Chart = (props) => {

    const [year, setYear] = useState(new Date().getFullYear())
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [yearInput, setYearInput] = useState('')
    const [isValidYearInput, setIsYearValid] = useState(true)
    const chartMonthConfig = {
        backgroundGradientFrom: '#14274E',
        backgroundGradientTo: "#14274E",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: .5,
    }
    const chartPieConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }

    useEffect(() => {
        setData(getTasksByYear())
        setIsLoaded(true)
    },[])
    useEffect(() => {
        setIsLoaded(false)
        setData(getTasksByYear)
        setIsLoaded(true)
    },[year])

    const getTasksByYear = () => {
        return  props.tasks.filter((task) => {
            if (new Date(parseInt(task.createdAt)).getFullYear() === year) return task
        })
    }
    const countTaskByMonth = () => {
        let monthCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let dataByMonth = data.map((task) => {
            return new Date(parseInt(task.createdAt)).getMonth()
        })
        for (let i = 0; i <= 12; i++) {
            for (let j = 0; j <= dataByMonth.length - 1; j++) {
                if (i === dataByMonth[j]) {
                    monthCount[i] = monthCount[i] + 1
                }
            }
        }
        return monthCount
    }
    const countEarnAndSpent = () => {
        let earn = 0
        let spent = 0
        data.map((task) => {
            earn += parseFloat(task.earn)
            spent += parseFloat(task.spent)
        })
        return [
            {
                name: "€ Gagner",
                value: earn,
                color: "#14274E",
                legendFontColor: "#000",
                legendFontSize: 13
            },
            {
                name: "€ Dépensé",
                value: spent,
                color: "#900D0D",
                legendFontColor: "#000",
                legendFontSize: 13
            }
        ]
    }
    const onClickYear = () => {
        setYearInput('')
        setShowModal(true)
    }
    const onChangeText = (text) => {
        setYearInput(text.trim())
    }
    const onClickOK = () => {
        if (!isEmpty(yearInput) && !isEmpty(yearInput.trim()) && isInt(yearInput, {gt: 1970})) {
            setIsYearValid(true)
            setShowModal(false)
            setYear(parseInt(yearInput))
        } else {
            setIsYearValid(false)
            Toast.show('L\'année est doit être plus grande que 1970', Toast.LONG)
        }
    }

    return (
        <View style={Styles.chartsContainer}>
            <View style={Styles.headerView}>
                <TouchableOpacity onPress={onClickYear}>
                    <View style={Styles.yearView}>
                        <FontAwesome5 name={'calendar-alt'} color={'#fff'} size={16}/>
                        <Text style={Styles.yearTxt}>{year.toString()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <View style={Styles.countView}>
                    <Text style={Styles.countText}>Taches : {data.length}</Text>
                </View>
                {showModal &&
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showModal}>
                    <View style={[Styles.centeredView, {backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
                        <View style={Styles.modalView}>
                            <Text style={Styles.modalTxt}>Veuillez saisir l'année</Text>
                            <TextInput
                                style={[Styles.inputText, isValidYearInput ? {borderColor: '#fff'} : {borderColor: '#900D0D'}]}
                                keyboardType={'numeric'} textAlign={'center'} value={yearInput.toString()}
                                autoFocus={true} onChangeText={(text) => onChangeText(text)} maxLength={4}/>
                            <View style={Styles.buttonsView}>
                                <TouchableOpacity onPress={() => setShowModal(false)} style={Styles.cancel}>
                                    <Text style={Styles.cancelButton}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClickOK} style={Styles.OK}>
                                    <Text style={Styles.OKButton}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                }
                {isLoaded ?
                    <View style={{flex:1}}>
                        <View style={Styles.lineChartView}>
                            <LineChart
                                data={{
                                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                    datasets: [
                                        {
                                            data: countTaskByMonth()
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width}
                                height={230}
                                fromZero={true}
                                chartConfig={chartMonthConfig}
                                bezier
                            />
                            <Text style={Styles.lineChartTxt}>Nombre des tâches par mois</Text>
                        </View>
                        <View style={Styles.PieChartView}>
                            <PieChart
                                data={countEarnAndSpent()}
                                width={Dimensions.get("window").width}
                                chartConfig={chartPieConfig}
                                height={180}
                                accessor={"value"}
                                backgroundColor={`#fff`}
                                opacity={0.5}
                                paddingLeft={"15"}
                                center={[0, 0]}
                                absolute
                            />
                        </View>
                    </View>
                    :
                    <View style={Styles.spinnerView}>
                        <ActivityIndicator size="large" color={'#47597e'}/>
                    </View>
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(Chart)

