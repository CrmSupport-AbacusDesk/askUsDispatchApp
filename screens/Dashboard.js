import React from 'react'
import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { Avatar, Title } from 'react-native-paper'
import BaseService from '../services/BaseService'
import AppTheme from '../Componenets/AppTheme.js/AppTheme'
import moment from 'moment'
const Dashboard = ({ navigation }) => {
    const [MasterBoxInfo, setMasterBoxInfo] = React.useState([])
    React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            getMasterBox();
        });
        return focusEvent;

    });

    const getMasterBox = async () => {
        BaseService.post('CouponCode/InvoiceListing'
        ).then(res => {
            console.log('Invoice Listing', res);

            if (res.status == 200) {
                setMasterBoxInfo(res.data.invoice_list)
                console.log('success');
            }
            else {

            }
        }).catch(err => console.log('line 94 ->', err))
    }

    const RenderMasterBox = ({ item }) => {
        return (
            <Pressable style={styles.Product} onPress={() => navigation.navigate('InvoiceDetail', { 'invoice_no': item.invoice_no ,'VendorName':item.Cust_Vendor_Name})}>
                <View>
                    <Text style={{ fontWeight: 'bold',color:AppTheme.Secondary }}>
                        {item.invoice_no}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9ec0ff', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar.Text size={20} label={item.Cust_Vendor_Name ?(String(item.Cust_Vendor_Name.charAt(0)).toUpperCase()):'N/A'} color={AppTheme.Light} labelStyle={{ fontWeight: 'bold', fontSize: 12, lineHeight: 16 }} style={{ marginRight: 8 }} />
                        <Title style={{ fontSize: 12, color: AppTheme.Medium }}>
                            {item.Cust_Vendor_Name}
                        </Title>
                    </View>
                    {/* <View style={styles.ProdCount}>
                        <Text style={{ fontSize: 10,color:AppTheme.Secondary,fontWeight:'bold' }}>
                            {item.invoice_no}
                        </Text>
                    </View> */}
                    <Icon
                        name='arrow-forward-ios'
                        color='#9ec0ff'
                        style={{ marginLeft: 16 }} />

                </View>
                {/* Bill_Date: "20220112"
Cust_Vendor_Name: "KBM AUTO AGENCIES"
: "2131102562"
total_item */}
                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', marginVertical: 6 }}>
                    <View style={{flex:1, alignItems: 'center', flexDirection: 'row',borderRightWidth:2,borderColor:'#9ec0ff' }}>
                        <Text style={{ fontSize: 13, color: AppTheme.Medium, fontWeight: 'bold' }}>
                            Date :
                        </Text>
                        <View>
                            <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: 'bold',paddingLeft:4 }}>
                    {moment(item.Bill_Date).format('DD-MMM-YYYY')}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1, alignItems: 'center', flexDirection: 'row' ,paddingLeft:6}}>
                        <Text style={{ fontSize: 13, color: AppTheme.Medium, fontWeight: 'bold' }}>
                            Total Item :
                        </Text>
                        
                            <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: 'bold',paddingLeft:4 }}>
                                {item.total_item}
                            </Text>
                        </View>
                    </View>

                
                {/*<View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: AppTheme.Medium,fontWeight:'bold' }}>
                        Total Part :
                    </Text>
                    <View style={styles.ProdCount}>
                        <Text style={{ fontSize: 10,color:AppTheme.Secondary,fontWeight:'bold' }}>
                            {item.total_size}
                        </Text>
                    </View>
                </View> */}
            </Pressable>
        )
    }
    return (
        <View style={styles.Dashboard}>

            {/* <View style={{ backgroundColor: 'red', height: 30, justifyContent: 'center' }}>
                <Text style={{ color: 'white' }}>
                    ASK US
                </Text>
            </View> */}
            {/* 
            <View style={{ alignItems: 'flex-end', marginHorizontal: 16, marginTop: 16 }}>
                <Icon name='qr-code-scanner' size={35} onPress={() =>
                    navigation.navigate('CouponScan')
                } />
            </View> */}
            <View style={styles.Master}>
                <View style={styles.MasterHead}>
                    <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '500', color: 'white' }}>
                        Invoice List
                    </Text>
                </View>
                <Pressable style={styles.MasterCount}>
                    <Text style={{ color: '#b30006', fontSize: 16, fontWeight: '500' }}>{MasterBoxInfo.length}</Text>
                </Pressable>
            </View>

            <View style={{ marginHorizontal: 2, flex: 1 }}>
                <FlatList nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={MasterBoxInfo}
                    renderItem={RenderMasterBox}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    Dashboard: {
        flex: 1,
    },
    Master: {
        // flex:1,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 6,
        height: 70,
        borderBottomWidth: 4,
        borderRadius: 4,
        // backgroundColor:'red',
        borderColor: AppTheme.Danger,
        flexDirection: 'row',
    },
    MasterCount: {
        borderRadius: 4,
        backgroundColor: '#fff0f0',
        // backgroundColor:'blue',
        height: 40,
        marginLeft: 26,
        width: '12%',
        borderWidth: 2,
        borderColor: '#b30006',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Product: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        marginVertical: 6,
        borderColor: '#9ec0ff',
        backgroundColor: '#e6eefc',
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 16,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    ProdCount: {
        flex: 1,
        margin: 5,
        marginLeft: 5,
        justifyContent: 'center',
        //  alignItems: 'center'
    },
    MasterHead: {
        // flex:1,
        height: 40,
        backgroundColor: '#b30006',
        borderRadius: 4,
        width: '80%',
        justifyContent: 'center'
    }
})
export default Dashboard;