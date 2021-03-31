import React from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, StatusBar } from 'react-native';

import DraggableFlatList from 'react-native-draggable-flatlist';

import { colors } from './src/Common';
import { Text, HeaderText, Box } from './src/Components';

import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { add_box, delete_box, re_arrange_box } from './src/Store/Box/Actions';

const { width, height } = Dimensions.get('window')
function App(props) {

  const addBox = () => {
    return props.add_box()
  }

  const deleteBox = box_id => {
    return props.delete_box(box_id)
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar backgroundColor={colors.darkBlue} />
      <View style={styles.header}>
        <HeaderText>Capture</HeaderText>
        <Icon name="add-outline" color={colors.snowWhite} size={28} onPress={() => addBox()} />
      </View>
      
      <>
        <DraggableFlatList
          data={props.box.box}
          renderItem={({ item, index, drag, isActive }) => <Box onLongPress={drag} item={item} deleteBox={() => deleteBox(item.id)} isActive={isActive} />}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => setData(data)}
          ListEmptyComponent={() => <View style={{ flex: 1, height: height * 0.70, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Press + Icon to add Box</Text>
          </View>}
          onDragEnd={(data) => props.re_arrange_box(data.data)}
        />
      </>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
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
    delete_box: (box_id) => dispatch(delete_box(box_id)),
    re_arrange_box: (box) => dispatch(re_arrange_box(box))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);