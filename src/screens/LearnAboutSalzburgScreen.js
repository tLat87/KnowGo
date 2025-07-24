import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CategoryCard = ({ title, imageSource, onPress }) => {
    return (
        <TouchableOpacity style={styles.categoryCardOuter} onPress={onPress}>
            <Image source={imageSource} style={styles.categoryCardImage} resizeMode="contain" />
            <Text style={styles.categoryCardText}>{title}</Text>
        </TouchableOpacity>
    );
};

const LearnAboutSalzburgScreen = ({ navigation }) => {
    const categories = [
        {
            id: 'history',
            title: 'History',
            image: require('../assets/images/Know/History-1.png'),
            info: `📜 History
Hohensalzburg Fortress: Built in 1077, it is one of the largest and best-preserved medieval castles in Europe.
Prince-Archbishops: Salzburg was ruled by powerful prince-archbishops for centuries, combining religious and political power.
Salt Trade: The city’s name means “Salt Castle” and refers to its wealth from salt mining and trade along the Salzach River.
Oldest Street – Getreidegasse: This famous shopping street dates back to Roman times and is filled with traditional signs and charm.
Residenz Palace: Home to Salzburg’s prince-archbishops, the palace showcases Renaissance and Baroque grandeur.
Bishopric Since 739: Salzburg became a bishopric in the year 739, making it a center of religious power in Central Europe.
Baroque Transformation: Under Archbishop Wolf Dietrich, Salzburg was rebuilt in the Baroque style to rival Rome.
Napoleonic Rule: In the early 1800s, Salzburg came under French and Bavarian control during the Napoleonic Wars.
Salzburg Cathedral: Rebuilt multiple times, this grand Baroque cathedral was first consecrated in 774.
Celtic Origins: Long before Roman times, the region around Salzburg was home to Celtic tribes.
Roman City: Iuvavum: Salzburg was known as Iuvavum under Roman rule and was a key provincial center.
Archbishop Paris Lodron: He kept Salzburg safe during the Thirty Years’ War and founded the university in 1622.
UNESCO Status: The historic center of Salzburg was designated a UNESCO World Heritage Site in 1996.`
        },
        {
            id: 'geography',
            title: 'Geography',
            image: require('../assets/images/Know/History-2.png'),
            info: `🌍 Geography
Location: Salzburg lies near the northern edge of the Alps, close to the German border.
Salzach River: The river runs through the city, dividing the historic Old Town and the modern area.
Untersberg Mountain: Just outside Salzburg, Untersberg is part of local legends and visible from many parts of the city.
Lake District Nearby: Just outside the city lies the Salzkammergut region, full of crystal-clear alpine lakes.
Hellbrunn Palace Grounds: Located south of the city, this area includes gardens, fountains, and even a zoo.
Alpine Climate: Salzburg experiences warm summers and snowy winters, typical of alpine regions.
Mount Gaisberg: A popular spot for hiking and paragliding, Gaisberg overlooks the entire city.
Border Proximity: The city is just a few kilometers from Germany, making it a cultural and linguistic bridge.
Kapuzinerberg Hill: This forested hill offers panoramic views and walking trails in the heart of the city.
Mirabell Gardens: Famous for their symmetry and beauty, these gardens are a public highlight in central Salzburg.
Mönchsberg Cliffs: The Old Town is nestled against this massive rock, accessible by lift or footpath.
Surrounded by Mountains: Salzburg is encircled by small alpine peaks like Gaisberg, Mönchsberg, and Untersberg.
City on the Salzach: The Salzach River flows from the Alps through Salzburg and eventually joins the Inn River.`
        },
        {
            id: 'arts_music',
            title: 'Arts & Music',
            image: require('../assets/images/Know/History-3.png'),
            info: `🎨 Arts & Music
Mozart’s Birthplace: Wolfgang Amadeus Mozart was born in Salzburg in 1756. His house is now a popular museum.
Salzburg Festival: This world-famous music and drama festival began in 1920 and takes place every summer.
Baroque Architecture: Salzburg’s Old Town is full of Baroque-style buildings and is listed as a UNESCO World Heritage Site.
Sound of Music Filming: Many scenes from the classic film The Sound of Music were filmed in Salzburg.
Marionette Theatre: Founded in 1913, Salzburg’s puppet theatre performs operas using handcrafted marionettes.
Mozarteum University: This prestigious music and arts university continues Salzburg’s creative legacy.
DomQuartier Museum: A cultural complex in the heart of the city housing art, music history, and sacred treasures.
Festspielhaus: The grand stage of the Salzburg Festival, known for its opera and theatrical performances.
Mozart Week: A dedicated festival in January celebrates Mozart’s legacy with classical concerts citywide.
Carillon of the New Residence: The Glockenspiel plays over 40 melodies, echoing through the Old Town since 1705.
St. Peter’s Abbey Music: The monastery has a rich tradition of sacred music dating back over a thousand years.
Musical Streets: Street musicians and classical performers often play near Getreidegasse and Residenzplatz.
Marble Hall Concerts: Mirabell Palace’s Marble Hall hosts regular chamber concerts in a historic setting.`
        },
        {
            id: 'local_life',
            title: 'Local Life',
            image: require('../assets/images/Know/History-4.png'),
            info: `🍽️ Local Life
Sacher Torte: This famous chocolate cake with apricot jam can be enjoyed at Hotel Sacher in Salzburg.
Stiegl Beer: Stiegl is one of Austria’s oldest breweries, founded in Salzburg in 1492.
Christmas Markets: Salzburg’s Christkindlmarkt on Residenzplatz is one of the most charming in Europe.
Bosna Sausage Snack: A spicy sausage sandwich popular in Salzburg street food stalls.
Traditional Dress – Tracht: Many locals wear traditional Austrian clothing (dirndl and lederhosen) during festivals.
Advent Singing: Salzburg hosts choirs and performances throughout December in cozy churches and courtyards.
Coffee House Culture: Salzburg’s cafés are part of daily life — places to slow down and socialize.
Mozartkugel: These chocolate-marzipan treats were invented in Salzburg and remain a beloved souvenir.
Augustiner Bräu: A historic monastery brewery with large beer halls and outdoor gardens — beloved by locals.
Rupertikirtag Fair: A colorful September festival with traditional food, music, and carnival rides in the city center.
Bauernmarkt Shopping: Farmers' markets in Salzburg offer fresh cheese, bread, meats, and local crafts.
Easter Markets: Along with Christmas markets, Salzburg holds festive outdoor markets during the Easter season.
Coffee + Mozartkugel Combo: A typical local treat: a small coffee with a Mozartkugel on the saucer.`
        },
        {
            id: 'famous_people',
            title: 'Famous People',
            image: require('../assets/images/Know/History.png'),
            info: `👤 Famous People
Wolfgang Amadeus Mozart: A child prodigy and one of the greatest composers in history, born in Salzburg in 1756.
Herbert von Karajan: Legendary conductor of the Berlin Philharmonic, also born in Salzburg in 1908.
Christian Doppler: Physicist born in Salzburg in 1803, known for discovering the Doppler Effect.
Joseph Mohr: The lyricist of Silent Night was born near Salzburg and performed the song for the first time in 1818.
Stefan Zweig: The Austrian author lived in Salzburg until the 1930s and was known for his humanist literature.
Maria Anna Mozart (Nannerl): Mozart’s sister was also a talented pianist and composer but was limited by gender norms of her time.
Karl Harnoncourt: Renowned conductor and early music specialist born in Salzburg in the 20th century.
Paracelsus: A revolutionary doctor and alchemist who worked in Salzburg in the 1500s.
Leopold Mozart: Father of Wolfgang Amadeus and a respected composer and music teacher himself.
Max Reinhardt: Theatre director and co-founder of the Salzburg Festival, born in nearby Baden.
Georg Trakl: An influential expressionist poet born in Salzburg in 1887.
Hans Makart: Celebrated 19th-century painter from Salzburg, known for his grand historical scenes.
Tobias Moretti: Austrian actor who studied in Salzburg and became internationally recognized for TV and stage work.`
        },
    ];


    const handleCategoryPress = (category) => {

            navigation.navigate('CategoryDetailScreen', {
                categoryId: category.id,
                categoryTitle: category.title,
                detailImage: category.image,
                detailInfo: category.info,
            });
        // } else {
        //     console.log(`Navigating to detail for: ${category.title}`);
        // }
    };

    return (
        <View style={styles.safeArea}>
            <ImageBackground
                source={require('../assets/images/9cc9e0363432e8c7ad81e705114c6fb843976859.jpg')} // ← замените на путь к своему фоновому изображению
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
                    style={styles.overlay}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
                        style={styles.headerGradient}
                    >
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                                <Text style={styles.backIconText}>{'<'}</Text>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Learn About Salzburg</Text>
                            <View style={{ width: 60 }} />
                        </View>
                    </LinearGradient>

                    <ScrollView contentContainerStyle={styles.cardsContainer}>
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                title={category.title}
                                imageSource={category.image}
                                onPress={() => handleCategoryPress(category)}
                            />
                        ))}
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
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        paddingBottom: 30,
    },
    categoryCardOuter: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        paddingTop: 20,
        width: '45%',
        aspectRatio: 1,
        margin: 8,
        borderRadius: 15,
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
    categoryCardImage: {
        width: '70%',
        height: '70%',
        marginBottom: 5,
    },
    categoryCardText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Merriweather',
    },
});

export default LearnAboutSalzburgScreen;
