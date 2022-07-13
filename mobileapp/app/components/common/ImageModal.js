import { Image, Modal,Text, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { StyleSheet } from "react-native";
import { TouchableHighlight }  from "react-native";
import { HOST } from "../actions/allowedhost";

export const Zoom = (image) => {
    console.log(image.url)
    return (
        <Modal visible={true} transparent={true}>
            <View style={styles.modalView}>
                {/* <Image image={image}/> */}
                <Text>{image.url}</Text>
                <ImageViewer style={styles.messageimage} imageUrls={[image.url]}/>
            </View>
        </Modal>
    )
}


export const ImageModal = ({ image }) => {
    const img= {uri: `http://${HOST}`+image}
    const imgv= {url: `http://${HOST}`+image}
    // console.log("pepe")
    return (
            <TouchableHighlight onPress={()=>Zoom(imgv)}>
                <Image style={styles.messageimage} source={img}/>
            </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
    messageimage: {
        width: 220,
        height: 220,
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

  })