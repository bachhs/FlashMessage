import React, { Component } from 'react';
import styles from './styles';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default function UserProfileView(route) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                        source={{ uri: route.route.params.user.avatar }} />
                    <Text style={styles.name}>{route.route.params.user.name}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={{ uri: 'data:image/png;base64,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' }} />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>{route.route.params.user.email}   </Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={{ uri: 'https://static.thenounproject.com/png/2450449-200.png' }} />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>{route.route.params.user.location}</Text>
                    </View>
                </View>

                <View style={styles.item}>
                    <View style={styles.iconContent}>
                        <Image style={styles.icon} source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/phone+icon-1320183329252923405.png' }} />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.info}>{route.route.params.user.phoneNumber}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}
