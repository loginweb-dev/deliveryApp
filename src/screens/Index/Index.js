import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from 'react-native-dynamic-search-bar';

// Components
import ImageCard from "../../components/ImageCard/ImageCard";
import ItemProductAlt from "../../components/ItemProductAlt/ItemProductAlt";

// Configurations
import { Config } from '../../config/config';
import { MainStyle } from '../../config/styles.js';

// UI
import Separator from '../../ui/Separator';

const screenHeight = Math.round(Dimensions.get('window').height);

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

const products = [
  {
      'id': 1,
      'name': 'Hamburguesa sencilla',
      'details': 'Carne, ensalada, salsa y huevo.',
      'price': '15.00',
      'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/08/abstract-1238262_960_720.jpg',
      'typeId': 1
  },
  {
      'id': 2,
      'name': 'Hamburguesa doble',
      'details': 'Doble carne, ensalada, salsa y huevo.',
      'price': '20.00',
      'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459__340.jpg',
      'typeId': 1
  },
  {
      'id': 3,
      'name': 'Lomito',
      'details': 'Lomito de carne, ensalada, salsa y huevo.',
      'price': '18.00',
      'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg',
      'typeId': 1
  },
  {
      'id': 4,
      'name': 'Hamburguesa Completa',
      'details': 'Carne, ensalada, salsa, tocino y huevo.',
      'price': '18.00',
      'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg',
      'typeId': 1
  }
];

const scrollY = new Animated.Value(0);
const traslateY = scrollY.interpolate({
    inputRange: [0,150],
    outputRange:[0, -150]
});

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchVisible: false
    }
    // console.log(this.props.user, this.props.locations, this.props.cart)
  }

  onPressCategory(category){
    this.props.navigation.navigate('CategoryDetails', {category});
  }

  onPressProduct(product){
    this.props.navigation.navigate('ProductDetails', {product});
  }

  render(){
    return (
      <View style={ style.container }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(e)=>{
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        >
          <Animated.View
            style={{ 
                transform:[{
                  translateY: traslateY
                }],
                elevation: 4,
                zIndex: 100
            }}>
            <View>
              <Text style={ MainStyle.h4 }>Categorías</Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
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
              </ScrollView>
              <SearchBar
                placeholder="Ingresa tu busqueda"
                onChangeText={text => {
                  console.log(text)
                }}
                onPressCancel={() => {
                  console.log('clear')
                }}
                onPress={() => alert("onPress")}
                iconColor={Config.color.primary}
              />
            </View>
          </Animated.View>
          <Text style={ MainStyle.h4 }>Populares</Text>
          <FlatList
            data={products}
            renderItem={({item, index})=>
              <ItemProductAlt
                name={item.name}
                details={item.details}
                price={item.price}
                image={item.image}
                onPress={() => this.onPressProduct(item)}
                // onPressAdd={() => this.addCart(item)}
              />
            }
            numColumns={2}
          />
          <Separator />
          <Text style={ MainStyle.h4 }>Más vendidos</Text>
          <FlatList
            data={products}
            renderItem={({item, index})=>
              <ItemProductAlt
                name={item.name}
                details={item.details}
                price={item.price}
                image={item.image}
                onPress={() => this.onPressProduct(item)}
                // onPressAdd={() => this.addCart(item)}
              />
            }
            numColumns={2}
          />
          <Separator height={50} />
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.color.background,
  },
});


const mapStateToProps = (state) => {
  return {
    user : state.user,
    locations : state.locations,
    cart : state.cart,
  }
}

export default connect(mapStateToProps, null)(Index);