import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Components
import ImageCard from "../../components/ImageCard/ImageCardAlt";

const categories = [
  {
    id: 1,
    title: 'Hamburguesas',
    subtitle: 'Las mejores hamburguesas caseras',
    image: 'https://cdn.pixabay.com/photo/2015/04/20/13/25/burger-731298_960_720.jpg'
  },
  {
    id: 2,
    title: 'Gaseosas',
    subtitle: 'Variedad de sabores',
    image: 'https://cdn.pixabay.com/photo/2017/09/12/04/42/soft-drink-2741251_960_720.jpg'
  },
  {
    id: 3,
    title: 'Postres',
    subtitle: 'La mejor variedad en postres',
    image: 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_960_720.jpg'
  }
];

class Index extends Component {

  onPressCategory(category){
    this.props.navigation.navigate('CategoryDetails', {category});
  }

  render(){
    return (
      <View style={ style.container }>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            categories.map(item =>
              <ImageCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                onPress={() => this.onPressCategory(item)}
              />
            )
          }
          <View style={{ height:30 }}></View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Index;
