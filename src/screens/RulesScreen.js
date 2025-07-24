import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform, // Import Platform for OS-specific styles if needed
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Still need this for gradients

// --- Ensure you have react-native-linear-gradient installed ---
// npm install react-native-linear-gradient
// or yarn add react-native-linear-gradient
// -----------------------------------------------------------

const RulesScreen = ({ navigation }) => {
    return (
        <View style={styles.safeArea}>
            <LinearGradient
                colors={['#A00000', '#700000']} // Darker red to slightly lighter red for the main background
                style={styles.containerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    {/* Header Section */}
                    {/* Header has a subtle gradient for depth */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']} // Dark, fading gradient for header top bar
                        style={styles.headerGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                                {/* Using a custom image for back icon */}
                                <Image
                                    source={require('../assets/images/Icon.png')} // Your custom back arrow image
                                    style={styles.backIcon}
                                />
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Rules</Text>
                            <View style={{ width: 60 }} /> {/* Placeholder for balance */}
                        </View>
                    </LinearGradient>

                    {/* Hero Image with Gradient Overlay for seamless blend */}
                    <View style={styles.heroImageContainer}>
                        <Image
                            source={require('../assets/images/882be151c458023558d396f2b63021b436e262ac.png')}
                            style={styles.heroImage}
                            resizeMode="cover"
                        />
                        {/* Overlay to fade image into the background color */}
                        <LinearGradient
                            colors={['transparent', '#A00000']} // Fade from transparent to the main red
                            style={styles.heroImageOverlay}
                            start={{ x: 0, y: 0.5 }} // Start fading from mid-point
                            end={{ x: 0, y: 1 }}     // End at the bottom
                        />
                    </View>

                    {/* Game Description */}
                    <View style={styles.section}>
                        <Text style={styles.gameTitle}>Know & Go: Salzburg Circle</Text>
                        <Text style={styles.gameDescription}>
                            Know & Go: Salzburg Circle is a friendly trivia game designed for a
                            circle of friends to gather, laugh, and challenge each other's
                            knowledge about the city, on Salzburg from historic landmarks and
                            musical legends to food, art and local life — this game brings
                            people together through fun and discovery. Play it around a table,
                            on a trip, or anywhere you want to turn Salzburg knowledge into
                            joyful connection.
                        </Text>
                    </View>

                    {/* How To Play Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>How To Play</Text>

                        {/* Instruction Cards - using emojis */}
                        <InstructionCard
                            icon="👥" // People
                            title="Gather in a Circle"
                            description="Sit together with 2 to 6 friends. That's your Salzburg Circle!"
                        />
                        <InstructionCard
                            icon="➕" // Plus
                            title="Add Players"
                            description="Enter each player's name and choose a fun emoji — it will represent them during the game!"
                        />
                        <InstructionCard
                            icon="⏱️" // Stopwatch/Clock
                            title="Set Rounds"
                            description="Choose how many rounds to play: short, medium, or long."
                        />
                        <InstructionCard
                            icon="⭐" // Star/Badge
                            title="Pick a Category"
                            description="The current player selects one: History, Geography, Arts & Music, Local Life, Famous People"
                        />
                        <InstructionCard
                            icon="🗣️" // Speech bubble
                            title="Answer Out Loud"
                            description="Read the question and say your answer aloud."
                        />
                        <InstructionCard
                            icon="💡" // Lightbulb
                            title="Reveal the Truth"
                            description="Tap to see the correct answer and a short explanation."
                        />
                        <InstructionCard
                            icon="✅" // Checkmark
                            title="Decide the Point"
                            description="Everyone votes if the answer deserves a point — be fair!"
                        />
                        <InstructionCard
                            icon="➡️" // Arrow to represent next/pass
                            title="Pass the Turn"
                            description="Next player continues. At the end, the one with the most points wins the Circle!"
                            isLast={true}
                        />
                    </View>

                    {/* Learn Mode Section */}
                    <View style={[styles.section, styles.learnModeSection]}>
                        <InstructionCard
                            icon="📖" // Open Book
                            title="Use Learn Mode"
                            description="Use Learn Mode anytime to explore Salzburg's culture without playing — just for the joy of learning."
                            isLast={true} // No border for this one
                        />
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

// Reusable component for instruction cards
const InstructionCard = ({ icon, title, description, isLast }) => (
    <View style={[styles.card, !isLast && styles.cardSeparator]}>
        {/* Optional: Add a subtle gradient to the card background for more depth */}
        <LinearGradient
            colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} // Very subtle white gradient
            style={styles.cardInnerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardIconContainer}>
                    <Text style={styles.emojiIcon}>{icon}</Text>
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardDescription}>{description}</Text>
                </View>
            </View>
        </LinearGradient>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9A0000',
        // paddingTop: 50
    },
    containerGradient: {
        // flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20, // Add some padding at the bottom for scroll
    },
    headerGradient: {
        paddingBottom: 20, // Extend gradient below the header for fade
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 50,
        // paddingTop: Platform.OS === 'android' ? 10 : 0, // Adjust for Android status bar if not handled by SafeAreaView
        paddingBottom: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 24, // Adjust size of your custom back arrow image
        height: 24,
        tintColor: '#FFF', // If your icon is a template, you can tint it
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Merriweather',
        marginLeft: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20, // Slightly larger title
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
    },
    heroImageContainer: {
        width: '100%',
        height: 250, // Adjust height as needed
        position: 'relative', // For absolute positioning of overlay
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroImageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    gameTitle: {
        color: '#FFF',
        fontSize: 24, // Larger title
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Merriweather',
        textAlign: 'center', // Center game title
    },
    gameDescription: {
        color: '#E0E0E0',
        fontSize: 15,
        lineHeight: 22,
        fontFamily: 'Merriweather',
        textAlign: 'center', // Center description for better flow
        opacity: 0.9, // Slightly transparent for depth
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 22, // Larger section title
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 25, // More vertical space
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Subtle text shadow
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    card: {
        borderRadius: 12, // More rounded corners
        marginBottom: 12, // Slightly more space between cards
        // Enhanced shadows for a more lifted, modern look
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
                // For Android, more custom shadows might require a dedicated view
            },
        }),
        overflow: 'hidden', // Ensures gradient and content stay within rounded corners
    },
    cardInnerGradient: {
        padding: 18, // More padding inside the card
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardIconContainer: {
        marginRight: 18, // More space for icon
        marginTop: 2,
    },
    emojiIcon: {
        fontSize: 28, // Larger emoji icons
        fontFamily: 'Merriweather',
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 18, // Slightly larger card titles
        fontWeight: 'bold',
        marginBottom: 6, // More space between title and description
        fontFamily: 'Merriweather',
    },
    cardDescription: {
        color: '#E0E0E0',
        fontSize: 14,
        lineHeight: 21, // Improved line height for readability
        fontFamily: 'Merriweather',
        opacity: 0.85, // Subtle transparency
    },
    cardSeparator: {
        // We can rely more on shadow/margin for separation now,
        // or add a very subtle bottom border if desired for a sharper line.
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    learnModeSection: {
        marginTop: 35, // More space before this section
        marginBottom: 30, // Add bottom margin for visual balance
    },
});

export default RulesScreen;
