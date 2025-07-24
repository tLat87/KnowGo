import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert, // For showing validation alerts
    StatusBar, // To get status bar height
    ImageBackground, // Import ImageBackground for setting a background image
} from 'react-native';
// LinearGradient is no longer needed for the background, but might be used for buttons if desired.
// If you want to keep gradient buttons, keep this import. If not, remove it.
import LinearGradient from 'react-native-linear-gradient';

// Helper to get status bar height for dynamic padding
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const PlayersScreen = ({ navigation }) => {
    // Initial players (start with Player 1 and Player 2 as per UI)
    const [players, setPlayers] = useState([
        { id: '1', name: 'Player 1', emoji: '😊' },
        { id: '2', name: 'Player 2', emoji: '😎' },
    ]);
    const [nextPlayerId, setNextPlayerId] = useState(3); // To generate unique IDs

    const addPlayer = () => {
        if (players.length >= 5) {
            Alert.alert('Limit Reached', 'You can add a maximum of 5 players.');
            return;
        }
        // Assign a random emoji for new players
        const emojis = ['🤔', '🤩', '🥳', '🚀', '🌟', '💡', '🌈', '🎉'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        setPlayers([...players, { id: String(nextPlayerId), name: `Player ${nextPlayerId}`, emoji: randomEmoji }]);
        setNextPlayerId(nextPlayerId + 1);
    };

    const removePlayer = (id) => {
        if (players.length <= 2) {
            Alert.alert('Minimum Players', 'You need at least 2 players to start the game.');
            return;
        }
        setPlayers(players.filter(player => player.id !== id));
    };

    const updatePlayerName = (id, newName) => {
        setPlayers(players.map(player =>
            player.id === id ? { ...player, name: newName } : player
        ));
    };

    const handleNext = () => {
        // Basic validation: ensure all player names are not empty
        const allNamesValid = players.every(player => player.name.trim() !== '');
        if (!allNamesValid) {
            Alert.alert('Invalid Player Names', 'Please ensure all player names are filled in.');
            return;
        }
        navigation.navigate('GameSettingsScreen', { players });
    };

    return (
        // Используем ImageBackground вместо LinearGradient для основного фона
        <ImageBackground
            source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')} // <--- Замените на путь к вашей фотографии!
            style={styles.backgroundImage}
            resizeMode="cover" // Или "contain", "stretch" в зависимости от того, как хотите, чтобы изображение масштабировалось
        >
            {/* Наложение для затемнения или осветления фона и улучшения читаемости текста */}
            <View style={styles.overlay}>

                {/* Header Section - теперь это просто View или остается с градиентом, если нужен эффект сверху */}
                {/* Я оставил градиент для хедера, чтобы сохранить "глубину" сверху, но вы можете заменить его на View */}
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
                        <Text style={styles.headerTitle}>Players</Text>

                    </View>
                {/*</LinearGradient>*/}

                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust offset if needed
                >
                    <ScrollView contentContainerStyle={styles.playersContent}>
                        {players.map((player) => (
                            <View key={player.id} style={styles.playerInputRow}>
                                <Text style={styles.playerEmoji}>{player.emoji}</Text>
                                <TextInput
                                    style={styles.playerInput}
                                    onChangeText={(text) => updatePlayerName(player.id, text)}
                                    value={player.name}
                                    placeholder="Enter player name"
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                />
                                {players.length > 2 && ( // Only show remove button if more than 2 players
                                    <TouchableOpacity onPress={() => removePlayer(player.id)} style={styles.removePlayerButton}>
                                        <Text style={styles.removePlayerText}>×</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                        <TouchableOpacity onPress={addPlayer} style={styles.addPlayerButton}>
                            <Text style={styles.addPlayerText}>+</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Next Button at the bottom - сохраняем градиент для кнопки для контраста */}
                <LinearGradient
                    colors={['#FF5252', '#D32F2F']} // Red gradient for button
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.nextButtonGradient}
                >
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>Next</Text>
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
        paddingTop: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIconText: {
        color: '#FFF',
        fontSize: 24,
        marginRight: 5,
        fontFamily: 'Merriweather',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.5)', // Тень для лучшей читаемости
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
        fontFamily: 'Merriweather',
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
        fontFamily: 'Merriweather',
        fontWeight: 'bold',
    },
    keyboardAvoidingView: {
        flex: 1, // Позволяет KeyboardAvoidingView занимать все доступное пространство
    },
    playersContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 60, // Adjust bottom padding for keyboard/home indicator
        flexGrow: 1, // Allows ScrollView to grow
        justifyContent: 'center', // Центрирует содержимое, если его мало
    },
    playerInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)', // Чуть более непрозрачный фон для инпутов
        borderRadius: 12,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
        paddingHorizontal: 18,
        marginBottom: 12,
        // Enhanced shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 5,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    playerEmoji: {
        fontSize: 24,
        marginRight: 12,
        textShadowColor: 'rgba(0,0,0,0.2)', // Тень для эмодзи
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
    },
    playerInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Merriweather',
        paddingVertical: 0,
        textShadowColor: 'rgba(0,0,0,0.3)', // Тень для текста ввода
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    removePlayerButton: {
        marginLeft: 15,
        padding: 8,
    },
    removePlayerText: {
        color: '#FF5252',
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    addPlayerButton: {
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.25)', // Ещё более непрозрачный фон
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        // Enhanced shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 7,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    addPlayerText: {
        color: '#FFF',
        fontFamily: 'Merriweather',
        fontSize: 34,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    nextButtonGradient: {
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
    nextButton: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Merriweather',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        textShadowColor: 'rgba(0, 0, 0, 0.4)', // Более выраженная тень для кнопки
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
});

export default PlayersScreen;
