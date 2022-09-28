import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Radio({ selected, options = [], horizontal = false, onChangeSelect }) {

    return (
        <View style={horizontal ? styles.horizontal : styles.vertical}>
            {options.map((opt, key) => (
                <TouchableOpacity
                    key={key}
                    onPress={() => onChangeSelect(opt, key)}
                    style={[
                        styles.optContainer,
                        { marginLeft: horizontal ? 10 : 0, marginTop: horizontal ? 10 : 0 }
                    ]}
                >
                    <View style={styles.outlineCircle}>
                        {selected === key && <View style={styles.innerCircle} />}
                    </View>
                    <Text
                        style={[styles.txt, { color: selected === key ? '#444' : '#777' }]}
                    >
                        {opt}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vertical: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    optContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    outlineCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: '#777',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#40c4de',
    },
    txt: {
        fontSize: 14,
        marginLeft: 4
    }
})