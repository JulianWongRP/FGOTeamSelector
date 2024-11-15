import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SectionList, Image, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';


const datasource =[
    {
        data: [
            {key: "Artoria Pendragon", img: "https://th.bing.com/th/id/OIP.ovS2yIsgJPMvvXpNdq5CHwHaKa?w=116&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {key: "Senji Muramasa", img: "https://th.bing.com/th/id/OIP.e2TBt676xxNEYpvwhmzgTwHaLU?w=122&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
        ],
        title: "Saber", bgColor: "aquamarine", icon: "sword"
    },
    {
        data: [
            {key: "Gligamesh", img: "https://th.bing.com/th/id/OIP.PDx6CZCaLpEN8S3MVa09jwHaKf?w=123&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {key: "EMIYA", img: "https://th.bing.com/th/id/OIP.V04kBlMd4RySDfNioNbUmgHaKF?w=208&h=283&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
        ],
        title: "Archer", bgColor: "#D1001c", icon: "bow-arrow"
    },

    {
        data: [
            {key: "Cú Chulainn", img: "https://th.bing.com/th/id/OIP.htgFY3iXRT41B2QWqPe5egHaJO?w=156&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {key: "Romulus-Quirinus", img:"https://th.bing.com/th/id/OIP.11H55IseueDf5Brq5DBO_gHaRX?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
        ],
        title: "Lancer", bgColor: "#e69b00", icon: "spear"
    },
    {
        data: [
            {key: "Medea", img: "data:image/jpeg;base64,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" },
            {key: "Merlin", img: "https://th.bing.com/th/id/OIP.4E67rHophf8bA8c9NzG6ZgAAAA?w=208&h=294&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
        ],
        title: "Caster", bgColor: "#FF1493", icon: "magic-staff"
    },
    {
        data: [
            {key: "Cursed Arm", img: "https://th.bing.com/th/id/OIP.mF_viXgn8I2whY_gn9mkvwAAAA?w=121&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
            {key: "Firt Hassan", img:"https://th.bing.com/th/id/OIP.aKMPLJ_EvqeH48Ag-qS7YwHaJW?w=208&h=262&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
        ],
        title: "Assassin", bgColor: "grey", icon: "skull-outline"
    }
]

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});

const renderItem = ({ item, section }) => {
    return (
        <TouchableOpacity style={[styles.opacityStyle, styles.container]}>
            <Text>{item.key}</Text>
            <Image source={{ uri: item.img }} style={styles.imageStyle} />
        </TouchableOpacity>
    );
};

const Opts = ({ onValueChange }) => {
    const styles = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderColor: 'blue',
            margin: 10
        }
    })

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={onValueChange}
                items={[
                    { label: "Artoria Pendragon", value: "Artoria Pendragon" },
                    { label: "Senji Muramasa", value: "Senji Muramasa" },
                    { label: "Gilgamesh", value: "Gilgamesh" },
                    { label: "EMIYA", value: "EMIYA" },
                    { label: "Cú Chulainn", value: "Cú Chulainn" },
                    { label: "Romulus-Quirinus", value: "Romulus-Quirinus" },
                    { label: "Medea", value: "Medea" },
                    { label: "Merlin", value: "Merlin" },
                    { label: "Cursed Arm", value: "Cursed Arm" },
                    { label: "First Hassan", value: "First Hassan" }
                ]}
            />
        </View>
    );
};

const TeamSelector = () => {
    const [char1, setChar1] = useState('');
    const [char2, setChar2] = useState('');
    const [char3, setChar3] = useState('');

    const handleSubmit = () => {
        Alert.alert(`You have selected ${char1}, ${char2}, ${char3} for your team.`);
    };

    const styles = StyleSheet.create({
        title: {
            fontSize: 40,
            alignSelf: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 20,

        },

        character: {
            fontSize: 20,
            color: 'darkblue'
        }
    })

    return (
        <View>
            <Text style={styles.title}>Select Your Team:</Text>
            <View>
                <Text style={styles.character}>First Character:</Text>
                <Opts onValueChange={(value) => setChar1(value)} />
            </View>
            <View>
                <Text style={styles.character}>Second Character:</Text>
                <Opts onValueChange={(value) => setChar2(value)} />
            </View>
            <View>
                <Text style={styles.character}>Third Character:</Text>
                <Opts onValueChange={(value) => setChar3(value)} />
            </View>
            <Button title="Confirm Characters" color="green" onPress={handleSubmit} />
        </View>
    );
};

const App = () => {
    return (
        <View style={{ marginTop: 30, margin: 20, paddingBottom: 430 }}>
            <TeamSelector />
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                contentContainerStyle={{ margin: 20, borderWidth: 1 }}
                renderSectionHeader={({ section: { title, bgColor, icon } }) => (
                    <View style={[styles.headerContainer, { backgroundColor: bgColor }]}>
                        <Icon name={icon} size={20} color="white" />
                        <Text style={styles.headerText}>{title}</Text>
                        <Button title={"Add Servant"} />
                    </View>
                )}
            />
        </View>
    );
};

export default App;
