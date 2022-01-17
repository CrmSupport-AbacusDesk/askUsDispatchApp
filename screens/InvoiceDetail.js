import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, FlatList, Modal,Alert } from 'react-native'
import { Formik } from 'formik'
import AlertMessage from '../Componenets/Alert/AlertMessage'
import { Title, Avatar, TextInput, Button } from 'react-native-paper'
import AppTheme from '../Componenets/AppTheme.js/AppTheme'
import BaseService from '../services/BaseService'
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler'
const InvoiceDetail = ({ navigation, route }) => {
    const [Status, setStatus] = React.useState('')
    const [Visible, setVisible] = React.useState('1')
    const [MasterDetail, setMasterDetail] = React.useState([])
    const [MasterNo, setMasterNo] = React.useState('')
    const [MasterBoxCode, setMasterBoxCode] = React.useState('')
    const [InvoiceDetail, setInvoiceDetail] = React.useState([])
    const [InvoiceHead, setInvoiceHead] = React.useState('')
    const [BoxList, setBoxList] = React.useState([])
    const [message, setmessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [showAlert, setshowAlert] = React.useState(false);
    const [editable, seteditable] = React.useState(false);


    React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            getBoxDetail();
        });
        return focusEvent;

    });

    const getBoxDetail = async () => {
        BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', { 'invoice_no': route.params.invoice_no }
            //  BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', {'invoice_no': '2131102562'}

        ).then(res => {
            console.log('Invoice Detail ', res);

            if (res.data.status == "Success") {
                setInvoiceDetail(res.data.data.invoice_detail)
                setMasterDetail(res.data.data.dispatched_items)
                console.log(MasterDetail);
                setInvoiceHead(res.data.data)
                console.log(InvoiceDetail);
            }
            else {

            }
        }).catch(err => console.log('line 94 ->', err))
    }

    const getMasterBox = async () => {
        BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': route.params.invoice_no, "master_box_coupon": MasterNo, 'Cust_Vendor_Name': route.params.VendorName }
            // BaseService.post('CouponCode/checkMasterBoxDispatched', { 'invoice_no': "2132102805", "master_box_coupon": e }

        ).then(res => {
            console.log('Master Detail ', res);
            // console.log(e);
            if (res.data.status.status == "200") {
                setmessage(res.data.status.message)
                setStatus('Success')
                console.log(MasterNo);
                // setshowAlert(true)
                seteditable(true)
                // setType('success')
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
    const RenderItemList = ({ item }) => {
        return (
            <View style={[styles.Detail, { flex: 1 }]}>
                <View style={{ borderBottomWidth: 1, borderColor: '#9ec0ff', padding: 6 }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', padding: 4 }}>{item.part_code}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Qty:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.Qty}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>UOM:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.UOM}</Text>

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
            <View style={[styles.Detail, { flex: 1 }]}>
                <View style={{ borderBottomWidth: 1, borderColor: '#9ec0ff', padding: 6 }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', padding: 4 }}>{item.part_code}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Qty:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.Qty}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>UOM:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700', }}>{item.UOM}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ color: AppTheme.Medium }}>Box Size:  </Text>
                        <Text style={{ fontSize: 12, fontWeight: '700' }}>{item.box_size ? item.box_size : 'N/A'}</Text>

                    </View>
                </View>
            </View >
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
                            {InvoiceHead.Cust_Vendor_Name}
                        </Title>
                    </View>
                    <Text style={[styles.TextHead, { marginLeft: 24, marginTop: -10, marginBottom: 6 }]}>{InvoiceHead.Cust_Vendor_Code}</Text>
                </View>

                <View style={{ flexDirection: 'row', borderBottomColor: AppTheme.LightGrey, marginVertical: 8, justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, borderRightWidth: 2, borderColor: AppTheme.Medium, marginBottom: 5, }}>
                        <Text style={styles.Title}>Invoice No :  <Text style={styles.TextHead}>{InvoiceHead.ODN_Number}</Text></Text>
                    </View>
                    <View style={{ marginRight: 50, paddingLeft: 6 }}>
                        <Text style={styles.Title}>Total Item : <Text style={styles.TextHead} >{InvoiceHead.total_invoice_item}</Text></Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, marginVertical: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Pressable style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }} onPress={() => setVisible('1')} >
                        <Title style={{ fontSize: 16, color: AppTheme.Light }}>Item List</Title>
                    </Pressable>
                    <Pressable style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }} onPress={() => setVisible('2')}>
                        <Title style={{ fontSize: 16, color: AppTheme.Light }}>Dispatched List</Title>
                    </Pressable>
                </View>

                {Visible == '2' ?
                    <View style={{ alignItems: 'center' }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View>
                                        <Formik initialValues={{
                                            masterno: '',
                                        }}
                                            onSubmit={getMasterBox}
                                        // valid
                                        // validationSchema={ChangePasswordValidation}
                                        >
                                            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                                                <>
                                                    <View style={{ padding: 6, alignItems: 'center' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginVertical: 16 }}>
                                                            <Text>Master Box No :  </Text>
                                                            <TextInput
                                                                mode="outlined"
                                                                activeOutlineColor='#3142b0'
                                                                outlineColor='#3142b0'
                                                                maxLength={17}
                                                                style={styles.input}
                                                                // disabled={editable}
                                                                placeholderTextColor='#828088'
                                                                type="textInput"
                                                                value={MasterNo}
                                                                handleBlur={() => handleBlur("masterno")}
                                                                onChangeText={masterno => setMasterNo(masterno)}
                                                                keyboardType='default'
                                                            />
                                                        </View>
                                                        <Button mode='contained' color={AppTheme.LightBlue} labelStyle={{ fontSize: 12, lineHeight: 12 }} style={{ height: 30, marginTop: 5, width: 100 }} onPress={handleSubmit} >Scan</Button>
                                                    </View>
                                                </>
                                            )}
                                        </Formik>
                                       </View>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Button mode='contained' labelStyle={{ fontSize: 12 }} style={{ marginVertical: 6, }} onPress={() => setModalVisible(true)}>Add Master Box</Button>
                    </View>
                    : null}
                <FlatList nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={Visible == '2' ? MasterDetail : InvoiceDetail}
                    renderItem={Visible == '2' ? RenderDispatchList : RenderItemList}
                />
            </View>
            {/* <View style={styles.centeredView}>
               
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable>
            </View> */}



        </View>
    )

}
const styles = StyleSheet.create({
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
    Detail: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 9,
        marginHorizontal: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#9ec0ff',
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#e6eefc',
        //   justifyContent:'space-between',
        // flexDirection: 'row',
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    }

})
export default InvoiceDetail;
