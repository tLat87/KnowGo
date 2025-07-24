// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     TouchableOpacity,
//     Image,
//     Platform,
//     ImageBackground,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
//
// const CategoryDetailScreen = ({ navigation, route }) => {
//     const { categoryTitle, detailImage, detailTitle, detailDescription } = route.params;
//
//     return (
//         <View style={styles.safeArea}>
//             <ImageBackground
//                 source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')} // ← замените на своё изображение
//                 style={styles.backgroundImage}
//                 resizeMode="cover"
//             >
//                 <LinearGradient
//                     colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
//                     style={styles.overlay}
//                 >
//                     {/* Header */}
//                     <LinearGradient
//                         colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
//                         style={styles.headerGradient}
//                     >
//                         <View style={styles.header}>
//                             <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                                 <Text style={styles.backIconText}>{'<'}</Text>
//                                 <Text style={styles.backButtonText}>Back</Text>
//                             </TouchableOpacity>
//                             <Text style={styles.headerTitle}>{categoryTitle}</Text>
//                             <View style={{ width: 60 }} />
//                         </View>
//                     </LinearGradient>
//
//                     {/* Content Card */}
//                     <View style={styles.contentCardOuter}>
//                         <Image source={detailImage} style={styles.detailImage} resizeMode="contain" />
//                         <Text style={styles.detailTitle}>{detailTitle}</Text>
//                         <Text style={styles.detailDescription}>{detailDescription}</Text>
//                     </View>
//
//                     {/* Navigation Arrows */}
//                     {/*<View style={styles.navigationArrowsContainer}>*/}
//                     {/*    <TouchableOpacity style={styles.navArrowButton} onPress={() => console.log('Previous item')}>*/}
//                     {/*        <Text style={styles.navArrowText}>←</Text>*/}
//                     {/*    </TouchableOpacity>*/}
//                     {/*    <TouchableOpacity style={styles.navArrowButton} onPress={() => console.log('Next item')}>*/}
//                     {/*        <Text style={styles.navArrowText}>→</Text>*/}
//                     {/*    </TouchableOpacity>*/}
//                     {/*</View>*/}
//                 </LinearGradient>
//             </ImageBackground>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//     },
//     backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//     },
//     overlay: {
//         flex: 1,
//     },
//     headerGradient: {
//         paddingBottom: 20,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 15,
//         paddingTop: 50,
//         paddingBottom: 10,
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backIconText: {
//         color: '#FFF',
//         fontSize: 24,
//         marginRight: 5,
//         fontWeight: 'bold',
//     },
//     backButtonText: {
//         color: '#FFF',
//         fontSize: 16,
//         fontFamily: 'Helvetica Neue',
//     },
//     headerTitle: {
//         color: '#FFF',
//         fontSize: 20,
//         fontWeight: 'bold',
//         fontFamily: 'Helvetica Neue',
//     },
//     contentCardOuter: {
//         backgroundColor: 'rgba(0,0,0,0.6)',
//         alignItems: 'center',
//         marginHorizontal: 20,
//         marginVertical: 20,
//         padding: 20,
//         borderRadius: 20,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 8 },
//                 shadowOpacity: 0.5,
//                 shadowRadius: 15,
//             },
//             android: {
//                 elevation: 12,
//             },
//         }),
//     },
//     detailImage: {
//         width: '90%',
//         height: 200,
//         marginBottom: 20,
//     },
//     detailTitle: {
//         color: '#FFF',
//         fontSize: 28,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 15,
//         fontFamily: 'Helvetica Neue',
//         textShadowColor: 'rgba(0, 0, 0, 0.4)',
//         textShadowOffset: { width: 1, height: 1 },
//         textShadowRadius: 2,
//     },
//     detailDescription: {
//         color: '#E0E0E0',
//         fontSize: 16,
//         lineHeight: 24,
//         textAlign: 'center',
//         fontFamily: 'System',
//         opacity: 0.9,
//     },
//     navigationArrowsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingHorizontal: 40,
//         paddingBottom: Platform.OS === 'ios' ? 20 : 30,
//         paddingTop: 10,
//     },
//     navArrowButton: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: 'rgba(255,255,255,0.1)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 3 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 5,
//             },
//             android: {
//                 elevation: 6,
//             },
//         }),
//     },
//     navArrowText: {
//         color: '#FFF',
//         fontSize: 35,
//         fontWeight: 'bold',
//     },
// });
//
// export default CategoryDetailScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    ImageBackground,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CategoryDetailScreen = ({ navigation, route }) => {
    const { categoryTitle, detailImage, detailInfo } = route.params;

    return (
        <View style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
                    style={styles.overlay}
                >
                    {/* Header */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
                        style={styles.headerGradient}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Text style={styles.backIconText}>{'<'}</Text>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>{categoryTitle}</Text>
                            <View style={{ width: 60 }} />
                        </View>
                    </LinearGradient>

                    {/* Scrollable Content */}
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.contentCardOuter}>
                            <Image source={detailImage} style={styles.detailImage} resizeMode="contain" />
                            <Text style={styles.detailTitle}>{categoryTitle}</Text>
                            <Text style={styles.detailDescription}>{detailInfo}</Text>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
    },
    headerGradient: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 50,
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
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Merriweather',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Merriweather',
    },
    scrollContent: {
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    contentCardOuter: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 15,
            },
            android: {
                elevation: 12,
            },
        }),
    },
    detailImage: {
        width: '90%',
        height: 200,
        marginBottom: 20,
    },
    detailTitle: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: 'Merriweather',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    detailDescription: {
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'left',
        fontFamily: 'Merriweather',
        opacity: 0.95,
        whiteSpace: 'pre-line', // not needed in React Native but for visual clarity if multiline
    },
});

export default CategoryDetailScreen;
