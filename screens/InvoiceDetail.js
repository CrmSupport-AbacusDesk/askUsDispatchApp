import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, FlatList, Modal, Alert, Linking, TouchableOpacity, } from 'react-native'
import { Icon } from 'react-native-elements'
import AlertMessage from '../Componenets/Alert/AlertMessage'
import { Title, Avatar, TextInput, Button } from 'react-native-paper'
import AppTheme from '../Componenets/AppTheme.js/AppTheme'
import BaseService from '../services/BaseService'
import moment from 'moment'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import GlobelStyle from '../Componenets/GlobalStyle/GlobalStyle'
const InvoiceDetail = ({ navigation, route }) => {
    const [Visible, setVisible] = React.useState('1')
    const [QrVisible, setQrVisible] = React.useState(false)
    const [DispatchDetail, setDispatchDetail] = React.useState([])
    const [MasterList, setMasterList] = React.useState([])
    const [MasterNo, setMasterNo] = React.useState('')
    const [InvoiceDetail, setInvoiceDetail] = React.useState([])
    const [InvoiceHead, setInvoiceHead] = React.useState('')
    const [message, setmessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modal2Visible, setModal2Visible] = React.useState(false);
    const [showAlert, setshowAlert] = React.useState(false);



    React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            getBoxDetail();
        });
        return focusEvent;

    });

    const getBoxDetail = async () => {
        await BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', { 'invoice_no': route.params.invoice_no }
            //  BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', {'invoice_no': '2131102562'}

        ).then(res => {
            console.log('Invoice Detail ', res);

            if (res.data.status == "Success") {
                setInvoiceDetail(res.data.data.invoice_detail)
                setDispatchDetail(res.data.data.dispatched_items)
                console.log(DispatchDetail);
                setInvoiceHead(res.data.data)
                console.log(InvoiceDetail);
            }
            else {

            }
        }).catch(err => console.log('line 94 ->', err))
    }

    const getMasterBox = async (couponData) => {
        console.log(route.params.invoice_no, couponData.data, route.params.VendorName);
        await BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': route.params.invoice_no, "master_box_coupon": couponData.data, 'Cust_Vendor_Name': route.params.VendorName }
            // BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': route.params.invoice_no, "master_box_coupon": '820261e6671b5ec55' ,'Cust_Vendor_Name': route.params.VendorName}

        ).then(res => {
            console.log('Master Detail ', res);
            if (res.data.status.status == "200") {
                setmessage(res.data.status.message)
                // setStatus('Success')
                setModalVisible(false)
                // console.log(MasterNo);
                setshowAlert(true)
                // seteditable(true)
                setType('success')
                setTitle('Dispatched')
                getBoxDetail()
            } else if (res.data.status.status == "300") {
                setmessage(res.data.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            } else if (res.data.status.status == "500") {
                setmessage(res.data.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            } else {
                setmessage(res.data.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            }
        }).catch(err => console.log('line 94 ->', err))
    }

    const handleOk = () => {
        setshowAlert(false)
    }
    const RenderMasterList = ({ item }) => {
        return (
            <View style={[styles.Detail,{borderColor:'#008cff'}]}>
                <Title style={{ fontSize: 14, fontWeight: '500', padding: 4 }}>{item.coupon_code ? item.coupon_code : 'N/A'}</Title>
            </View>
        )
    }
    const RenderItemList = ({ item }) => {
        return (
            <View style={[styles.Detail, { marginBottom: 12 }]}>
                <View style={{ borderBottomWidth: 1, borderColor: AppTheme.LightBlue, padding: 6 }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', padding: 4 }}>{item.part_code ? item.part_code : 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Qty:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.Qty ? item.Qty : "N/A"}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>UOM:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.UOM ? item.UOM : 'N/A'}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Box Size:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>{item.box_size ? item.box_size : 'N/A'}</Text>

                    </View>
                </View>

            </View >
        )
    }
    const RenderDispatchList = ({ item }) => {
        return (
            <Pressable onPress={() => { setModal2Visible(true), setMasterList(item.master_box_coupon_code) }} style={[styles.Detail, { flex: 1 }]}>
                <View style={{ borderBottomWidth: 1, borderColor: AppTheme.LightBlue, padding: 6, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', padding: 4 }}>{item.part_code ? item.part_code : 'N/A'}</Text>
                    <Icon
                        name='arrow-forward-ios'
                        color={AppTheme.LightBlue}
                        style={{ marginLeft: 65 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Qty:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.total_qty ? item.total_qty : 'N/A'}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Total Box:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>{item.total_box_dispatched ? item.total_box_dispatched : 'N/A'}</Text>

                    </View>
                </View>
            </Pressable >
        )
    }
    return (
        <View style={{ flex: 1 }}>

            <AlertMessage
                type={type}
                title={title}
                message={message}
                visible={showAlert}
                handleOk={handleOk} labelOK='Ok' />
            <View style={styles.Head}>
                <View style={{ borderBottomWidth: 2, borderBottomColor: AppTheme.LightGrey }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Avatar.Text size={20} label={InvoiceHead.Cust_Vendor_Name ? (String(InvoiceHead.Cust_Vendor_Name.charAt(0)).toUpperCase()) : 'N/A'} color={AppTheme.Light} labelStyle={{ fontWeight: 'bold', fontSize: 10, lineHeight: 16 }} style={{ marginRight: 8 }} />
                        <Title style={{ fontSize: 12, color: AppTheme.Medium }}>
                            {InvoiceHead.Cust_Vendor_Name ? InvoiceHead.Cust_Vendor_Name : 'N/A'}
                        </Title>
                    </View>
                    <Text style={[styles.TextHead, { marginLeft: 24, marginTop: -10, marginBottom: 6 }]}>{InvoiceHead.Cust_Vendor_Code ? InvoiceHead.Cust_Vendor_Code : 'N/A'}</Text>
                </View>

                <View style={{ flexDirection: 'row', borderBottomColor: AppTheme.LightGrey, marginVertical: 8, justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, borderRightWidth: 2, borderColor: AppTheme.Medium, marginBottom: 5, }}>
                        <Text style={styles.Title}>Invoice No :  <Text style={styles.TextHead}>{InvoiceHead.ODN_Number ? InvoiceHead.ODN_Number : 'N/A'}</Text></Text>
                    </View>
                    <View style={{ marginRight: 50, paddingLeft: 6 }}>
                        <Text style={styles.Title}>Total Item : <Text style={styles.TextHead} >{InvoiceHead.total_invoice_item ? InvoiceHead.total_invoice_item : 'N/A'}</Text></Text>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, marginVertical: 16 }}>
                <View style={[GlobelStyle.cardMaterial, styles.Listing]}>
                    <Pressable style={[styles.ItemList, { backgroundColor: Visible == '2' ? AppTheme.Light : 'blue' }]} onPress={() => setVisible('1')} >
                        <Title style={[{ fontSize: 16, color: Visible == '2' ? 'blue' : AppTheme.Light }]}>Item List</Title>
                    </Pressable>
                    <Pressable style={[styles.DispatchedList, { backgroundColor: Visible == '2' ? AppTheme.Success : AppTheme.Light }]} onPress={() => setVisible('2')}>
                        <Title style={{ fontSize: 16, color: Visible == '2' ? AppTheme.Light : AppTheme.Success }}>Dispatched List</Title>
                    </Pressable>
                </View>

                {Visible == '2' ?
                    <View style={{ alignItems: 'center' }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <QRCodeScanner
                                        onRead={getMasterBox}
                                        flashMode={RNCamera.Constants.FlashMode.off}
                                        topContent={
                                            <Title style={styles.centerText}>
                                                Scan Master Box
                                            </Title>
                                        }

                                        bottomContent={
                                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.buttonTouchable}>
                                                <Text style={styles.buttonText}>OK. Got it!</Text>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            </View>
                        </Modal >
                        <Button mode='contained' labelStyle={{ fontSize: 12 }} style={{ marginVertical: 16, }} onPress={() => setModalVisible(true)}>Scan Master Box</Button>

                    </View >
                    : null}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modal2Visible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModal2Visible(!modal2Visible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView2]}>
                            <View>
                                <View style={[styles.Close, { left: 20 }]}>
                                    <Icon name='close' onPress={() => setModal2Visible(!modal2Visible)} color={AppTheme.Light} />
                                </View>
                                <View style={{ marginHorizontal: 16 ,flexDirection:'row',alignItems:'center'}}>
                                    <Title>Master Box</Title>
                                    <View style={GlobelStyle.MasterCount}>
                                        <Title style={{color:AppTheme.Secondary,lineHeight:20,fontSize:18}}>{MasterList.length}</Title>
                                    </View>
                                </View>
                                <FlatList nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                    data={MasterList}
                                    renderItem={RenderMasterList}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={Visible == '2' ? DispatchDetail : InvoiceDetail}
                    renderItem={Visible == '2' ? RenderDispatchList : RenderItemList}
                />
            </View >




        </View >
    )

}
const styles = StyleSheet.create({
    Close: {
        backgroundColor: AppTheme.Danger,
        padding: 8,
        borderRadius: 20,
        marginLeft: 'auto',
        position: 'relative',
        top: -22,
        justifyContent: 'flex-end'
    },
    Head: {
        backgroundColor: '#f5f5f5',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        borderBottomWidth: 1,
        borderColor: '#e0edff',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        padding: 8,
    },
    Listing: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        padding: 6
    },
    Detail: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: AppTheme.LightBlue,
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#e6eefc',
    },
    TextHead: {
        fontWeight: '700',
        paddingLeft: 4,
        fontSize: 12
    },
    Title: {
        // fontWeight: 'bold',
        fontSize: 13
    },
    input: {
        fontSize: 12,
        height: 30,
        width: '60%',
        lineHeight: 20,
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#525252',
        // opacity: 0.9,


    },
    modalView: {
        backgroundColor: "black",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalView2: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 6,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    ItemList: {
        flex: 1,
        marginRight: 3,
        borderWidth: 1,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    DispatchedList: {
        flex: 1,
        marginLeft: 3,
        borderWidth: 1,
        borderColor: AppTheme.Success,
        backgroundColor: AppTheme.Success,
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }

})
export default InvoiceDetail;
