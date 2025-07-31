import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Platform, // For platform-specific styles
    Linking, // For opening URLs
    Share, // <-- Added for Share functionality
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {toggleSounds} from "../redux/slices/soundSlice"; // Import Redux hooks

// You can use a custom image for the back icon as per your other screens
// For demonstration, I'll use a simple Text for the back arrow or assume an image asset
// If you have 'react-native-vector-icons' uncomment the relevant import:
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather'; // For share icon

const SettingsScreen = ({ navigation }) => {
    // We'll manage notifications locally for now, but you could also move this to Redux
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Get the current sound state from the Redux store
    const soundsEnabled = useSelector(state => state.sound.soundsEnabled);
    const dispatch = useDispatch(); // Get the dispatch function

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
        // You would typically save this setting to AsyncStorage or a global state management here
    };

    const handleToggleSounds = () => {
        // Dispatch the toggleSounds action to update the global state
        dispatch(toggleSounds());
        // The state will be updated in the Redux store, and the useSelector will re-render this component
    };

    const handleShareApp = async () => { // <-- Made asynchronous
        try {
            const result = await Share.share({
                message: 'Try out this awesome app! [Your app link here]', // <-- Updated message
                url: 'https://your-app-store-link.com', // <-- Add your actual app link here
                title: 'Share App', // <-- Title for the share dialog
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                    console.log(`App shared via: ${result.activityType}`);
                } else {
                    // Shared
                    console.log('App successfully shared.');
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed
                console.log('Share dialog dismissed.');
            }
        } catch (error) {
            console.error('Error attempting to share the app:', error.message);
            // You could add a user-facing error message here, e.g., using Toast
        }
    };


    const handleTermsOfUse = () => {
        // Open a URL for terms of use
        Linking.openURL('https://www.termsfeed.com/live/60a52fae-9032-4d2d-85bd-a330e29fb302'); // Replace with your actual terms URL
    };

    return (
        <View style={styles.safeArea}>
            <LinearGradient
                colors={['#A00000', '#700000']} // Consistent deep red gradient
                style={styles.containerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                {/* Header Section */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']} // Dark, fading gradient for header top bar
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                            {/* Option 1: Using a simple text arrow if not using icons library */}
                            <Text style={styles.backIconText}>{'<'}</Text>
                            {/* Option 2: If you have an image asset for back icon like in RulesScreen */}
                            {/* <Image source={require('../assets/images/Icon.png')} style={styles.backIconImage} /> */}
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Settings</Text>
                        <View style={{ width: 60 }} /> {/* Placeholder for balance */}
                    </View>
                </LinearGradient>

                {/* Settings Options */}
                <View style={styles.settingsContent}>
                    {/* Notifications Setting */}
                    {/* Uncomment if you want to re-enable notifications switch */}
                    {/*<View style={styles.settingItem}>*/}
                    {/* <Text style={styles.settingText}>Notifications</Text>*/}
                    {/* <Switch*/}
                    {/* trackColor={{ false: "#767577", true: "#FF5252" }} // Off color, On color (red)*/}
                    {/* thumbColor={notificationsEnabled ? "#F5F5F5" : "#F4F3F4"} // Thumb color based on state*/}
                    {/* ios_backgroundColor="#3e3e3e"*/}
                    {/* onValueChange={toggleNotifications}*/}
                    {/* value={notificationsEnabled}*/}
                    {/* />*/}
                    {/*</View>*/}

                    {/* Sounds Setting - Now connected to Redux */}
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Sounds</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FF5252" }}
                            thumbColor={soundsEnabled ? "#F5F5F5" : "#F4F3F4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={handleToggleSounds} // Use the Redux handler
                            value={soundsEnabled}
                        />
                    </View>

                    {/* Share the app */}
                    <TouchableOpacity style={styles.settingItem} onPress={handleShareApp}>
                        <Text style={styles.settingText}>Share the app</Text>
                        {/* Using a simple text arrow or an icon if available */}
                        <Text style={styles.shareIconText}>↗️</Text>
                        {/* If using react-native-vector-icons for share: */}
                        {/* <Feather name="share" size={24} color="#FFF" /> */}
                    </TouchableOpacity>
                </View>

                {/* Terms Of Use Link */}
                <View style={styles.termsOfUseContainer}>
                    <TouchableOpacity onPress={handleTermsOfUse}>
                        <Text style={styles.termsOfUseText}>Terms Of Use</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9A0000', // Fallback background
    },
    containerGradient: {
        flex: 1,
    },
    headerGradient: {
        paddingBottom: 20, // Extend gradient below the header
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 15,
        paddingTop:50, // Adjust for Android status bar if not handled by SafeAreaView
        paddingBottom: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconText: {
        color: '#FFF',
        fontSize: 24, // Larger for visibility
        marginRight: 5,
        fontWeight: 'bold',
    },
    // If you use an image for the back icon, uncomment and style this:
    // backIconImage: {
    //   width: 24,
    //   height: 24,
    //   tintColor: '#FFF',
    //   marginRight: 5,
    // },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Helvetica Neue', // Consistent font
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue', // Consistent font
    },
    settingsContent: {
        flex: 1, // Take up available space
        paddingHorizontal: 20,
        marginTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth, // Thin separator line
        borderBottomColor: 'rgba(255,255,255,0.2)', // Light translucent white
        marginBottom: 5, // Small margin between items
    },
    settingText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        flex: 1, // Allows text to take available space
    },
    shareIconText: {
        fontSize: 20, // Adjust size for emoji
    },
    // If using react-native-vector-icons for share:
    // shareIcon: {
    //   // No specific style needed if using Feather directly in component
    // },
    termsOfUseContainer: {
        width: '100%',
        alignItems: 'center',
        // paddingBottom: Platform.OS === 'ios' ? 20 : 30, // Adjust for bottom safe area
        paddingBottom: 50,
    },
    termsOfUseText: {
        color: '#F5F5F5', // Slightly off-white for less stark contrast
        fontSize: 16,
        fontFamily: 'System', // Standard font for links
        textDecorationLine: 'underline', // Underline for link
        opacity: 0.8, // Slightly transparent
    },
});

export default SettingsScreen;
