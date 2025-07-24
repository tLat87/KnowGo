import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Platform, // Import Platform for OS-specific styles if needed
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')}
            style={styles.background}
            resizeMode="cover" // Ensure background covers well
        >
            {/* Gradient Overlay for the background image to make text more readable */}
            <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']} // Darker overlay
                style={styles.backgroundOverlay}
            />

            <SafeAreaView style={styles.container}>
                {/* Top Buttons (Rules, Settings) */}
                <View style={styles.topButtonsContainer}>
                    <TouchableOpacity onPress={() => { navigation.navigate('RulesScreen') }} style={styles.iconButton}>
                        <Image source={require('../assets/images/Frame.png')} style={styles.iconImage} />
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('SettingsScreen') }}>*/}
                    {/*    <Image source={require('../assets/images/settings.png')} style={styles.iconImage} />*/}
                    {/*</TouchableOpacity>*/}
                </View>

                {/* Logo */}
                <Image
                    source={require('../assets/images/90800a0c04b0ac5c63d307918e31d095072db3bd.png')}
                    style={styles.logo}
                />

                {/* Menu Buttons Container */}
                <View style={styles.menuButtonsWrapper}>
                    <MenuButton text="Start Game" onPress={() => navigation.navigate('PlayersScreen')} />
                    <MenuButton text="Learn Mode" onPress={() => navigation.navigate('LearnAboutSalzburgScreen')} />
                </View>

                {/* Optional: Favorites Button - uncomment if needed */}
                {/* <MenuButton text="⭐ FAVORITES" onPress={() => navigation.navigate('FavoritesScreen')} /> */}
            </SafeAreaView>
        </ImageBackground>
    );
};

const MenuButton = ({ text, onPress }) => (
    <TouchableOpacity style={styles.menuButtonOuter} onPress={onPress}>
        {/*<LinearGradient*/}
        {/*    colors={['#FF5252', '#D32F2F']} // Red gradient colors*/}
        {/*    start={{ x: 0, y: 0 }}*/}
        {/*    end={{ x: 1, y: 0 }} // Horizontal gradient*/}
        {/*    style={styles.menuButtonInner}*/}
        {/*>*/}
            <Text style={styles.menuButtonText}>{text}</Text>
        {/*</LinearGradient>*/}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire background image
        // backgroundColor: 'rgba(0,0,0,0.5)', // Dark translucent overlay
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around', // Distribute space
        paddingTop: Platform.OS === 'android' ? 20 : 0, // Adjust for Android status bar
        paddingBottom: 20, // Add some bottom padding
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 0 : 30, // Adjust for iOS SafeAreaView already handling top
        zIndex: 10, // Ensure buttons are above other content/overlays
    },
    iconButton: {
        padding: 10, // Make touchable area larger
        // Add subtle shadow for icons if desired
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    iconImage: {
        width: 35, // Adjust size of your icons
        height: 35,
        resizeMode: 'contain',
        tintColor: '#FFFFFF', // Optional: if you want to tint the icons white
    },
    logo: {
        width: 250, // Slightly smaller for better fit
        height: 250,
        resizeMode: 'contain',
        borderRadius: 20, // Keep rounded corners
        marginBottom: 30, // Adjust margin
        // Add a glow/shadow effect to the logo
        ...Platform.select({
            ios: {
                shadowColor: '#FF5252', // Red glow
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 15, // Blurry glow
            },
            android: {
                elevation: 20, // Android elevation for shadow
                // For a true glow on Android, you might need a custom view or library
            },
        }),
    },
    menuButtonsWrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20, // Space between logo and buttons
    },
    menuButtonOuter: {
        width: '80%',
        padding: 20,
        alignItems: 'center',
        borderRadius: 30, // More rounded, pill-like shape
        marginVertical: 10, // More vertical space
        // Enhanced button shadows for a "popping" effect
        ...Platform.select({
            ios: {
                shadowColor: '#D32F2F', // Match gradient end color for shadow
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 10, // Higher elevation for Android
            },
        }),
        overflow: 'hidden', // Crucial for button shadow/borderRadius with LinearGradient
        borderWidth: 1, // Add a thin, subtle border
        borderColor: 'rgba(255,255,255,0.3)', // Light border for definition
    },
    menuButtonInner: {
        paddingVertical: 16, // Slightly more padding
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // No explicit border here, as the outer TouchableOpacity handles it
    },
    menuButtonText: {
        color: '#FFFFFF', // White text for better contrast on red gradient
        fontSize: 20, // Larger text
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textTransform: 'uppercase', // Make text uppercase
        letterSpacing: 1.5, // Add some letter spacing
        // Subtle text shadow for pop
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default HomeScreen;
