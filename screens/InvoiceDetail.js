import React, { useState, Component } from 'react'
import { Text, View, StyleSheet, Pressable, FlatList, Modal, Alert, Linking, TouchableOpacity, } from 'react-native'
import { Icon } from 'react-native-elements'
import AlertMessage from '../Componenets/Alert/AlertMessage'
import { Title, Avatar, TextInput, Button } from 'react-native-paper'
import AppTheme from '../Componenets/AppTheme.js/AppTheme'
import BaseService from '../services/BaseService'
import moment from 'moment'
import { Picker } from '@react-native-picker/picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import GlobelStyle from '../Componenets/GlobalStyle/GlobalStyle'
const InvoiceDetail = ({ navigation, route }) => {

    const [Visible, setVisible] = React.useState('1')
    const [DispatchType, setDispatchType] = React.useState('0')
    const [QrVisible, setQrVisible] = React.useState(false)
    const [DispatchDetail, setDispatchDetail] = React.useState([])
    const [MasterList, setMasterList] = React.useState([])
    const [MasterNo, setMasterNo] = React.useState('')
    const [InvoiceDetail, setInvoiceDetail] = React.useState([])
    const [InvoiceHead, setInvoiceHead] = React.useState('')
    const [message, setmessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [scannerVisible, setScannerVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modal2Visible, setModal2Visible] = React.useState(false);
    const [showAlert, setshowAlert] = React.useState(false);
    const [warehouseType, setWarehouseType] = React.useState('');
    const [wareHouseInfo, setwareHouseInfo] = React.useState([]);
    const [selectedValue, setSelectedValue] = useState("select");

    React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            getBoxDetail();
            getwareHouse()
        });
        return focusEvent;

    });

    const getBoxDetail = async () => {
        // await BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', { 'invoice_no': route.params.invoice_no }
            //  BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', {'invoice_no': '2131102562'}
            const response = await fetch('https://phpstack-414838-2222412.cloudwaysapps.com/askApi/index.php/CouponCode/GET_INVOICE_BILLING_DETAIL', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'invoice_no': route.params.invoice_no

                })
            });
            const res = await response.json();

        // ).then(res => {
            console.log('Invoice Detail line 60 ', res);

            if (res.status == "Success") {
                setInvoiceDetail(res.data.invoice_detail)
                setDispatchDetail(res.data.dispatched_items)
                console.log(DispatchDetail);
                setInvoiceHead(res.data)
                console.log(InvoiceDetail);
            }
            else {

            }
        // }).catch(err => console.log('line 94 ->', err))
    }
    const getwareHouse = async () => {

        // await BaseService.post('CouponCode/wareHouseList',
        const response = await fetch('https://phpstack-414838-2222412.cloudwaysapps.com/askApi/index.php/CouponCode/wareHouseList');
           
        const res = await response.json();
    
        // ).then(res => {
            console.log('Master Coupon data line 64', res);

            if (res.msg == "Success") {
                setwareHouseInfo(res.data);
            }
            else if (res.data.status == "300") {
                setmessage({ type: 'error', title: "Error!", message: res.data.message });
            }
        // }).catch(err => console.log('line 94 ->', err))

    }

    console.log('DispatchType', DispatchType);

    const getMasterBox = async (couponData) => {
        console.log(route.params.invoice_no, couponData.data, route.params.VendorName);
        // await BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': route.params.invoice_no, "master_box_coupon": couponData.data, 'Cust_Vendor_Name': route.params.VendorName, 'dispatch_type': DispatchType, 'warehouse_id': warehouseType }
            // BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': route.params.invoice_no, "master_box_coupon": '820261e6671b5ec55' ,'Cust_Vendor_Name': route.params.VendorName}

                const response = await fetch('https://phpstack-414838-2222412.cloudwaysapps.com/askApi/index.php/CouponCode/checkMasterBoxDispatched', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'invoice_no': route.params.invoice_no,
                    "master_box_coupon": couponData.data,
                    'Cust_Vendor_Name': route.params.VendorName,
                    'dispatch_type': DispatchType,
                    'warehouse_id': warehouseType
                })
            });
            const res = await response.json();

        // ).then(res => {
            console.log('line 118  ', res);
            if (res.status.status == "200") {
                setmessage(res.status.message)
                // setStatus('Success')
                setScannerVisible(false)
                // console.log(MasterNo);
                setshowAlert(true)
                // seteditable(true)
                setType('success')
                setTitle('Dispatched')
                getBoxDetail()
            } else if (res.status.status == "300") {
                setmessage(res.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            } else if (res.status.status == "500") {
                setmessage(res.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            } else {
                setmessage(res.status.message);
                setshowAlert(true)
                setType('error')
                setTitle('Error !')
            }
        // }).catch(err => console.log('line 94 ->', err))
    }

    const handleOk = () => {
        setshowAlert(false)
        setScannerVisible(false)
        setSelectedValue('selected')
    }
    const RenderWarehouse = () => {

        let wareHouseArray = [];
        {
            wareHouseInfo &&
                wareHouseInfo.map((s, index) => {
                    s.id &&
                        wareHouseArray.push(
                            <Picker.Item style={{ fontSize: 11 }} label={s.warehouse_name} value={s.id} key={index} style={{ backgroundColor: 'red' }} />
                        )

                })
        }
        return wareHouseArray;
    };
    const RenderMasterList = ({ item }) => {
        return (
            <View style={[styles.Detail, { borderColor: '#008cff' }]}>
                <Title style={{ fontSize: 13, fontWeight: '500', paddingLeft: 12 }}>{item.coupon_code ? item.coupon_code : 'N/A'}</Title>
            </View>
        )
    }

    const RenderItemList = ({ item }) => {
        return (
            <View style={[styles.Detail, { marginBottom: 12 }]}>
                <View style={{ borderBottomWidth: 1, borderColor: AppTheme.LightBlue, backgroundColor: '#ccdefc', padding: 2 }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', padding: 4 }}>{item.part_code ? item.part_code : 'N/A'}</Text>
                </View>
                <View style={{ padding: 8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 6, borderBottomWidth: 1, borderColor: AppTheme.LightBlue }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Qty:  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.Qty ? item.Qty : "N/A"}  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.UOM ? item.UOM : 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                            <Text >Box Size:  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.box_size ? item.box_size : 'N/A'}</Text>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 6, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text >Dispatch:  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.dispatched_qty ? item.dispatched_qty : 0}  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.UOM ? item.UOM : 'N/A'}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Pending:  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{(Number(item.Qty)) - (Number(item.dispatched_qty)) ? (Number(item.Qty)) - (Number(item.dispatched_qty)) : 0}  </Text>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: AppTheme.Secondary }}>{item.UOM ? item.UOM : 'N/A'}</Text>

                        </View>

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
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.total_dispatched_qty ? item.total_dispatched_qty : 'N/A'}</Text>

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
                <View style={[styles.Listing]}>
                    <Pressable style={[GlobelStyle.cardMaterial, { backgroundColor: Visible == '2' ? '#f5f5f5' : AppTheme.TabClr }]} onPress={() => setVisible('1')} >
                        <Title style={[{ fontSize: 16, color: Visible == '2' ? null : AppTheme.Light }]}>Item List</Title>
                    </Pressable>
                    <Pressable style={[GlobelStyle.cardMaterial, { backgroundColor: Visible == '2' ? AppTheme.TabClr : AppTheme.Light }]} onPress={() => setVisible('2')}>
                        <Title style={{ fontSize: 16, color: Visible == '2' ? AppTheme.Light : null }}>Dispatch List</Title>
                    </Pressable>
                </View>

                {Visible == '2' ?
                    <View style={{ alignItems: 'center' }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={scannerVisible}
                            onRequestClose={() => {
                                setScannerVisible(!scannerVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.scannerView}>
                                    <QRCodeScanner
                                        onRead={getMasterBox}
                                        flashMode={RNCamera.Constants.FlashMode.off}
                                        topContent={
                                            <Title style={styles.centerText}>
                                                Scan Master Box
                                            </Title>
                                        }

                                        bottomContent={
                                            <TouchableOpacity onPress={() => {setScannerVisible(!scannerVisible),setSelectedValue('selected'), setWarehouseType("")}} style={styles.buttonTouchable}>
                                                <Text style={styles.buttonText}>OK. Got it!</Text>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            </View>
                        </Modal >

                        {/* <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalcenteredView}>
                                {/* <View style={styles.modalView}>
                                    <TouchableOpacity style={{ width: '100%', marginLeft: 12 }} onPress={() => (setScannerVisible(true), setDispatchType('0'))}>
                                        <Title style={{ fontSize: 14 }}>scan from Company</Title></TouchableOpacity>

                                </View> */}
                        {/* </View>
                        </Modal > */}
                        {/* <Button mode='contained' color={AppTheme.LightBlue} labelStyle={{ fontSize: 12 }} style={{ marginVertical: 16, }} onPress={() => setModalVisible(true)}>Scan Master Box</Button> */}
                        <View style={styles.Picker}>
                            <Picker
                                mode="dropdown"
                                dropdownIconColor={AppTheme.Light}
                                label="Select Type Of Dispatch"
                                selectedValue={selectedValue}
                                style={{ alignItems: 'center', color: AppTheme.Light }}
                                onValueChange={(itemValue, itemIndex) =>
                                (setSelectedValue(itemValue),
                                    (itemValue == "company" ? setScannerVisible(true) : null),
                                    (itemValue == "company" ?  setDispatchType('0') : null))

                                }
                            >
                                <Picker.Item label="Select Type Of Dispatch" value="select" />
                                <Picker.Item label="Dispatch From Company" value="company" />
                                <Picker.Item label="Dispatch From Warehouse" value="warehouse" />

                            </Picker>
                        </View>
                        {selectedValue == "warehouse" ?
                            <View style={styles.Picker2}>
                                <Picker style={[GlobelStyle.selectText]}
                                    mode="dropdown"
                                    dropdownIconColor={AppTheme.LightBlue}
                                    selectedValue={warehouseType}
                                    onValueChange={(e) => {
                                        console.log('====================================');
                                        console.log("ware hous evalue" ,e);
                                        console.log('====================================');
                                        setWarehouseType(e),
                                            setDispatchType('1'),
                                            (e != '' ? setScannerVisible(true) : setScannerVisible(false))

                                    }}
                                >
                                    <Picker.Item label="Select Warehouse" value="" />
                                    {RenderWarehouse()}
                                </Picker>

                            </View>
                            : null}
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
                                <View style={{ marginHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                                    <Title>Master Box</Title>
                                    <View style={GlobelStyle.MasterCount}>
                                        <Title style={{ color: AppTheme.LightBlue, lineHeight: 20, fontSize: 18, fontWeight: '500' }}>{MasterList.length}</Title>
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
            </View>




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
        borderRadius: 4,
        marginHorizontal: 10,
        borderBottomWidth: 5,
        borderColor: AppTheme.TabClr
    },
    Detail: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        marginHorizontal: 10,
        marginVertical: 8,
        borderWidth: 2,
        borderColor: AppTheme.LightBlue,
        borderRadius: 4,
        // padding: 8,
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
    modalcenteredView: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: '#525252',
        // opacity: 0.9,
    },
    scannerView: {
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
    modalView: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 4,
        width: "90%",
        // alignItems: "center",
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
        padding: 10,
        width: '90%',
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
    },
    Picker2: {
        backgroundColor: '#e6eefc',
        borderColor: AppTheme.LightBlue,
        width: '85%',
        height: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.40,
        shadowRadius: 4,
        elevation: 9,
        borderWidth: 2,
        marginBottom:18
    },
    Picker: {
        backgroundColor: "black",
        // borderRadius: 16,
        // padding: 10,
        // width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.40,
        shadowRadius: 4,
        elevation: 9,
        borderWidth: 2,
        borderColor: 'white',
        width: '85%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: AppTheme.LightBlue,
        borderWidth: 2,
        margin: 12,
        // borderColor: AppTheme.LightBlue,

    }

})
export default InvoiceDetail;
