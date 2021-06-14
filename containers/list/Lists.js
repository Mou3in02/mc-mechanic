import React from 'react';
import {View, FlatList} from 'react-native';
import Styles from "./Styles"
import Task from "../../components/task/Task";


const Lists = () => {

    const data = [
        {
            id: 1,
            model: 'Megan 3',
            tel: 29284808,
            date: new Date().getTime(),
            earn: 220,
            spent: 170,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: true
        },
        {
            id: 2,
            model: 'Megan 3',
            tel: 29284808,
            date: 190000,
            earn: 150,
            spent: 110,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: false
        },
        {
            id: 3,
            model: 'Megan 3',
            tel: 29284808,
            date: 190000,
            earn: 220,
            spent: 170,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: true
        },
        {
            id: 4,
            model: 'Megan 3',
            tel: 29284808,
            date: 190000,
            earn: 220,
            spent: 170,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: true
        },
        {
            id: 5,
            model: 'Megan 3',
            tel: 29284808,
            date: 190000,
            earn: 220,
            spent: 170,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: true
        },
        {
            id: 6,
            model: 'Megan 3',
            tel: 29284808,
            date: 190000,
            earn: 220,
            spent: 170,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eum quae.',
            status: true
        }
    ]
    const renderItem = ({item}) => (
        <Task model={item.model} tel={item.tel} date={item.date} earn={item.earn} spent={item.spent}
              description={item.description} status={item.status}/>
    )
    return (
        <View style={Styles.listsView}>
            <View style={Styles.listsFilter}>
            </View>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 150 }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default Lists
