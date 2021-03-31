import React from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../Common';

import Text from './Text';

import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { add_image, delete_image } from '../Store/Box/Actions';

const { width, height } = Dimensions.get('window')

function CameraIcon(props) {
    return (
        <TouchableOpacity style={styles.ImageHolder} onPress={props.onPress}>
            <Icon name="camera-outline" size={28} color={colors.snowWhite} />
        </TouchableOpacity>
    )
}

function ImageBox(props) {
    return (
        <View style={styles.ImageHolder}>
            <Image source={{ uri: Platform.OS === 'ios' ? props.image.sourceURL : props.image.path }} style={styles.ImageHolder} />
            <TouchableOpacity onPress={props.delete} style={{
                position: 'absolute',
                top: 5,
                right: 5,
                backgroundColor: colors.snowWhite,
                borderRadius: 22
            }}>
                <Icon name='close' size={18} color={colors.black} />
            </TouchableOpacity>
        </View>
    )
}

function Box(props) {

    const onImageLibrary = () => {
        try {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: false,
                multiple: true,
                mediaType: 'photo',
                writeTempFile: false
            }).then(image => {
                return props.add_image(props.item.id, image)
            }).catch(error => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
    }

    const deleteImage = image => {
        return props.delete_image(props.item.id, image.id)
    }

    const deleteBox = () => {
        return props.deleteBox()
    }

    const { onLongPress, isActive, item } = props;

    return (
        <>
            <View style={styles.headerArea}>
                <View></View>
                <TouchableOpacity onPress={deleteBox}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                onLongPress={onLongPress} 
                style={[styles.box, {
                    backgroundColor: isActive ? '#1f4068' : colors.darkBlue,
                }]}
            >
                <FlatList 
                    data={item.images}
                    renderItem={({ item, index }) => item.path === 'add' ? <CameraIcon onPress={onImageLibrary} /> : <ImageBox image={item} delete={() => deleteImage(item)} />}
                    ListEmptyComponent={() => <View style={styles.emptyBox}>
                        <CameraIcon onPress={onImageLibrary} />
                        <Text>Capture a Moment</Text>
                    </View>}
                    numColumns={4}
                    keyExtractor={item => item.id}
                />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    box: {
        width: width * 0.95,
        minHeight: height * 0.20,
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: colors.darkBlue,

        // Shadow Effect
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    emptyBox: {
        width: width * 0.95,
        height: height * 0.20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageHolder: {
        width: width * 0.2375, 
        height: height * 0.10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    headerArea: {
        flexDirection: 'row', 
        width: width * 0.95, 
        justifyContent: 'space-between'
    },
    deleteText: {
        color: colors.orange
    }
})

const mapStateToProps = (state) => {
    return (
      {
        box: state.box,
      }
    )
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      add_box: () => dispatch(add_box()),
      add_image: (box_id, images) => dispatch(add_image(box_id, images)),
      delete_image: (box_id, image_id) => dispatch(delete_image(box_id, image_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Box);