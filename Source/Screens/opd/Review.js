import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Searchbar } from 'react-native-paper';
import { baseurl } from '../../Config/baseurl';
import axios from 'axios';


const Review = () => {

  const [review, setReview] = useState([]);

  //   useEffect(() => {
  //     axios.post("https://api.ehospi.in/user/getallreviews",{

  //         "drid":"63417102a0f7156e89c03a6a"

  //     }).then((res) => {

  //       setReview(res?.data?.response)
  //     })
  //       .catch((error) => {
  //         Alert.alert(error?.data)

  //       })

  // }, []);

  useEffect(() => {

    axios.post("https://api.ehospi.in/user/getallreviews", {
      "drid": "63417102a0f7156e89c03a6a"

    }).then((res) => {
      setReview(res?.data?.response)
      console.log("review ", res?.data?.response);
    })

  }, [])







  const reviewData = (id) => {

    const item = id.item;
    console.log("review data ", id?.item?.name);

    return (
      <View style={{ marginLeft: 10, marginRight: 10, borderRadius: 20, marginTop: 10, backgroundColor: "#fff", marginBottom: 10, padding: 10 }}>


        <View style={{ flexDirection: "row", backgroundColor: "#fff", marginTop: 0, }}>
          <View style={{ borderWidth: 0, marginBottom: 20, marginLeft: 20, padding: 10 }}>
            <Image source={{ uri: id?.item?.imageurl }}
              style={{ height: 90, margin: 0, borderWidth: 0, width: 70, marginBottom: 0, padding: 0 }} />
          </View>

          <View style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }}>

            <Text style={{ marginLeft: 0, color: "#000", fontWeight: "700", fontSize: 18, }}>{id?.item?.name}</Text>
            <Text style={{ marginLeft: 0, color: "#d6d6d6", fontWeight: "700", fontSize: 15, marginTop: 5 }}>{item?.date}</Text>
            <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 10, color: "#000", fontSize: 15, fontWeight: "600", marginTop: 10 }}>{item?.message} </Text>
            <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 10, color: "#000", fontSize: 15, fontWeight: "600", marginTop: 10 }}>{item?.rating} Rating </Text>

          </View>

        </View>


      </View>
    )
  }

  return (
    <View style={{ backgroundColor: "#d6d6d6", height: "100%" }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 20, color: "#000" }}>Review</Text>
        {/* <View style={{marginLeft:10,marginRight:10,borderRadius:20,marginTop:20,backgroundColor:"#fff"}}>

        
          <View style={{ flexDirection: "row" ,backgroundColor:"#fff",marginTop:10,}}>
            <View style={{margin:0,borderWidth:0,marginBottom:20,marginLeft:20}}>
              <Image source={{ uri: 'https://www.namg.net/wp-content/uploads/2017/09/doctor-icon.png' }}
                style={{ height: 90, margin:0,borderWidth:0,width:70 ,marginBottom:0,padding:0}} /> 
            </View>

            <View style={{marginLeft:0,marginTop:0}}>

              <Text style={{ marginLeft: 20, color: "#000", fontWeight: "700", fontSize: 18,}}>Dr. Shubham Chauhan</Text>
              <Text style={{ marginLeft: 20, color: "#d6d6d6", fontWeight: "700", fontSize: 15,marginTop:5  }}>Sep 222</Text>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={{ marginLeft: 20, color: "#000", fontWeight: "700", fontSize: 18 }}>4.7 star</Text>
                </View>

                

              </View>

            </View>
            
          </View>
        
          <Text style={{marginTop:0,marginBottom:20,marginLeft:10,color:"#000",fontSize:15,fontWeight:"600"}}>Book Appoinment  shfdsd hsdkkf fksfg sdshfdfdbf </Text>
          
        </View> */}
        <View style={{ borderWidth: 0 }}>
          <FlatList

            data={review}
            renderItem={reviewData}
            keyExtractor={(item) => item.id}

          />
        </View>


      </View>


    </View>
  )
}

export default Review

const styles = StyleSheet.create({})