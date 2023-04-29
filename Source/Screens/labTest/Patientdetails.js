import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constant/Theme'

const Patientdetails = () => {
    return (
        <SafeAreaView>
            <ScrollView>

                <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <Text style={{ color: "#000", fontWeight: "700", fontSize: 18 }}>Step 4:Test Location</Text>


                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
                        <View>

                            <Text style={{ color: "#000", fontSize: 15, fontWeight: "700" }}> Home Collection</Text>

                        </View>

                        <View>

                            <Text style={{ color: "#000", fontSize: 15, fontWeight: "700" }}>Lab Visit</Text>

                        </View>

                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#DDDDDD", marginTop: 20 }}>

                        <View style={{
                            flexDirection: "row", justifyContent: "space-between"
                        }}>
                            <View style={{ backgroundColor: "#F9F9F9" }}>
                                <Image
                                    source={require('../../Assets/Images/forword.png')}
                                    style={{ width: 10, height: 10, marginLeft: 10, padding: 10, marginTop: 20, alignItems: "center", justifyContent: "center" }}
                                />

                            </View>

                            <View style={{ justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ color: "#000", textAlign: "center", fontSize: 15, fontWeight: "700" }}>Today</Text>
                                <Text style={{ color: "#707070", textAlign: "center" }}>1 Nov</Text>
                            </View>

                            <View style={{ backgroundColor: "#F9F9F9" }}>
                                <Image
                                    source={require('../../Assets/Images/forword.png')}
                                    style={{ width: 20, height: 20, marginLeft: 10, padding: 10, marginTop: 20, alignItems: "center", justifyContent: "center" }}
                                />

                            </View>

                        </View>



                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>


                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>6:00 AM - 7:00 AM</Text>

                            <Text style={{ fontWeight: "700", fontSize: 15, color: "#2DCC34" }}>+Rs.77 Extra</Text>
                        </View>
                        <View />
                    </View>


                    <TouchableOpacity
                        style={{
                            borderWidth: 0,
                            marginTop: SIZES.margin5,
                            width: "100%",
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            backgroundColor: COLORS.mainColor,
                            borderRadius: 10,
                            alignSelf: 'center'
                        }}>

                        <Text style={{ fontWeight: "700", fontSize: 15, color: COLORS.white, marginTop: SIZES.margin1 }}>Select Address</Text>



                    </TouchableOpacity>

                </View>

            </ScrollView>


        </SafeAreaView>

    )
}

export default Patientdetails

const styles = StyleSheet.create({})