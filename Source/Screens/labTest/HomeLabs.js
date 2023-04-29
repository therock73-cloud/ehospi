import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';

const HomeLabs = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView >
        
        <View style={{ marginTop: 10}}>

          <Searchbar
            style={{
              width: "90%",
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
              marginBottom: 10

            }}
            placeholder="Search"
          // onChangeText={onChangeSearch}
          // value={searchQuery}
          />
          <View style={{ backgroundColor: "#F9F9F9", padding: 10, marginTop: 10, borderWidth: 1, borderColor: "#E8E2E2", marginLeft: 20, marginRight: 20, marginTop: 30 }}>
            <Image
              source={require('../../Assets/Images/banner4.jpeg')}
              style={{ width: "90%", height: "30%", marginLeft: 10, padding: 10, marginTop: 20, alignItems: "center", justifyContent: "center" }}
            />
            <Text style={{ marginTop: 10, marginBottom: 10, color: "#010204", fontWeight: "700", marginLeft: 10, marginRight: 10, fontSize: 15 }}>Dr. Lal PathLabs Ltd. Lab Tests and Health Checkup Packages in New Delhi</Text>

          </View>


          <Text style={{ marginTop: 10, color: "#737373", fontSize: 14, marginLeft: 10, marginRight: 10,fontWeight:"500" }}>We focus on providing patients quality diagnostic healthcare services in India. Through our network, we offer patients convenient locations for their diagnostic healthcare services and efficient service. With over 3368 diagnostic and related healthcare tests and services offered, we believe we are capable of performing substantially all of the diagnostic healthcare tests and services currently prescribed by physicians in India. Our key competitive strengths are: Business model focused on the patient as a customer and an established consumer healthcare brand associated with quality services, in a market where patients generally choose their diagnostic healthcare service provider. Well-positioned to leverage upon one of the fastest-growing segments of the Indian healthcare industry. A network whose growth yields greater economies of scale, combined with a hub and spoke model that is scalable for further growth. Centralized information technology platform that fully integrates our network and is scalable.</Text>

          <View style={{flexDirection:"row",borderWidth:10}}>
            <Text style={{color:"#737373"}}>Address</Text>

          </View>
        </View>

      </ScrollView>



    </SafeAreaView>
  )
}

export default HomeLabs

const styles = StyleSheet.create({})