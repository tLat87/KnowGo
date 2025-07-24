import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    Image, // For the person icon
    StatusBar, // To get status bar height
    ImageBackground, // Import ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Keep for button gradients and header fade

// Helper to get status bar height for dynamic padding
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const GameSettingsScreen = ({ navigation, route }) => {
    const { players } = route.params; // Get players from previous screen
    const [selectedRounds, setSelectedRounds] = useState(null); // 'Short', 'Medium', 'Long'

    const handleStartGame = () => {
        if (!selectedRounds) {
            Alert.alert('Choose Rounds', 'Please select the number of rounds to play.');
            return;
        }
        // Navigate to the main game screen, passing players and rounds
        navigation.navigate('GamePlayScreen', { players, rounds: selectedRounds });
    };

    // Get the current player's emoji for the placeholder
    const currentPlayerEmoji = players && players.length > 0 ? players[0].emoji : '❓'; // Default if players not available

    return (
        // Используем ImageBackground вместо LinearGradient для основного фона
        <ImageBackground
            source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')} // <--- Замените на путь к вашей фотографии!
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {/* Наложение для затемнения или осветления фона и улучшения читаемости текста */}
            <View style={styles.overlay}>

                {/* Header Section - сохраняем градиент для эффекта сверху */}
                {/*<LinearGradient*/}
                {/*    colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} // Немного темнее для контраста с фоном*/}
                {/*    style={styles.headerGradient}*/}
                {/*    start={{ x: 0, y: 0 }}*/}
                {/*    end={{ x: 0, y: 1 }}*/}
                {/*>*/}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                            <Text style={styles.backIconText}>{'<'}</Text>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Game Settings</Text>
                        {/*<View style={styles.headerRightIconContainer}>*/}
                        {/*    /!* Info icon or placeholder *!/*/}
                        {/*    <Text style={styles.infoIconText}>i</Text>*/}
                        {/*</View>*/}
                    </View>
                {/*</LinearGradient>*/}

                <View style={styles.contentContainer}>
                    <Text style={styles.chooseRoundsText}>Choose Number of Rounds</Text>

                    <View style={styles.roundButtonsContainer}>
                        {['Short', 'Medium', 'Long'].map((roundOption) => (
                            <TouchableOpacity
                                key={roundOption}
                                style={[
                                    styles.roundButton,
                                    selectedRounds === roundOption && styles.roundButtonSelected,
                                ]}
                                onPress={() => setSelectedRounds(roundOption)}
                            >
                                <Text
                                    style={[
                                        styles.roundButtonText,
                                        selectedRounds === roundOption && styles.roundButtonTextSelected,
                                    ]}
                                >
                                    {roundOption}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Player avatar/icon next to choose rounds */}
                    <View style={styles.playerAvatarPlaceholder}>
                        {/* Using emoji from the first player as an example */}
                        <Text style={styles.playerAvatarEmoji}>{currentPlayerEmoji}</Text>
                        {/* If you have a generic player avatar image, use it here instead of emoji */}
                        {/* <Image source={require('../assets/images/player_avatar_placeholder.png')} style={styles.playerAvatarImage} /> */}
                    </View>
                </View>

                {/* Start Game Button at the bottom - сохраняем градиент для кнопки */}
                <LinearGradient
                    colors={['#FF5252', '#D32F2F']} // Red gradient for button
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.startButtonGradient}
                >
                    <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
                        <Text style={styles.startButtonText}>Start Game</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Полупрозрачное темное наложение для читаемости текста
        justifyContent: 'space-between', // Распределяем элементы по вертикали
    },
    headerGradient: {
        paddingBottom: 20,
        paddingTop: Platform.OS === 'ios' ? STATUSBAR_HEIGHT + 10 : STATUSBAR_HEIGHT + 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 50
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconText: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Merriweather',
        marginRight: 5,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    headerRightIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoIconText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Центрирует содержимое по вертикали
        paddingHorizontal: 20,
    },
    chooseRoundsText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    roundButtonsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.15)', // Чуть более непрозрачный фон
        borderRadius: 25,
        padding: 5,
        marginBottom: 40,
        // Shadow for the container of round buttons
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    roundButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 3,
    },
    roundButtonSelected: {
        backgroundColor: '#FF5252', // Red for selected
        ...Platform.select({
            ios: {
                shadowColor: '#D32F2F', // Red shadow for selected button
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    roundButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    roundButtonTextSelected: {
        color: '#FFF',
    },
    playerAvatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)', // Более непрозрачный фон
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        // Enhanced shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    playerAvatarEmoji: {
        fontSize: 60, // Крупный эмодзи
        lineHeight: 100, // Центрирование эмодзи по вертикали
        textAlign: 'center', // Центрирование эмодзи по горизонтали
    },
    playerAvatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    startButtonGradient: {
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: Platform.OS === 'ios' ? 30 : 40,
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#D32F2F',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.7,
                shadowRadius: 10,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    startButton: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});

export default GameSettingsScreen;
