import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
    Image,
    StatusBar, // To get status bar height
    ImageBackground, // Import ImageBackground for setting a background image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from "./HomeScreen"; // Keep for button gradients and header fade

// Dummy Data for Questions (You would fetch this from a real source)
// Важно: Убедитесь, что у каждой категории достаточно вопросов, чтобы игра не "застряла".
const questionsData = {
    history: [
        {
            question: 'What medieval fortress overlooks Salzburg from a hilltop?',
            answer: 'Hohensalzburg Fortress',
        },
        {
            question: 'Who was the famous composer born in Salzburg in 1756?',
            answer: 'Wolfgang Amadeus Mozart',
        },
        {
            question: 'In what year was the Treaty of Campo Formio signed, which impacted Salzburg\'s history?',
            answer: '1797',
        },
        {
            question: 'Which archdiocese was historically influential in Salzburg?',
            answer: 'Archdiocese of Salzburg',
        },
        {
            question: 'What major historical event led to Salzburg becoming part of Austria?',
            answer: 'Napoleonic Wars / Congress of Vienna',
        },
    ],
    geography: [
        {
            question: 'Which river flows through the city of Salzburg?',
            answer: 'Salzach River',
        },
        {
            question: 'What mountain range surrounds Salzburg?',
            answer: 'Eastern Alps',
        },
        {
            question: 'Which neighboring country is closest to Salzburg?',
            answer: 'Germany',
        },
        {
            question: 'What is the highest peak visible from Salzburg city center?',
            answer: 'Untersberg',
        },
        {
            question: 'In which Austrian state is Salzburg located?',
            answer: 'Salzburg (federal state)',
        },
    ],
    'arts_music': [
        {
            question: 'What famous musical film was largely shot in Salzburg?',
            answer: 'The Sound of Music',
        },
        {
            question: 'What annual summer festival in Salzburg is dedicated to classical music and opera?',
            answer: 'Salzburg Festival',
        },
        {
            question: 'Which famous opera by Mozart premiered in Vienna, but he spent much time composing in Salzburg?',
            answer: 'The Marriage of Figaro (or Don Giovanni, The Magic Flute)',
        },
        {
            question: 'What is the name of the main concert hall in Salzburg where many classical performances are held?',
            answer: 'Grosses Festspielhaus',
        },
        {
            question: 'Which musical instrument is prominently featured in many Mozart compositions?',
            answer: 'Piano (or harpsichord/fortepiano)',
        },
    ],
    'local_life': [
        {
            question: 'What famous sweet confectionery originated in Salzburg, named after a famous composer?',
            answer: 'Mozartkugel',
        },
        {
            question: 'What is the traditional Austrian dish, often served in Salzburg, consisting of a thin, breaded, pan-fried cutlet of veal or pork?',
            answer: 'Wiener Schnitzel',
        },
        {
            question: 'What famous beer brewery is located near Salzburg and produces a popular Austrian lager?',
            answer: 'Stiegl-Brauwelt (Stiegl Brewery)',
        },
        {
            question: 'What is the name of the traditional clothing worn in Austria, including Salzburg?',
            answer: 'Dirndl (for women) and Lederhosen (for men)',
        },
        {
            question: 'What popular outdoor activity is enjoyed in the mountains surrounding Salzburg?',
            answer: 'Skiing / Hiking',
        },
    ],
    'famous_people': [
        {
            question: 'Which theoretical physicist, known for the Doppler effect, was born in Salzburg?',
            answer: 'Christian Doppler',
        },
        {
            question: 'What famous Baroque architect, known for many buildings in Salzburg, designed the Salzburg Cathedral?',
            answer: 'Santino Solari (first design), Vincenzo Scamozzi and Giovanni Solari (early plans), then largely designed by Santino Solari. Johann Bernhard Fischer von Erlach also significant.',
        },
        {
            question: 'Which Austrian author and poet, known for "The Man Without Qualities," had strong ties to Salzburg?',
            answer: 'Robert Musil',
        },
        {
            question: 'Who was the Archbishop of Salzburg who commissioned many of the Baroque buildings in the city?',
            answer: 'Prince-Archbishop Wolf Dietrich von Raitenau',
        },
        {
            question: 'Besides Mozart, which other famous composer spent part of his life in Salzburg as Kapellmeister?',
            answer: 'Michael Haydn (brother of Joseph Haydn)',
        },
    ]
};

// Helper to get status bar height for dynamic padding
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// Reusable component for category cards
const GameCategoryCard = ({ title, imageSource, onPress, disabled }) => {
    // Adjusted colors for better visibility on image background
    const cardColors = disabled
        ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
        : ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']; // Slightly more opaque

    const textStyle = disabled
        ? styles.gameCategoryCardTextDisabled
        : styles.gameCategoryCardText;

    return (
        <TouchableOpacity
            style={[styles.gameCategoryCardOuter, disabled && styles.gameCategoryCardDisabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={cardColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gameCategoryCardInner}
            >
                <Image source={imageSource} style={styles.gameCategoryCardImage} resizeMode="contain" />
                <Text style={textStyle}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const GamePlayScreen = ({ navigation, route }) => {
    const { players, rounds } = route.params; // Получаем игроков и настройки раундов

    const initialCategories = [
        { id: 'history', title: 'History', image: require('../assets/images/Know/History-1.png') },
        { id: 'geography', title: 'Geography', image: require('../assets/images/Know/History-2.png') },
        { id: 'arts_music', title: 'Arts & Music', image: require('../assets/images/Know/History-3.png') },
        { id: 'local_life', title: 'Local Life', image: require('../assets/images/Know/History-4.png') },
        { id: 'famous_people', title: 'Famous People', image: require('../assets/images/Know/History.png') },
    ];

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    // Доступные категории для выбора в текущем раунде (сбрасываются каждый раунд)
    const [availableCategoriesThisRound, setAvailableCategoriesThisRound] = useState(initialCategories.map(cat => cat.id));
    const [playerScores, setPlayerScores] = useState(players.map(p => ({ ...p, score: 0 })));

    // Состояние для потока вопросов/ответов
    const [currentQuestion, setCurrentQuestion] = useState(null); // Текущий объект вопроса
    // Фаза игры: 'category_selection', 'question_display', 'answer_reveal', 'judgment'
    const [questionPhase, setQuestionPhase] = useState('category_selection');

    // totalRoundsSetting определяет, сколько "кругов" (раундов) будет в игре.
    // Если "Short" - 1 круг, "Medium" - 2 круга, "Long" - 3 круга.
    // В каждом круге каждый игрок выбирает одну категорию и отвечает на один вопрос.
    const totalRoundsSetting = {
        'Short': 1,
        'Medium': 2,
        'Long': 3,
    }[rounds] || 1;

    // Отслеживаем, какие вопросы уже были использованы, чтобы не повторяться.
    // { categoryId: [questionIndex1, questionIndex2, ...] }
    const [usedQuestionsInGame, setUsedQuestionsInGame] = useState({});

    // Эффект для сброса доступных категорий в начале каждого нового раунда
    useEffect(() => {
        // Сбросить категории только если это начало нового раунда (первый игрок и раунд > 1)
        if (currentPlayerIndex === 0 && currentRound > 1) {
            setAvailableCategoriesThisRound(initialCategories.map(cat => cat.id));
        }
    }, [currentRound, currentPlayerIndex]); // Зависит от изменения раунда и текущего игрока

    const handleCategorySelect = (categoryId) => {
        const categoryQuestions = questionsData[categoryId];
        // Получаем использованные индексы вопросов для этой категории
        const usedIndices = usedQuestionsInGame[categoryId] || [];
        // Фильтруем, чтобы получить только индексы доступных вопросов
        const availableQuestionIndices = categoryQuestions
            .map((_, index) => index)
            .filter(index => !usedIndices.includes(index));

        if (availableQuestionIndices.length === 0) {
            Alert.alert('No More Questions', `No more questions available for ${initialCategories.find(c => c.id === categoryId).title}. Please choose another category.`);
            return;
        }

        // Выбираем случайный доступный вопрос
        const randomIndex = availableQuestionIndices[Math.floor(Math.random() * availableQuestionIndices.length)];
        const question = categoryQuestions[randomIndex];

        setCurrentQuestion({ ...question, categoryId, questionIndex: randomIndex });
        setQuestionPhase('question_display');

        // Добавляем вопрос в список использованных в игре
        setUsedQuestionsInGame(prev => ({
            ...prev,
            [categoryId]: [...(prev[categoryId] || []), randomIndex]
        }));

        // Удаляем выбранную категорию из доступных для текущего раунда/хода
        setAvailableCategoriesThisRound(prev => prev.filter(id => id !== categoryId));
    };

    const handleRevealAnswer = () => {
        setQuestionPhase('answer_reveal');
    };

    // Эта функция вызывается, когда игрок нажимает "Да" или "Нет"
    const handleJudgment = (correct) => {
        if (correct) {
            setPlayerScores(prevScores =>
                prevScores.map((p, index) =>
                    index === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
                )
            );
        }
        // После оценки сразу переходим к следующему ходу
        handleNextTurn();
    };

    const handleNextTurn = () => {
        const totalPlayers = players.length;
        const nextPlayerIdx = (currentPlayerIndex + 1) % totalPlayers;
        let nextRound = currentRound;

        // Если все игроки сделали свой ход в текущем раунде, переходим к следующему раунду
        if (nextPlayerIdx === 0) {
            nextRound++;
        }

        // Проверяем, завершена ли игра
        // Игра завершается, когда номер раунда превышает установленное количество раундов.
        if (nextRound > totalRoundsSetting) {
            Alert.alert('Game Over!', 'All rounds completed. Showing results.', [
                { text: 'OK', onPress: () => navigation.pop(3)} // Вам нужно будет создать GameResultsScreen
            ]);
            return;
        }

        setCurrentPlayerIndex(nextPlayerIdx);
        setCurrentRound(nextRound);
        setQuestionPhase('category_selection'); // Сбрасываем фазу для следующего игрока
        setCurrentQuestion(null); // Очищаем текущий вопрос
    };

    const currentPlayer = players[currentPlayerIndex];

    return (
        // Используем ImageBackground вместо SafeAreaView и LinearGradient для основного фона
        <ImageBackground
            source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')} // <--- Замените на путь к вашей фотографии!
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            {/* Наложение для затемнения или осветления фона и улучшения читаемости текста */}
            <View style={styles.overlay}>

                {/* Header Section - сохраняем градиент для эффекта сверху */}

                    {/*<View style={styles.header}>*/}
                    {/*    <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>*/}
                    {/*        <Text style={styles.backIconText}>{'<'}</Text>*/}
                    {/*        <Text style={styles.backButtonText}>Back</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*    /!* Прогресс игры: текущий раунд / всего раундов *!/*/}
                    {/*    <Text style={styles.headerProgress}>{`${currentRound}/${totalRoundsSetting}`}</Text>*/}
                    {/*    <View style={styles.headerRightIconContainer}>*/}
                    {/*        <Text style={styles.pauseIconText}>||</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}

                {/* Main Game Content */}
                <View style={styles.gameContent}>
                    {/* Фаза выбора категории */}
                    {questionPhase === 'category_selection' && (
                        <>
                            {/* Информация о текущем игроке */}
                            <View style={styles.currentPlayerInfo}>
                                <Text style={styles.playerEmojiCircle}>{currentPlayer.emoji}</Text>
                                <Text style={styles.playerNameTurn}>
                                    {`${currentPlayer.name}'s Turn`}
                                </Text>
                            </View>

                            <Text style={styles.chooseCategoryText}>Choose a category</Text>

                            {/* Сетка карточек категорий */}
                            <ScrollView contentContainerStyle={styles.categoryCardsGrid}>
                                {initialCategories.map((category) => (
                                    <GameCategoryCard
                                        key={category.id}
                                        title={category.title}
                                        imageSource={category.image}
                                        onPress={() => handleCategorySelect(category.id)}
                                        // Отключаем, если категория уже недоступна в этом раунде,
                                        // или если вопрос уже активен,
                                        // или если все вопросы из этой категории уже использованы в игре
                                        disabled={
                                            !availableCategoriesThisRound.includes(category.id) ||
                                            currentQuestion !== null || // Нельзя выбирать новую категорию, пока активен вопрос
                                            (usedQuestionsInGame[category.id] && usedQuestionsInGame[category.id].length >= questionsData[category.id].length)
                                        }
                                    />
                                ))}
                            </ScrollView>
                        </>
                    )}

                    {/* Фаза показа вопроса, ответа и судейства */}
                    {(questionPhase === 'question_display' || questionPhase === 'answer_reveal' || questionPhase === 'judgment') && currentQuestion && (
                        <View style={styles.questionDisplayContainer}>
                            {/* Карточка заголовка категории */}
                            <View style={styles.questionHeaderCard}>
                                <Image source={initialCategories.find(c => c.id === currentQuestion.categoryId).image} style={styles.questionCardImage} resizeMode="contain" />
                                <Text style={styles.questionCardTitle}>{initialCategories.find(c => c.id === currentQuestion.categoryId).title}</Text>
                            </View>

                            {/* Иконка текущего игрока в правом верхнем углу */}
                            <View style={styles.playerTurnStatus}>
                                <Text style={styles.playerTurnText}>{currentPlayer.emoji}</Text>
                            </View>

                            {/* Карточка вопроса/ответа */}
                            <View style={styles.questionCard}>
                                <Text style={styles.questionText}>
                                    {currentQuestion.question}
                                </Text>

                                {/* Показать ответ, если фаза 'answer_reveal' или 'judgment' */}
                                {questionPhase === 'answer_reveal' || questionPhase === 'judgment' ? (
                                    <Text style={styles.answerText}>{currentQuestion.answer}</Text>
                                ) : null}

                                {/* Кнопка "Reveal Answer" только в фазе 'question_display' */}
                                {questionPhase === 'question_display' && (
                                    <TouchableOpacity style={styles.revealButton} onPress={handleRevealAnswer}>
                                        <Text style={styles.revealButtonText}>🔍 Reveal Answer</Text>
                                    </TouchableOpacity>
                                )}

                                {/* Кнопки судейства ("Да", "Нет") только в фазе 'answer_reveal' */}
                                {/* Изменено: судейство появляется после раскрытия ответа, и затем переход хода */}
                                {questionPhase === 'answer_reveal' && (
                                    <>
                                        <Text style={styles.judgmentQuestion}>Did {currentPlayer.name} answer correctly?</Text>
                                        <View style={styles.judgmentButtonsContainer}>
                                            <TouchableOpacity
                                                style={[styles.judgmentButton, styles.noButton]}
                                                onPress={() => handleJudgment(false)} // Игрок ответил НЕправильно
                                            >
                                                <Text style={styles.judgmentButtonText}>No</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.judgmentButton, styles.yesButton]}
                                                onPress={() => handleJudgment(true)} // Игрок ответил ПРАВИЛЬНО
                                            >
                                                <Text style={styles.judgmentButtonText}>Yes</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}

                                {/* Навигационные стрелки (если применимо, сейчас просто заглушка) */}
                                {/* Эти стрелки, вероятно, не нужны в текущей логике случайного вопроса за ход */}
                                {/* Если вы хотите реализовать пролистывание вопросов в категории, потребуется более сложная логика */}
                                {questionPhase === 'question_display' && ( // Показываем стрелки только когда вопрос показан, но ответ не раскрыт
                                    <View style={styles.questionNavArrowsContainer}>
                                        <TouchableOpacity style={styles.questionNavArrowButton} onPress={() => Alert.alert('Feature', 'This would navigate to previous question if implemented.')}>
                                            <Text style={styles.questionNavArrowText}>←</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.questionNavArrowButton} onPress={() => Alert.alert('Feature', 'This would navigate to next question if implemented.')}>
                                            <Text style={styles.questionNavArrowText}>→</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                </View>
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
    headerProgress: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    headerRightIconContainer: {
        width: 28, // Adjusted for better touch target
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pauseIconText: {
        color: '#FFF',
        fontSize: 16, // Adjusted for better visibility
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
    },
    gameContent: {
        flex: 1,

        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: Platform.OS === 'ios' ? 20 : 30, // Adjust bottom padding
    },
    // --- Category Selection Phase Styles ---
    currentPlayerInfo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    playerEmojiCircle: {
        fontSize: 60,
        width: 100,
        height: 100,
        fontFamily: 'Merriweather',
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.2)', // Slightly more opaque
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: 100, // Vertically center text
        marginBottom: 10,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    playerNameTurn: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    chooseCategoryText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    categoryCardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    gameCategoryCardOuter: {
        width: '45%',
        aspectRatio: 1,
        margin: 8,
        // borderRadius: 15,
        overflow: 'hidden',

        // Enhanced shadow for cards
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.45,
                shadowRadius: 10,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    gameCategoryCardDisabled: {
        opacity: 0.5,
    },
    gameCategoryCardInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    gameCategoryCardImage: {
        width: '70%',
        height: '70%',
        marginBottom: 5,
    },
    gameCategoryCardText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    gameCategoryCardTextDisabled: {
        color: '#BBBBBB',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    // --- Question Display Phase Styles ---
    questionDisplayContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around', // Distribute items with space
        paddingBottom: Platform.OS === 'ios' ? 20 : 30, // Ensure content isn't cut off by home indicator/bottom
    },
    questionHeaderCard: {
        backgroundColor: 'rgba(255,255,255,0.1)', // Slightly more opaque
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        width: '90%',
        // Enhanced shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    questionCardImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    questionCardTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    playerTurnStatus: {
        position: 'absolute',
        top: -10,
        right: 15,
        width: 55, // Slightly larger
        height: 55,
        borderRadius: 27.5,
        backgroundColor: 'rgba(255,255,255,0.2)', // More opaque
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        // Enhanced shadow
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
    playerTurnText: {
        fontSize: 32, // Larger emoji
        fontFamily: 'Merriweather',
    },
    questionCard: {
        backgroundColor: 'rgba(255,255,255,0.1)', // Slightly more opaque
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center', // Changed to 'center' for question content
        flex: 1,
        width: '90%',
        marginTop: 20, // Add some margin from the header card
        // Enhanced shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
            },
            android: {
                elevation: 15,
            },
        }),
    },
    questionText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 32,
        marginBottom: 20,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    answerText: {
        color: '#FFD700', // Gold color for answer
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0, 0, 0, 0.6)', // Stronger shadow for answer
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    revealButton: {
        backgroundColor: '#303030',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 20,
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
    revealButtonText: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.8,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    judgmentQuestion: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 25,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    judgmentButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    judgmentButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 10,
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
    noButton: {
        backgroundColor: '#F44336', // Red
    },
    yesButton: {
        backgroundColor: '#4CAF50', // Green
    },
    judgmentButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    questionNavArrowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    questionNavArrowButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionNavArrowText: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
    },
});

export default GamePlayScreen;
