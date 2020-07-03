import React, { Component } from "react";
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { connect } from 'react-redux';

class HandleNotifications extends Component {
    constructor(props) {
        super(props);
        this.getToken = this.getToken.bind(this);
        this.requestPermission = this.requestPermission.bind(this);
        this.checkNotificationPermission = this.checkNotificationPermission.bind(this);
    }

    componentDidMount() {
        this.checkNotificationPermission();
        this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
            // Process your notification as required
        });

        this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
        });

        firebase.notifications().getInitialNotification()
        .then((notificationOpen: NotificationOpen) => {
            if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;  
            }
        });
    }

    componentWillUnmount() {
        this.removeNotificationDisplayedListener();
        this.removeNotificationListener();
        this.removeNotificationOpenedListener();
    }

    // firebase token for the user
    async getToken(){
        firebase.messaging().getToken().then((fcmToken) => {
            this.props.setTokenDevice(fcmToken);
            // console.log(fcmToken)
        });
    }
  
    // request permission if permission diabled or not given
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
        } catch (error) {}
    }
  
    // if permission enabled get firebase token else request permission
    async checkNotificationPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken() // call function to get firebase token for personalized notifications.
        } else {
            this.requestPermission();
        }
    }
  
    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTokenDevice : (token) => dispatch({
            type: 'SET_TOKEN_DEVICE',
            payload: token
        }),
    }
}

export default connect(null, mapDispatchToProps)(HandleNotifications);