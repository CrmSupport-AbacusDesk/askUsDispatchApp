import React from 'react'
import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import { Avatar, Title, Button } from 'react-native-paper'
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
        console.log('api');
        try {
        const response = await fetch('https://phpstack-414838-2222412.cloudwaysapps.com/askApi/index.php/CouponCode/InvoiceListing');

        const res = await response.json();
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        // if (res.status == 200) {
            setMasterBoxInfo(res.invoice_list)
            console.log('success');
        // }
        // else {
            console.log('in else');
        // }
    } catch (error) {
        console.error(error);
      }
        //   await  BaseService.post('CouponCode/InvoiceListing'
        //     ).then(res => {
        //         console.log('Invoice Listing', res);
        //         if (res.status == 200) {
        //             setMasterBoxInfo(res.data.invoice_list)
        //             console.log('success');
        //         }
        //         else {

        //         }
        //     }).catch(err => console.log('line 94 ->', err))
    }

    const RenderMasterBox = ({ item }) => {
        return (
            <Pressable style={styles.Product} onPress={() => navigation.navigate('InvoiceDetail', { 'invoice_no': item.invoice_no, 'VendorName': item.Cust_Vendor_Name })}>
                <View style={{ backgroundColor: "#d9e7ff", padding: 6, borderBottomWidth: 1, borderBottomColor: AppTheme.LightBlue }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                                Date :
                            </Text>
                            <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: '500', paddingLeft: 4 }}>
                                {moment(item.Bill_Date).format('DD-MMM-YYYY')}
                            </Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: 60 }}>
                            <Text style={{ fontWeight: 'bold', color: AppTheme.Secondary, fontSize: 12 }}>
                                {item.invoice_no ? item.invoice_no : 'N/A'}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Text size={20} label={item.Cust_Vendor_Name ? (String(item.Cust_Vendor_Name.charAt(0)).toUpperCase()) : 'N/A'} color={AppTheme.Light} labelStyle={{ fontWeight: 'bold', fontSize: 12, lineHeight: 16 }} style={{ marginRight: 8 }} />
                            <Title style={{ fontSize: 12, color: '#666666' }}>
                                {item.Cust_Vendor_Name ? item.Cust_Vendor_Name : 'N/A'}
                            </Title>
                        </View>
                        <Icon
                            name='arrow-forward-ios'
                            color={AppTheme.LightBlue}
                            style={{ marginLeft: 16 }} />

                    </View>
                </View>
                <View style={{ padding: 6 }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: AppTheme.LightBlue }}>
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', borderRightWidth: 2, borderColor: AppTheme.LightBlue }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                Total Item :
                            </Text>
                            <View>
                                <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: '500', paddingLeft: 4 }}>
                                    {item.total_item ? item.total_item : "N/A"}
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 6 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                Total Amount :
                            </Text>

                            <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: '500', paddingLeft: 4 }}>
                                ₹ {item.total_sum ? (Number(item.total_sum).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')) : 0}

                            </Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                            Dispatch status :
                        </Text>
                        <View style={styles.ProdCount}>
                            <Text style={{ fontSize: 12, color: AppTheme.Secondary, fontWeight: '500' }}>
                                {item.dispatched_status ? item.dispatched_status : 'N/A'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.Dashboard}>
            <View style={{ alignItems: 'center' }}>
                <Button mode='contained' color={AppTheme.LightBlue} labelStyle={{ fontSize: 12 }} style={{ marginVertical: 16, }} onPress={() => navigation.navigate('Warehouse')}>Stock Transfer To Warehouse</Button>
            </View>
            <View style={styles.Master}>

                <View style={styles.MasterHead}>
                    <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '500', color: 'white' }}>
                        Invoice List
                    </Text>
                </View>
                <Pressable style={styles.MasterCount}>
                    <Text style={{ color: '#b30006', fontSize: 16, fontWeight: '500' }}>{MasterBoxInfo.length ? MasterBoxInfo.length : 0}</Text>
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
        // backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        marginVertical: 6,
        borderColor: AppTheme.LightBlue,
        backgroundColor: '#e6eefc',
        // padding: 5,
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