import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, ActivityIndicator, TouchableOpacity, Modal, TextInput} from "react-native";
import Styles from './Styles'
import {LineChart, PieChart} from "react-native-chart-kit";
import {getTasksByYear} from "../../utils/CRUD";
import Toast from "react-native-simple-toast";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import isEmpty from "validator/es/lib/isEmpty";
import isInt from "validator/es/lib/isInt";


const Chart = () => {

    const [year, setYear] = useState(new Date().getFullYear())
    const [date, setDate] = useState({
        start: new Date(year, 0, 1).getTime().toString(),
        end: new Date(year, 11, 31).getTime().toString()
    })
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState([])
    const [emptyData, setEmptyData] = useState(false)
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
        setDate({
            start: new Date(year, 0, 1).getTime().toString(),
            end: new Date(year, 11, 31).getTime().toString()
        })
    }, [year])
    useEffect(() => {
        getDataByYear(date.start,date.end)
    }, [date])

    const getDataByYear = (start, end) => {
        setIsLoaded(false)
        getTasksByYear(start, end)
            .then((result) => {
                setIsLoaded(true)
                if (result.rows._array.length > 0) {
                    setData(result.rows._array)
                    setEmptyData(false)
                } else {
                    setEmptyData(true)
                    setData([])
                }
            })
            .catch((error) => {
                Toast.show('Erreur, échec de l\'opération !', Toast.LONG)
                console.log(error)
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
        setShowModal(true)
    }
    const onChangeText = (text) => {
        setYearInput(text)
    }
    const hideModal = () => {
        setShowModal(false)
    }
    const onClickOK = () => {
        if (!isEmpty(yearInput) && isInt(yearInput, {gt: 1970})) {
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
                                keyboardType={'numeric'} textAlign={'center'}
                                autoFocus={true} onChangeText={(text) => onChangeText(text)} maxLength={4}/>
                            <View style={Styles.buttonsView}>
                                <TouchableOpacity onPress={hideModal} style={Styles.cancel}>
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
                {emptyData ?
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'Poppins_400Regular',fontSize: 17, color: '#999', alignSelf: 'center'}}>Aucune tache trouvé !</Text>
                    </View>
                    :
                    isLoaded ?
                        <View>
                            <View style={Styles.lineChartView}>
                                <Text style={Styles.lineChartTxt}>Nombre des taches par mois</Text>
                                <LineChart
                                    data={{
                                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                        datasets: [
                                            {
                                                data: countTaskByMonth()
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get("window").width} // from react-native
                                    height={230}
                                    fromZero={true}
                                    chartConfig={chartMonthConfig}
                                    bezier
                                />
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

export default Chart
