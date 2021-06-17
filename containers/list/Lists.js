import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable, Button, Text} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";
import {getTasks} from "../../utils/DatabaseConnection";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Lists = (props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getTasks()
            .then((result) => {
                setData(result.rows._array)
            })
            .catch((error) => console.log(error))
    }, [])

    const onPress = (id, model) => {
        props.navigation.navigate('TaskDetails', {
            id: id,
            name: model
        })
    }
    const renderItem = ({item}) => (
        <Pressable onPress={() => {
            onPress(item.id, item.model)
        }} style={item.id % 2 === 0 ? {backgroundColor: '#f6f6f6'} : {backgroundColor: '#fff'}}>
            <Task model={item.model} tel={item.tel} date={item.createdAt} earn={item.earn} spent={item.spent}
                  description={item.description} status={item.status}/>
        </Pressable>
    )

    return (

        <View style={Styles.listsView}>
            <View style={Styles.listsFilter}>
            </View>
            {data.length > 0 ?
                <View>
                    <FlatList
                        contentContainerStyle={{paddingBottom: 150}}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                :
                <View style={Styles.noRowsView}>
                    <Text style={Styles.noRowsText}>Aucune tâche trouvée </Text>
                    <FontAwesome5 name="frown-open" color={'#999'} size={22}/>
                </View>
            }
        </View>
    )
}

export default Lists
