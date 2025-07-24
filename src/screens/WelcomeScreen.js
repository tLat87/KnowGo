import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    Platform, // Import Platform for conditional styling if needed
} from 'react-native';
// LinearGradient is no longer needed for buttons, but keep it if used elsewhere or remove if not.
// import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
// import HomeScreen from "./HomeScreen"; // This import is not directly used here for rendering but for navigation.

// Первый экран
const WelcomeScreen1 = ({ onNext, onSkip }) => (
    <ImageBackground
        source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
    >
        <SafeAreaView style={styles.safeArea}>
            {/*<TouchableOpacity onPress={onSkip} style={styles.skipButton}>*/}
            {/*    <Text style={styles.skipButtonText}>Skip</Text>*/}
            {/*</TouchableOpacity>*/}
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🎉 Welcome to Know & Go: Salzburg Circle!</Text>
                    <Text style={styles.cardDescription}>
                        Challenge your friends in a game of knowledge about the city of Salzburg.
                        History, music, art, geography, local culture – all in one exciting experience!
                    </Text>
                    {/* Кнопка Next без градиента */}
                    <TouchableOpacity
                        onPress={onNext}
                        style={[styles.actionButton, { backgroundColor: '#FF5252' }]} // Используем первый цвет градиента
                    >
                        <Text style={styles.actionButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </ImageBackground>
);

// Второй экран
const WelcomeScreen2 = ({ onNext, onPrev, onSkip }) => (
    <ImageBackground
        source={require('../assets/images/882be151c458023558d396f2b63021b436e262ac.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
    >
        <SafeAreaView style={styles.safeArea}>
            {/*<TouchableOpacity onPress={onSkip} style={styles.skipButton}>*/}
            {/*    <Text style={styles.skipButtonText}>Skip</Text>*/}
            {/*</TouchableOpacity>*/}
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🎲 Take Turns, Choose Categories</Text>
                    <Text style={styles.cardDescription}>
                        Each player picks a category and answers a Salzburg-themed question aloud. Then
                        reveal the answer and decide if a point is deserved.
                    </Text>
                    <View style={styles.buttonRow}>
                        {/* Кнопка Back без градиента */}
                        <TouchableOpacity
                            onPress={onPrev}
                            style={[styles.actionButton, styles.backButton]} // Используем первый цвет градиента
                        >
                            <Text style={styles.actionButtonText}>Back</Text>
                        </TouchableOpacity>
                        {/* Кнопка Next без градиента */}
                        <TouchableOpacity
                            onPress={onNext}
                            style={[styles.actionButton, { backgroundColor: '#FF5252' }]} // Используем первый цвет градиента
                        >
                            <Text style={styles.actionButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </ImageBackground>
);

// Третий экран
const WelcomeScreen3 = ({ onPrev, onFinish }) => (
    <ImageBackground
        source={require('../assets/images/5337d2b886d8966efd30796efa9ae901c296a29c.png')} // Замените на нужное изображение
        style={styles.backgroundImage}
        resizeMode="cover"
    >
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🚀 Ready to Begin?</Text>
                    <Text style={styles.cardDescription}>
                        Let’s dive into the Salzburg experience and see who knows the city best!
                    </Text>
                    <View style={styles.buttonRow}>
                        {/* Кнопка Back без градиента */}
                        <TouchableOpacity
                            onPress={onPrev}
                            style={[styles.actionButton, styles.backButton]} // Используем первый цвет градиента
                        >
                            <Text style={styles.actionButtonText}>Back</Text>
                        </TouchableOpacity>
                        {/* Кнопка Start без градиента */}
                        <TouchableOpacity
                            onPress={onFinish}
                            style={[styles.actionButton, styles.startButton]} // Используем первый цвет градиента
                        >
                            <Text style={styles.actionButtonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </ImageBackground>
);

// Обёртка со Swiper и управлением переходами
const AppOnboarding = ({ navigation }) => {
    const swiperRef = useRef(null);
    const [index, setIndex] = useState(0); // This state is not used to control Swiper directly but for logic

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(1, true); // Use true for animation
        }
    };

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.scrollBy(-1, true); // Use true for animation
        }
    };

    const handleSkipOrFinish = () => {
        // Here you would typically navigate to your main app screen
        navigation.navigate('HomeScreen'); // Make sure 'HomeScreen' is a valid route
    };

    return (
        <Swiper
            ref={swiperRef}
            loop={false}
            showsButtons={false}
            showsPagination={true}
            scrollEnabled={false} // Disable manual swiping
            // onIndexChanged={(idx) => setIndex(idx)} // Update index state if needed for other logic
        >
            <WelcomeScreen1 onNext={handleNext} onSkip={handleSkipOrFinish} />
            <WelcomeScreen2 onNext={handleNext} onPrev={handlePrev} onSkip={handleSkipOrFinish} />
            <WelcomeScreen3 onPrev={handlePrev} onFinish={handleSkipOrFinish} />
        </Swiper>
    );
};

// Стили (обновлены для кнопок)
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    safeArea: {
        flex: 1,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginTop: Platform.OS === 'android' ? 20 : 50, // Adjust for iOS safe area
        marginRight: 20,
        padding: 10,
    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Merriweather', // Убедитесь, что этот шрифт доступен
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Добавлен текст-тень для лучшей читаемости
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40, // Отступ снизу для карточки
    },
    card: {
        backgroundColor: 'rgba(101, 0, 4, 0.85)', // Сделал фон карточки полупрозрачным
        borderRadius: 20,
        padding: 30,
        alignItems: 'flex-start',
        marginHorizontal: 20, // Отступы по бокам для карточки
        // Тени для карточки
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    cardTitle: {
        color: 'white',
        fontFamily: 'Merriweather', // Убедитесь, что этот шрифт доступен
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Добавлен текст-тень
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    cardDescription: {
        fontFamily: 'Merriweather', // Убедитесь, что этот шрифт доступен
        color: 'white',
        fontSize: 20,
        lineHeight: 28, // Увеличил межстрочный интервал для лучшей читаемости
        marginBottom: 30,
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Добавлен текст-тень
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 15, // Увеличил отступ между кнопками
        width: '100%',
        justifyContent: 'space-between',
    },
    actionButton: { // Общий стиль для всех кнопок действий (Next, Back, Start)
        // flex: 1, // Чтобы кнопки делили доступное пространство
        paddingVertical: 15,
        paddingHorizontal: 50,
        // width: 300,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // Добавлены тени для кнопок
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    actionButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Merriweather', // Убедитесь, что этот шрифт доступен
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Добавлен текст-тень
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    backButton: {
        backgroundColor: '#666666', // Темно-серый для кнопки "Back"
    },
    startButton: {
        backgroundColor: '#4CAF50', // Зеленый для кнопки "Start"
    },
    // Удалены стили nextButton и gradient, так как они больше не используются
    // nextButton: { ... },
    // gradient: { ... },
});

export default AppOnboarding;
