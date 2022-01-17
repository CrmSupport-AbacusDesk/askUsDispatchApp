import React, { Fragment } from 'react'
import { Text, View, StyleSheet, AsyncStorage, ScrollView, Caption ,ActivityIndicator,SafeAreaView} from 'react-native'
import { Formik } from 'formik';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import AppTheme from '../Componenets/AppTheme.js/AppTheme';
import BaseService from '../services/BaseService';
import AlertMessage from '../Componenets/Alert/AlertMessage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const CouponScan = ({ navigation }) => {
    const [InvoiceNo, setInvoiceNo] = React.useState('');
    const [message, setmessage] = React.useState('');
    const [BoxCodeCheck, setBoxCodeCheck] = React.useState('');
    const [CouponData, setCouponData] = React.useState([]);
    const [status, setStatus] = React.useState('');
    const [type, setType] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [showAlert, setshowAlert] = React.useState();
    const [BoxSize, setBoxSize] = React.useState('');
    const [Box, setBox] = React.useState([]);
    const [color, setColor] = React.useState('');
    const [editable, seteditable] = React.useState(false);
    const [Save, setSave] = React.useState(false);
    React.useEffect(() => {
        const focusEvent = navigation.addListener('focus', () => {
            // getMasterCoupon();
        });
        return focusEvent;

    });
    const onRefresh = React.useCallback(() => {
        // setRefreshing(true);
        //getMasterCoupon('');
        // setTerm('');
    }, []);


    const getMasterCoupon = async () => {
        BaseService.post('CouponCode/GET_INVOICE_BILLING_DETAIL', {'invoice_no':InvoiceNo}
        ).then(res => {
            console.log('Master Coupon data line 64', res);

            // if (res.data.status == "200") {
            //     setCouponData(res.data.data.coupon_information)
            //     setBoxSize(res.data.data.coupon_information.box_size)
            //     setmessage(res.data.data.message)
            //     setStatus(res.data.data.status)
            //     seteditable(true)
            // }
            // else if (res.data.data.status == "300") {
            //     setmessage(res.data.data.message)
            //     setshowAlert(true)
            //     setType('error')
            //     setTitle('Error !')
            // }
            // else if (res.data.data.status == "400") {
            //     setmessage(res.data.data.message)
            //     setshowAlert(true)
            //     setType('error')
            //     setTitle('Error !')
            // }
            // else {
            //     setmessage(res.data.data.message);
            //     setshowAlert(true)
            //     setType('error')
            //     setTitle('Error !')
            // }
        }).catch(err => console.log('line 94 ->', err))
    }

    const getBoxCoupon = async (e) => {

        console.log(Box);
        console.log(e);
        const index = Box.findIndex(row => row == e);
        console.log("index", index);
        if (index == -1) {
            BaseService.post('CouponCode/checkPrimaryCoupon', { 'primary_coupon_no': e, 'box_part_code': CouponData.part_code }
            ).then(res => {
                console.log('Box Coupon data line 64', res.data);

                if (res.data.data.status == "200") {
                    console.log(e);
                    setBox(Box => [...Box, e]);
                    setBoxCodeCheck(res.data.data.coupon_information.message)
                    // setBox([{...Box,e}])
                    // seteditable(false)
                    // setColor('green')
                }
                else if (res.data.data.status == "300") {
                    setmessage(res.data.data.message);
                    setshowAlert(true)
                    setType('error')
                    setTitle('Error !')
                }
                else {
                    setmessage(res.data.data.message);
                    setshowAlert(true)
                    setType('error')
                    setTitle('Error !')
                }
            }).catch(err => console.log('line 94 ->', err))
        }
        else {
            setmessage('Coupon Code Already Exsist In List')
            setshowAlert(true)
            setType('error')
            setTitle('Warning !')
        }
    }


    const setBoxCoupon = async () => {
        BaseService.post('CouponCode/boxPacking', { 'master_coupon_code': MasterNo, 'primary_coupon_list': Box }
        ).then(res => {
            console.log('Saved Box coupon data ', res.data);

            // if (res.data.data.status == "200") {
            //     console.log(e);
            //     setBox(Box => [...Box, e]);

            //     // setBox([{...Box,e}])
            //     // seteditable(false)
            //     // setColor('green')
            // }
            // else {
            //     setmessage(res.data.data.message);
            //     setshowAlert(true)
            //     setType('error')
            //     setTitle('Error !')
            // }
        }).catch(err => console.log('line 94 ->', err))
    }

    const onSave = async (values) => {
        navigation.navigate('Dashboard');
        setBoxCoupon()
    }
    const handleOk = () => {
        setshowAlert(false)
    }
    const renderBoxList = () => {

    }
    // const BoxArray = new Array(Number(BoxSize));
    // for (var i = 0; i < BoxSize; i++) {
    //     BoxArray[i] = (i+1).toString();
    // }
    console.log('Box array', Box);

    return (
        <SafeAreaView >
        <View>
            
            <View style={styles.Main}>
                <AlertMessage
                    type={type}
                    title={title}
                    message={message}
                    visible={showAlert}
                    handleOk={handleOk} labelOK='Ok' />

                <Formik initialValues={{
                    invoice: '',
                    partno: '',
                }}
                    onSubmit={getMasterCoupon}
                // valid
                // validationSchema={ChangePasswordValidation}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                        <>
                            <View style={styles.MasterNo}>
                                <Text style={styles.TextStyle}>Master Box No :</Text>
                                <TextInput
                                    // icon="phone"
                                    mode="outlined"
                                    activeOutlineColor='#3142b0'
                                    outlineColor='#3142b0'
                                    style={styles.input}
                                    disabled={editable}
                                    placeholderTextColor='#828088'
                                    type="textInput"
                                    value={InvoiceNo}
                                    onChangeText={invoice => set(invoice)}
                                    keyboardType='default'
                                />
                            </View>
                            {status == '200' ?
                                <View style={styles.MasterNo}>
                                    <Text style={[styles.TextStyle,]}>Part No :</Text>
                                    <Text style={{paddingLeft:10,fontSize:12,fontWeight:'bold'}}>{CouponData.part_code}</Text>
                                </View>
                                : null}
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <Button title='Scan' color='white' onPress={handleSubmit} buttonStyle={{
                                    // backgroundColor: AppTheme.statusBar,
                                    borderColor: '#919191',
                                    borderWidth: 2,
                                    borderRadius: 4,
                                    width: 100,

                                }}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>


            {status == '200' ?
                <ScrollView>
                    <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                        <View>
                            <Formik
                                initialValues={{
                                    box1: "",
                                    box2: "",
                                    box3: "",
                                    box4: "",
                                    box5: "",
                                    box6: "",
                                    box7: "",
                                }}
                                onSubmit={onSave}
                            // valid
                            // validationSchema={BoxCodeValidation}
                            >
                                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                                    <Fragment>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box1}
                                                disabled={Box.length >= 1 ? true : false}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                mode='outlined'
                                                label='Box 1'
                                                // editable={editable}
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box1")}
                                                onChangeText={(e) => {

                                                    handleChange('box1')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);

                                                    }
                                                }}

                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box1}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 1 ?
                                                    <>

                                                        <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    </>
                                                    : null}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box2}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                mode='outlined'
                                                label='Box 2'
                                                disabled={Box.length >= 2 ? true : false}
                                                // editable={editable}
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box2")}
                                                onChangeText={(e) => {

                                                    handleChange('box2')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box2}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 2 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box3}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                disabled={Box.length >= 3 ? true : false}
                                                mode='outlined'
                                                label='Box 3'
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box3")}
                                                onChangeText={(e) => {

                                                    handleChange('box3')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box3}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 3 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box4}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                disabled={Box.length >= 4 ? true : false}
                                                mode='outlined'
                                                label='Box 4'
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box4")}
                                                onChangeText={(e) => {

                                                    handleChange('box4')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box4}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 4 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box5}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                disabled={Box.length >= 5 ? true : false}
                                                mode='outlined'
                                                label='Box 5'
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box5")}
                                                onChangeText={(e) => {

                                                    handleChange('box5')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box5}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 5 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box6}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                disabled={Box.length >= 6 ? true : false}
                                                mode='outlined'
                                                label='Box 6'
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box6")}
                                                onChangeText={(e) => {

                                                    handleChange('box6')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box6}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length >= 6 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                placeholder="Enter Coupon Code"
                                                value={values.box7}
                                                outlineColor='#213385'
                                                activeOutlineColor='#213385'
                                                disabled={Box.length >= 7 ? true : false}
                                                mode='outlined'
                                                label='Box 7'
                                                maxLength={17}
                                                handleBlur={() => handleBlur("box7")}
                                                onChangeText={(e) => {

                                                    handleChange('box7')(e);
                                                    if (e.length == 17) {
                                                        getBoxCoupon(e);
                                                    }
                                                }}
                                                style={styles.Boxinput}
                                            />
                                            {errors.category && touched.category &&
                                                <Caption style={GlobelStyle.errorMsg}>{errors.box7}</Caption>
                                            }
                                            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 16 }}>
                                                {Box.length == 7 ?
                                                    <Text style={{ color: 'green', fontSize: 18 }}>✔</Text>
                                                    : null}
                                            </View>
                                        </View>

                                        {/* {BoxArray.map(BoxArray => { */}
                                        {/* return ( */}
                                        {/* );
                                    })} */}
                                        {Box.length == 7 ?
                                            <Button title="save" onPress={handleSubmit} />
                                            : null}
                                    </Fragment>
                                )}
                            </Formik>

                        </View>

                    </View>
                </ScrollView>

                : null
            }
        </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    Detail: {
        // backgroundColor: 'white',
        // shadowColor: 'black',
        // shadowOffset: { width: 0, height: 3, },
        // shadowOpacity: 0.40,
        // shadowRadius: 6.27,
        // elevation: 9,
        // marginTop: 16,
        // borderWidth: 2,
        // borderColor: '#213385',
        // borderRadius: 4,
        // padding: 6,
        backgroundColor: '#e8edff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    Main: {
        marginHorizontal: 16
    },
    MasterNo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    input: {
        height: 35,
        marginTop: 12,
        marginLeft: 10,
        width: '50%',
        fontSize:12,
        lineHeight:18,
        backgroundColor: '#e8edff',
    },
    Boxinput: {
        height: 40,
        width: '90%',
        fontSize:12,
        lineHeight:18,
        marginVertical: 6,
        backgroundColor: 'white',
        
    },
    TextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginVertical: 10
    },
    CheckBox: {
        height: 30,
        // backgroundColor:'green',
        marginLeft: 10
    }
})
export default CouponScan;
