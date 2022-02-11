
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import AppTheme from '../../Componenets/AppTheme/AppTheme'



const GlobelStyle = StyleSheet.create({

    SafeAreaView: { backgroundColor: AppTheme.Light, flex: 1 },
    pageContainer: { backgroundColor: AppTheme.Light, flex: 1 },
    // css utilities Start //

    textClr: { color: AppTheme.Dark },
    blackClr: { color: AppTheme.Tertiary },
    textWhite: { color: AppTheme.Light },
    noLetterSpacing: { letterSpacing: 0 },

    // *** Padding start ***//
    padding0: { padding: 0 },
    padding16: { padding: 16 },
    padding10: { padding: 10 },
    padding5: { padding: 5 },
    paddingHorizontal16: { paddingHorizontal: 16 },
    paddingHorizontal10: { paddingHorizontal: 10 },
    paddingHorizontal5: { paddingHorizontal: 5 },
    paddingHorizontal8: { paddingHorizontal: 8 },
    paddingVertical16: { paddingVertical: 16 },
    paddingVertical10: { paddingVertical: 10 },
    paddingVertical5: { paddingVertical: 5 },

    pt0: { paddingTop: 0 },
    pt5: { paddingTop: 5 },
    pt10: { paddingTop: 10 },
    pt15: { paddingTop: 15 },
    pt25: { paddingTop: 25 },

    pr0: { paddingRight: 0 },
    pr5: { paddingRight: 5 },
    pr10: { paddingRight: 10 },
    pr15: { paddingRight: 15 },

    pb0: { paddingBottom: 0 },
    pb5: { paddingBottom: 5 },
    pb10: { paddingBottom: 10 },
    pb15: { paddingBottom: 15 },

    pl0: { paddingLeft: 0 },
    pl5: { paddingLeft: 5 },
    pl10: { paddingLeft: 10 },
    pl15: { paddingLeft: 15 },
    // *** Padding start ***//

    // *** Margin start ***//
    margin: { margin: 0 },
    margin16: { margin: 16 },
    margin10: { margin: 10 },
    marginHorizontal16: { marginHorizontal: 16 },
    marginHorizontal10: { marginHorizontal: 10 },
    marginHorizontal5: { marginHorizontal: 5 },
    marginVertical16: { marginVertical: 16 },
    marginVertical10: { marginVertical: 10 },
    marginVertical5: { marginVertical: 5 },

    mt0: { marginTop: 0 },
    mt5: { marginTop: 5 },
    mt10: { marginTop: 10 },
    mt15: { marginTop: 15 },
    mt32: { marginTop: 32 },

    mr0: { marginRight: 0 },
    mr5: { marginRight: 5 },
    mr10: { marginRight: 10 },
    mr15: { marginRight: 15 },

    mb0: { marginBottom: 0 },
    mb5: { marginBottom: 5 },
    mb10: { marginBottom: 10 },
    mb15: { marginBottom: 15 },
    mb32: { marginBottom: 32 },

    ml0: { marginLeft: 0 },
    ml5: { marginLeft: 5 },
    ml10: { marginLeft: 10 },
    ml15: { marginLeft: 15 },
    // *** Margin End ***//

    // *** Text Align Start ***//
    textCenter: { textAlign: 'center' },
    textLeft: { textAlign: 'left' },
    textRight: { textAlign: 'right' },
    // *** Text Align End ***//


    // *** DisplayFlex Start ***//
    dflex: { display: 'flex' },

    flexRow: { flexDirection: 'row' },
    flexRowReverse: { flexDirection: 'row-reverse' },

    flexColumn: { flexDirection: 'column' },
    flexColumnReverse: { flexDirection: 'column-reverse' },

    flexNowrap: { flexWrap: 'nowrap' },
    flexWrap: { flexWrap: 'wrap' },
    flexWrap: { flexWrap: 'wrap' },

    alignCenter: { alignItems: 'center' },
    alignEnd: { alignItems: 'flex-end' },
    alignStart: { alignItems: 'flex-start' },
    alignEnd: { alignItems: 'baseline' },
    alignStretch: { alignItems: 'stretch' },

    justifyCenter: { justifyContent: 'center' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyAround: { justifyContent: 'space-around' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyEvenly: { justifyContent: 'space-evenly' },
    // *** DisplayFlex Start ***//


    // *** Width Start *** //
    wp100: { width: '100%' },
    // *** Width End *** //

    // *** Height Start *** //
    hp100: { height: '100%' },
    // *** Height End *** //


    relative: { position: 'relative' },

    // css utilities End //


    // *** fonts Size start *** //
    font9: { fontSize: 9, lineHeight: 16 },
    font11: { fontSize: 11, lineHeight: 16 },
    font10: { fontSize: 10, lineHeight: 16 },
    font12: { fontSize: 12, lineHeight: 18, },
    font13: { fontSize: 13 },
    font14: { fontSize: 14, color: AppTheme.Dark, lineHeight: 16 },
    font16: { fontSize: 16, lineHeight: 18, color: AppTheme.Dark, fontWeight: '700' },


    normal: { fontWeight: 'normal' },
    light: { fontWeight: '400' },
    Exlight: { fontWeight: '500' },
    medium: { fontWeight: '600' },
    Exmedium: { fontWeight: '700' },
    bold: { fontWeight: 'bold' },
    Exbold: { fontWeight: '900' },
    // *** fonts Size end *** //

    bodrBotm: { borderBottomWidth: 0 },



    //*** login start ***//

    logoContainer: {
        paddingRight: 64,
        paddingLeft: 64,
        paddingTop: 52,
        paddingBottom: 16,
        marginBottom: 32,
        alignItems: 'center',
        minHeight: 60,
        backgroundColor: AppTheme.Light,
    },

    logo: {
        height: 80,
    },
    logoOuter: {
        width: 100,
        height: 44,
        marginLeft: 16,
        backgroundColor: AppTheme.Light,
        paddingTop: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },


    headerLogo: {
        borderRadius: 6,
        alignItems: 'flex-start',
        width: 70,
        height: 70,
    },

    ellipseLogo: {
        width: 120, height: 80,
    },

    loginTitle: {
        fontSize: 14,
        lineHeight: 24,
        color: AppTheme.Dark,
        fontWeight: '700'
    },
    loginSubTitle: {
        fontSize: 12,
        lineHeight: 24,
        color: AppTheme.Dark,
        marginTop: 16,
        marginBottom: 32,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
        // backgroundColor:'green'
    },
    flexTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backBtnFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    yellowbold: {
        fontWeight: '700',
        color: AppTheme.Warning,
        marginLeft: 5,
    },
    otpInput: {

        height: 45,
        fontSize: 14,
        backgroundColor: AppTheme.Light,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: AppTheme.Medium,
        borderBottomWidth: 0,
    },
    linkBtn: {
        marginLeft: 5,
        color: AppTheme.LinkClr,
        fontWeight: '700',
        lineHeight: 16
    },
    linkClr: { color: AppTheme.LinkClr, },
    whiteText: { color: AppTheme.Light },
    //*** login start ***//


    csList: {
        padding: 10,
        backgroundColor: AppTheme.Light,
        borderBottomWidth: 3,
        borderColor: AppTheme.Medium,
    },
    cardList: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    AvatarText: {
        minWidth: 35,
        width: 35,
        height: 35,
        backgroundColor: AppTheme.SpringBud,
        borderRadius: 35,
        fontSize: 20,
        fontWeight: '800',
    },

    title: {
        fontSize: 12,
        color: AppTheme.Tertiary,
        margin: 0,
        lineHeight: 16,
    },
    subtitle: {
        fontSize: 11,
        color: AppTheme.Medium,
        margin: 0,
        lineHeight: 12,
        letterSpacing: 0,
    },
    column: {
        borderColor: AppTheme.Medium,
        borderStyle: ('dashed'),
        borderWidth: 1,
        padding: 5,
        marginVertical: 10
    },

    btnColumn: {
        marginLeft: 'auto'
    },
    csBtn: {
        minWidth: 100,
        backgroundColor: AppTheme.Success,
        fontSize: 12,
    },

    warBtn: {
        minWidth: 100,
        backgroundColor: AppTheme.Warning,
        fontSize: 12,
    },

    tabs: {
        borderColor: AppTheme.Secondary,
        borderWidth: 2,
        borderRadius: 30,
        paddingVertical: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 2,
        marginBottom: 20,
    },
    tabsBtn: {
        flex: 1,
        backgroundColor: AppTheme.Light,
        color: AppTheme.Dark,
        paddingLeft: 5,
        paddingRight: 0,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 3,
        position: 'relative',
    },
    activeTabsBtn: { backgroundColor: AppTheme.Secondary, color: AppTheme.Light },
    tabsBtnText: {
        fontSize: 13,
        color: AppTheme.Dark,
        fontWeight: '600',
        lineHeight: 16,
    },
    activeText: {
        color: AppTheme.Light
    },
    bdge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: AppTheme.Medium,
    },
    activeBdge: {
        backgroundColor: '#00055a'
    },

    boxLayout: {
        width: '100%',
        flex: 1,
        flexWrap: 'wrap',
        alignContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    outer: {
        width: '100%',
        padding: 5,
    },
    inner: {
        shadowColor: AppTheme.Dark,
        borderWidth: 1,
        borderColor: AppTheme.Medium,
        borderRadius: 10,
        padding: 5,
    },
    chekbg: { backgroundColor: AppTheme.Danger, flexBasis: 2, justifyContent: 'space-between', flex: 1 },
    avtarIcon: {
        width: 45,
        height: 45,
        backgroundColor: '#DAF5F2',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    radiusBox: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DAF5F2',
        padding: 6,
    },
    MyWallet: {
        padding: 16,
        backgroundColor: '#D8FFCC',
        borderBottomWidth: 3,
        borderColor: AppTheme.Success,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: -10,
    },

    InputBlockBg: {
        backgroundColor: '#F3FAFE',
        padding: 16,
        shadowColor: "#A6DBF9",
        shadowOffset: { width: 0, height: 5, },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    btnArea: {
        width: 100,
        marginTop: 5,
        marginBottom: 16,
        marginLeft: 'auto',
        marginRight: 16
    },

    // *** Dialog Start ***//
    dialogIcon: {
        width: 60,
        height: 60,
        paddingTop: 32,
    },

    dialogTitle: {
        backgroundColor: AppTheme.Light,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 16,
        paddingBottom: 16,
    },

    DialogHeaderContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },

    DialogContent: {
        display: 'flex',
        alignItems: 'center'

    },

    DialogFooter: {
        backgroundColor: '#F1FFEC',
        padding: 16,
    },
    footerBtn: {
        width: '100%',
        backgroundColor: AppTheme.Success,
        borderRadius: 6,
    },
    dangerbg: {
        backgroundColor: AppTheme.Primary,
    },

    closeBtn: {
        position: 'relative',
        top: -5,
        right: -20,
    },
    //** Dialog Start **/


    summary: {
        shadowColor: AppTheme.Tertiary,
        shadowOffset: { width: 0, height: 0, },
        shadowOpacity: 0.16,
        shadowRadius: 8.32,
        elevation: 3,
    },
    bodrBotm1: {
        borderBottomWidth: 1,
        borderColor: '#DAF5F2',
        borderStyle: 'dashed'
    },
    blueBox: {
        backgroundColor: '#1F2367',
        flex: 1,
        borderRightColor: AppTheme.Light,
        borderRightWidth: 1,
    },
    textColumn: {
        height: 25,
        textAlign: 'center',
        color: AppTheme.Light,
        fontSize: 10,
        backgroundColor: AppTheme.Secondary,
    },
    numberColumn: {
        height: 25,
        textAlign: 'center',
        color: AppTheme.Light,
        fontSize: 16,
        fontWeight: '700'
    },
    heading: {
        fontSize: 13,
        color: AppTheme.Secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.2,
        fontWeight: '800',
        lineHeight: 14,
    },
    listFooterItem: {
        backgroundColor: AppTheme.LightGrey,
        marginTop: 10,
        marginRight: -8,
        marginBottom: -8,
        marginLeft: -8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,

    },

    smCard: {
        paddingLeft: 0,
        minHeight: 26,
    },
    smIcon: {
        marginRight: 0,
        backgroundColor: AppTheme.Primary,
    },
    cardItem: {
        borderWidth: 1,
        borderColor: AppTheme.Medium,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    cardIcon: {
        color: AppTheme.Dark,
        lineHeight: 20,
        marginRight: 5,
    },

    // *** Profile  *** //

    profileCard: {
        display: 'flex',
        alignItems: 'center',
    },
    profilebg: {
        height: 100,
        backgroundColor: AppTheme.Primary,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    avIcon: {
        backgroundColor: AppTheme.Light,
        color: AppTheme.Dark,
        shadowColor: AppTheme.Dark,
        shadowOffset: { width: 0, height: 4, },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 8,
        marginBottom: -30,
        borderWidth: 2,
        borderColor: AppTheme.LightGrey,
    },

    profileContent: {
        // backgroundColor:'green',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 35
    },


    radiusCard: {
        paddingHorizontal: 16,
    },

    csCard: {
        minHeight: 50,
        paddingLeft: 0,
    },

    iconClr: {
        backgroundColor: AppTheme.Secondary,
    },
    cardMaterial: {
        padding: 10,
        backgroundColor: AppTheme.Light,
        shadowColor: AppTheme.Dark,
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 6,
        borderRadius: 8,
    },
    cardMaterial1: {
         marginVertical: 5,
         marginHorizontal: 2.5,
        //padding: 10,
        backgroundColor: AppTheme.Light,
        shadowColor: AppTheme.Dark,
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.34,
        //shadowRadius: 6.27,
        elevation: 6,
    },

    // *** Profile  *** //

    CsSelect: {
        width: '100%',
        height: 44,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.54)',
        backgroundColor: AppTheme.Light,
        borderRadius: 4,
    },


    selectText: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        flex: 1,
        marginHorizontal: '-10%'
        // marginHorizontal:-,
        // color:'rgba(0, 0, 0, 0.54)'
    },

    errorMsg: {
        color: AppTheme.Danger,
        fontSize: 11,
        lineHeight:16,
        letterSpacing:0,
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    askTitle: {
        fontSize: 16,
    },

    // Stock List Css Start


    avtaarCss: {
        paddingTop: 7,
        paddingLeft: 7,
    },

    flexColumnBox: {
        flexDirection: 'row',
        display: 'flex',
        paddingHorizontal: 8,
        borderColor: AppTheme.Medium,
    },
    csTitle: {
        marginTop: 0,
        marginBottom: 0,
        
        fontSize: 12,
        lineHeight: 16,
    },

    boldFont: {
        fontSize: 12,
        marginBottom: 0,
        marginTop: 0,
        fontWeight: '900'
    },
    OrderBox2: {
        flex: 1,
        marginVertical: 3,
        paddingHorizontal: 6,
        // borderStyle: 'dashed' ,
        borderWidth: 1,
        //height:40,
        borderColor: AppTheme.Medium,
    },
    listBoxText: {
        color: '#999999',
        fontSize: 12,
        lineHeight: 16,},
    listBoxText3: {
        //color: 'black',
        fontSize: 12,
        lineHeight: 16,
    },
    listBoxText4: {
       // color: 'black',
        fontSize: 16,
        lineHeight: 16,
    },
    listBoxText2: {
        color: '#000000',
        fontSize: 12,
        lineHeight: 18,
    },
    chatFooter: {
        height: 60,
        padding: 10,
        backgroundColor: AppTheme.Light,
        justifyContent: 'flex-end',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#E3290E'
    },

    container: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 3,
        borderColor: '#134391',
        borderRadius: 19,
    },
    container1: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        
    },
    secondaryContainer: {
        flexDirection: "row",
        justifyContent:"space-evenly",
    },
    button1: {
        alignItems: "center",
        width: '33%',
        padding: 5,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 15,
    },
    button: {
        
        padding: 5,
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 18,
    },
    flexColumnBox4: {
        padding: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#bdbdbd',
        borderTopColor: '#bdbdbd',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },
    pt16: { paddingTop: 16 },
    orderBox:{
        marginHorizontal:16,
        marginTop:16,
        borderRadius:8,
        borderWidth:1,
        borderColor:AppTheme.Medium,
    },
    tabArea:{
        // backgroundColor:AppTheme.Secondary,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10
    },
})

export default GlobelStyle;