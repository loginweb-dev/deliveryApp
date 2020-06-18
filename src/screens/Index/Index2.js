import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Components
import ImageCard from "../../components/ImageCard/ImageCardAlt";

// UI
import Separator from '../../ui/Separator';

// Configurations
import { Config } from '../../config/config';

// Registers
import { Categories } from '../../config/registers';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: Categories,
    }
  }


  onPressCategory(category){
    this.props.navigation.navigate('CategoryDetails', {category});
  }

  render(){
    return (
      <View style={ style.container }>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.categories.map(item =>
              <ImageCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                onPress={() => this.onPressCategory(item)}
              />
            )
          }
          <Separator height={30} />
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Config.color.background
  },
});

export default Index;
